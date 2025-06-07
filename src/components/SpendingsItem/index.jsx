import './style.css';

export const SpendingItem = ( {name, tag, price, icon} ) => {
  return(
    <button className='spending__item'>
      <span className='item__name'>{name}</span>
      <span className='item__others'>
        <span className='item__count'>{tag}</span>
        <span className='item__price'>{price}</span>
        <span className='item__icon'>{icon}</span>
      </span>
    </button>
  )
}
