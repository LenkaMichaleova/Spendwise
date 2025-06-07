import './style.css';

export const SessionItem = ( {name, count, price} ) => {
  return(
    <button className='session__item'>
      <span className='item__name'>{name}</span>
      <span className='item__others'>
        <span className='item__count'>{count}</span>
        <span className='item__price'>{price}</span>
        <span className='item__icon'>add</span>
        <span className='item__icon'>delete</span>
      </span>
    </button>
  )
}