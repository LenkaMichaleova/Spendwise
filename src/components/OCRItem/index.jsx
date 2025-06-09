import './style.css';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' }  };

export const OCRItem = ( {name, price, description, selected, onSelect} ) => {
  return(
    <label className='ocr__item'>
      <div className='ocr__item--prvni-radek'> 
        <span className='ocr__item__name'>{name}</span>
        <span className='ocr__item__others'>
            <span className='item__price'>{price} ,-</span>
            <span className='item__icon'>
            <Checkbox {...label} 
              style={{padding: 0}} 
              checked={selected} 
              onChange={onSelect}/>
            </span>
        </span>
      </div>
      <div className='ocr__item__description'>
        {description}
      </div>
    </label>
  )
}
