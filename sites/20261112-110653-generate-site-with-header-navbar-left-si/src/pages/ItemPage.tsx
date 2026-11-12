import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findItem, formatPrice } from '../data';
import { useCart } from '../cart';
import ItemIcon from '../components/ItemIcon';
import QuantityStepper from '../components/QuantityStepper';
import NotFound from './NotFound';

export default function ItemPage() {
  const { slug } = useParams<{ slug: string }>();
  const found = findItem(slug);
  const { add, getQuantity } = useCart();
  const [qty, setQty] = useState<number>(1);

  useEffect(() => {
    setQty(1);
  }, [slug]);

  useEffect(() => {
    document.title = found ? found.item.name + ' - Fresh Market' : 'Fresh Market';
    return () => {
      document.title = 'Fresh Market';
    };
  }, [found]);

  if (!found) return <NotFound />;

  const { item, group } = found;
  const inCart = getQuantity(item.slug);

  return (
    <article className="page">
      <nav aria-label="Breadcrumb" className="breadcrumb">
        <Link to="/">Overview</Link>
        <span aria-hidden="true">/</span>
        <span>{group.name}</span>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{item.name}</span>
      </nav>

      <div className="item-hero">
        <div className="item-icon">
          <ItemIcon slug={item.slug} size={128} />
        </div>
        <div className="item-intro">
          <span className="badge">{group.name}</span>
          <h1>{item.name}</h1>
          <p className="lead">{item.tagline}</p>
          <p className="price">
            <span className="price-value">{formatPrice(item.price)}</span>
            <span className="price-unit">{item.unit}</span>
          </p>
          <div className="buy-row">
            <QuantityStepper value={qty} onChange={setQty} label={'Quantity of ' + item.name} />
            <button type="button" className="btn" onClick={() => add(item.slug, qty)}>
              Add to cart
            </button>
          </div>
          {inCart > 0 && (
            <p className="in-cart">
              {inCart} in your cart.{' '}
              <Link to="/cart" className="text-link">View cart</Link>
            </p>
          )}
        </div>
      </div>

      <section aria-labelledby="about-heading" className="panel">
        <h2 id="about-heading">About</h2>
        <p>{item.description}</p>
      </section>

      <section aria-labelledby="char-heading" className="panel">
        <h2 id="char-heading">Characteristics</h2>
        <dl className="characteristics">
          {item.characteristics.map((c) => (
            <div className="char-row" key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.value}</dd>
            </div>
          ))}
          <div className="char-row">
            <dt>Price</dt>
            <dd>
              {formatPrice(item.price)} {item.unit}
            </dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
