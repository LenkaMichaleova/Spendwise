import { SpeedDialTooltipOpen } from '../../components/SpeedDial';
import './style.css';

export const SessionPage = () => {
  return (
    <div className="session">
        <h1>SessionPage</h1>

        <div className='session__items-box'>      
          <button className='session__item'>
            <span className='item__name'>Knedlo Vepřo Zelo</span>
            <span className='item__others'>
              <span className='item__count'>1</span>
              <span className='item__price'>250,-</span>
              <span className='item__icon'>icon</span>
            </span>
          </button>
        </div>
        
        <SpeedDialTooltipOpen />
    </div>
  );
};
