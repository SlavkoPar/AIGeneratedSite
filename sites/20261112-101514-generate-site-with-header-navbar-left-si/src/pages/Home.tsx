import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, groups, products } from '../data';
import { ItemIcon } from '../icons';

export default function Home() {
  useEffect(() => {
    document.title = 'Fresh Market';
  }, []);

  return (
    <div className='page'>
      <section className='intro'>
        <h1>Welcome to Fresh Market</h1>
        <p>
          Browse our fruit and vegetables. Pick an item from the navigation or from the cards below to see its
          characteristics and price.
        </p>
      </section>
      {groups.map((group) => (
        <section key={group} className='card-section' aria-labelledby={`home-${group}`}>
          <h2 id={`home-${group}`}>{group}</h2>
          <ul className='card-grid'>
            {products
              .filter((p) => p.group === group)
              .map((p) => (
                <li key={p.id}>
                  <Link to={`/item/${p.id}`} className='card'>
                    <span className='card-icon' style={{ background: p.tint }}>
                      <ItemIcon id={p.id} size={56} />
                    </span>
                    <span className='card-name'>{p.name}</span>
                    <span className='card-price'>
                      {formatPrice(p)} <small>/ {p.unit}</small>
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
