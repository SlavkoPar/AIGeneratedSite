import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { groups, formatPrice } from '../data';
import ProduceIcon from '../components/ProduceIcon';

export default function Home() {
  useEffect(() => {
    document.title = 'Fresh Market';
  }, []);

  return (
    <div className='page'>
      <section className='hero'>
        <h1>Welcome to Fresh Market</h1>
        <p>
          Browse our small catalogue of fruit and vegetables. Pick an item from the navigation or from the
          cards below to see its characteristics and price.
        </p>
      </section>

      {groups.map((group) => (
        <section key={group.id} className='home-group' aria-labelledby={`home-${group.id}`}>
          <h2 id={`home-${group.id}`}>{group.name}</h2>
          <ul className='card-grid'>
            {group.items.map((item) => (
              <li key={item.id}>
                <Link to={`/item/${item.id}`} className='card'>
                  <span className='card-icon'>
                    <ProduceIcon id={item.id} size={56} />
                  </span>
                  <span className='card-name'>{item.name}</span>
                  <span className='card-price'>
                    {formatPrice(item.price)} <small>/ {item.unit}</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
