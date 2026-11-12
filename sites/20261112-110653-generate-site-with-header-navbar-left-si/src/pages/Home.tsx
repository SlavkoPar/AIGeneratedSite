import { Link } from 'react-router-dom';
import { formatPrice, groups } from '../data';
import ItemIcon from '../components/ItemIcon';

export default function Home() {
  return (
    <div className="page">
      <h1>Welcome to Fresh Market</h1>
      <p className="lead">
        Browse our produce using the navigation on the left, or pick an item below to see its
        characteristics and price.
      </p>

      {groups.map((group) => (
        <section key={group.id} aria-labelledby={'home-' + group.id} className="home-section">
          <h2 id={'home-' + group.id}>{group.name}</h2>
          <ul className="card-grid">
            {group.items.map((item) => (
              <li key={item.slug}>
                <Link to={'/item/' + item.slug} className="card">
                  <span className="card-icon">
                    <ItemIcon slug={item.slug} size={56} />
                  </span>
                  <span className="card-name">{item.name}</span>
                  <span className="card-price">
                    {formatPrice(item.price)} <small>{item.unit}</small>
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
