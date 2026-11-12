import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../cart';
import { formatPrice, groups } from '../data';
import { ItemIcon } from '../icons';

export default function Home() {
  const { addItem, quantityOf } = useCart();

  useEffect(() => {
    document.title = 'Fresh Market';
  }, []);

  return (
    <div className='page'>
      <section className='hero'>
        <p className='eyebrow'>Welcome</p>
        <h1>Fresh produce, neatly organised</h1>
        <p className='lead'>
          Browse the catalogue using the navigation on the left, or pick a product below to see its characteristics and price. Add anything you like to your cart.
        </p>
      </section>

      {groups.map((group) => (
        <section className='home-group' key={group.id} aria-labelledby={'home-' + group.id}>
          <h2 id={'home-' + group.id}>{group.name}</h2>
          <ul className='card-grid'>
            {group.items.map((item) => {
              const inCart = quantityOf(item.id);
              return (
                <li key={item.id}>
                  <div className='card'>
                    <Link to={'/item/' + item.id} className='card-link'>
                      <span className='card-icon' style={{ backgroundColor: item.tint }}>
                        <ItemIcon id={item.id} size={56} />
                      </span>
                      <span className='card-body'>
                        <span className='card-name'>{item.name}</span>
                        <span className='card-tagline'>{item.tagline}</span>
                      </span>
                    </Link>
                    <div className='card-footer'>
                      <span className='card-price'>
                        {formatPrice(item.price)} <small>{item.unit}</small>
                      </span>
                      <button
                        type='button'
                        className='btn btn-primary btn-small'
                        aria-label={'Add ' + item.name + ' to cart' + (inCart > 0 ? ', ' + inCart + ' already in cart' : '')}
                        onClick={() => addItem(item.id, 1)}
                      >
                        <svg viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' strokeWidth='2.800' strokeLinecap='round' aria-hidden='true' focusable='false'>
                          <path d='M6 12h12M12 6v12' />
                        </svg>
                        Add
                        {inCart > 0 && <span className='btn-count'>{inCart}</span>}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
