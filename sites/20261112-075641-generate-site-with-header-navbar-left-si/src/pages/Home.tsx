import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, groups } from '../data';
import { ItemIcon } from '../icons';

export default function Home() {
  useEffect(() => {
    document.title = 'Fresh Market';
  }, []);

  return (
    <div className='page'>
      <section className='hero'>
        <p className='eyebrow'>Welcome</p>
        <h1>Fresh produce, neatly organised</h1>
        <p className='lead'>
          Browse the catalogue using the navigation on the left, or pick a product below to see its characteristics and price.
        </p>
      </section>

      {groups.map((group) => (
        <section className='home-group' key={group.id} aria-labelledby={'home-' + group.id}>
          <h2 id={'home-' + group.id}>{group.name}</h2>
          <ul className='card-grid'>
            {group.items.map((item) => (
              <li key={item.id}>
                <Link to={'/item/' + item.id} className='card'>
                  <span className='card-icon' style={{ backgroundColor: item.tint }}>
                    <ItemIcon id={item.id} size={56} />
                  </span>
                  <span className='card-body'>
                    <span className='card-name'>{item.name}</span>
                    <span className='card-tagline'>{item.tagline}</span>
                    <span className='card-price'>
                      {formatPrice(item.price)} <small>{item.unit}</small>
                    </span>
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
