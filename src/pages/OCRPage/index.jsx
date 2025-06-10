import { useEffect, useState } from 'react';
import Tesseract from 'tesseract.js';
import './style.css';
import { BackButton } from '../../components/BackButton';
import { OCRItem } from '../../components/OCRItem';
import { useNavigate, useParams } from 'react-router-dom';
import { ReusableBtn } from '../../components/ReusableBtn';
import { OCRUpload } from '../../components/OCRUpload';
import { Camera, Upload } from 'lucide-react'

export const OCRPage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [items, setItems] = useState([]);
  // const [temporaryItems, setTemporaryItems] = useState(localStorage.getItem("temporary-items") || [])

  const {sessionId} = useParams()
  const navigate = useNavigate()

  const handleSelect = (index) => {
    const newItems = [...items];
    newItems[index].selected = !newItems[index].selected;
    setItems
    (newItems);
  };

  const handleSave = () => {
    const selectedItems = items
    .filter(item => item.selected);
    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    const matchingSession = localStorageItems.filter((item) => item.id === sessionId)?.[0];
    const currentItems = matchingSession.items ?? [];
    matchingSession.items = [...currentItems, ...selectedItems];

    localStorage.setItem("items", JSON.stringify(localStorageItems))
    navigate(`/Session/${sessionId}`)
  };

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
        Přečti prosím všechny položky z tohoto jídelního lístku a vrať mi je ve formátu JSON. Struktura by měla být: {"items": [{"name": "název jídla", "price": "cena (jen číslo)", "currency": "měna","count":"počet (vždy 1)" "description": "popis (pokud je k dispozici)"}]}. Pokud není cena jasná, nastav ji na null.
      `;
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4",
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
      const resp =  data.choices[0].message.content
      const parsedRedp = JSON.parse(resp)
      const itemsFromResp = parsedRedp.items

      // localStorage.setItem("temporary-items",JSON.stringify(parsedRedp))
      // console.log(data.choices[0].message.content.items)
      // setTemporaryItems(JSON.parse(localStorage.getItem("temporary-items")) || [])

      const localStorageItems = JSON.parse(localStorage.getItem('items'));
      const matchingSession = localStorageItems.filter(
        (item) => item.id === sessionId,
      )?.[0];
      matchingSession.temporaryItems = itemsFromResp

      Object.assign(localStorageItems.find(item=> item.id === sessionId ), matchingSession)
      
      localStorage.setItem("items", JSON.stringify(localStorageItems))

    } catch (err) {
      setError('This image is not readable');
      console.error(err);
    }
  };

  useEffect( () => {
    const handleOCR = async () => {
      if (!image) return;
      setLoading(true);
      setError('');
      try {
        const result = await Tesseract.recognize(image, 'ces',);
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

  // !items && setTemporaryItems(localStorage.getItem("temporary-items") || [])
  // console.log("temporary",temporaryItems)
  // console.log("items", temporaryItems.items)

  useEffect(() => {
    const localStorageItems = JSON.parse(localStorage.getItem('items'));
    const matchingSession = localStorageItems.filter((item) => item.id === sessionId)?.[0];

    setItems(matchingSession?.temporaryItems)
    // localStorage.getItem("")
    console.log(items)
  }, [])

  return (
    <div className='content'>
      <BackButton path={`/Session/${sessionId}`}/>
      
      {items?.length === 0 || items === undefined ?
      <>
        <div className='ocr-upload'>
          <label htmlFor="uploadCamera" className="ocr-upload__btn mobile-mode">
            <Camera color="var(--primaryColor)" size={30}/>
            Take photo of a menu
          </label>
          <input 
            id="uploadCamera"
            className="hidden" 
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
      </>

      :

      <>
        <div className='ocr__items-header'>
          <div className='ocr-upload__inline'>
            <label htmlFor="uploadCamera" className="mobile-mode">
              <Camera color="var(--primaryColor)" size={35}/>
            </label>
            <input 
              id="uploadCamera" 
              className="hidden"
              type="file" 
              accept="image/*" 
              capture="environment"
              onChange={handleImageChange}
            />

            <label htmlFor="uploadFile">
              <Upload color="var(--primaryColor)" size={30}/>
            </label>
            <input 
              id='uploadFile' 
              className='hidden' 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className='ocr__items-box'>

          {items?.map((item, index) =>
              <OCRItem 
                key={`${item.name}-${index}`} 
                name={item.name} 
                price={item.price} 
                description={item.description}
                selected={item.selected}
                onSelect={() => handleSelect(index)}
              />
            )
          }

          <div className='ocr__save-items'>
            <ReusableBtn title="Save" type="submit" onClick={handleSave}/>
          </div>
        </div>
      </>
      }
    </div>
  );
};
