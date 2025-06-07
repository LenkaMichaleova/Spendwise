import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import './style.css';
import { Camera, Upload } from 'lucide-react'
import { BackButton } from '../../components/BackButton';
import { OCRItem } from '../../components/OCRItem';

export const OCRPage = () => {
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect( () => {
    const handleOCR = async () => {
      if (!image) return;
      setLoading(true);
      setError('');
      try {
        const result = await Tesseract.recognize(image, 'ces', {
          logger: m => console.log(m),
        });
        const text = result.data.text;
        await fetchItemsFromOpenAI(text);
      } catch (err) {
        setError('Chyba při čtení textu.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    handleOCR()
  }, [image])

  const temporaryItems = localStorage.getItem("temporary-items")
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setItems([]);
      setError('');
    }
  };

  const fetchItemsFromOpenAI = async (text) => {
    try {
      const prompt = `
        Zde je jídelní lístek:
        ${text}
        Přečti prosím všechny položky z tohoto jídelního lístku a vrať mi je ve formátu JSON. Struktura by měla být: {"items": [{"name": "název jídla", "price": "cena", "description": "popis (pokud je k dispozici)"}]}. Pokud není cena jasná, nastav ji na null.
      `;
      console.log(prompt.split(" ").length)
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "Jsi pomocník pro strukturování textu." },
            { role: "user", content: prompt }
          ],
          temperature: 0.3
        })
      });

      const data = await response.json();
      const parsed = JSON.parse(data.choices[0].message.content);
      setItems(parsed.items || []);
      console.log("response is", data.choices[0].message.content.items )
      localStorage.setItem(("temporary-items",JSON.stringify(data.choices[0].message.content.items)))
    } catch (err) {
      setError('This image is not readable');
      console.error(err);
    }
  };

  console.log(temporaryItems)
  return (
    <div className='ocr-page'>
      <BackButton path="/Session"/>
  
      {items.length === 0 ?
      <div className='ocr-upload'>
        <label htmlFor="uploadCamera" className='ocr-upload__btn mobile-mode'>
          <Camera color="var(--primaryColor)" size={30}/>
          Take photo of menu
        </label>
        <input 
          id='uploadCamera' 
          className='hidden' 
          type="file" 
          accept="image/*" 
          capture="environment"
          onChange={handleImageChange}
        />
          
        <label htmlFor="uploadFile" className='ocr-upload__btn'>
          <Upload color="var(--primaryColor)" size={30}/>
          Upload an image
        </label>
        <input 
          id='uploadFile' 
          className='hidden' 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange}
        />
        
        {image && <img className='obrazek' src={image}/>}
        {loading && 'Zpracovávám...'}
        {error && <p>{error}</p>}
      </div>

      :
        <div className='ocr__items-box'>
          {temporaryItems.map((item, index) =>
            <OCRItem 
              key={`${item.name}-${index}`} 
              name={item.name} 
              price={item.price} 
              description={item.description}
            />
          )}
        </div>
    }
    </div>
  );
};
