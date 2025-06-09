import { Camera, Upload } from 'lucide-react'
import './style.css';

export const OCRUpload = ( {size, handleImageChange}) => {
  return (
    <>
      {size === "small" ?
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
      :
        <>
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
        </>
      }
    </>
  )
}