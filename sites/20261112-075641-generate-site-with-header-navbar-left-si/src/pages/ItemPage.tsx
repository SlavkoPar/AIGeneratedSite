import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MAX_QUANTITY, useCart } from '../cart';
import QuantityStepper from '../components/QuantityStepper';
import { allItems, findItem, formatPrice } from '../data';
import { CartIcon, ItemIcon } from '../icons';
import NotFound from './NotFound';

interface Characteristic {
  label: string;
  value: string;
}

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const found = findItem(id);
  const { addItem, quantityOf } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    document.title = found ? found.item.name + ' | Fresh Market' : 'Not found | Fresh Market';
  }, [found]);

  // Reset the quantity picker when switching to another product.
  useEffect(() => {
    setQuantity(1);
  }, [id]);

  if (!found) {
    return <NotFound />;
  }

  const { item, group } = found;
  const inCart = quantityOf(item.id);
  const index = allItems.findIndex((i) => i.id === item.id);
  const prev = index > 0 ? allItems[index - 1] : undefined;
  const next = index < allItems.length - 1 ? allItems[index + 1] : undefined;

  const characteristics: Characteristic[] = [
    { label: 'Category', value: group.name },
    { label: 'Origin', value: item.origin },
    { label: 'Season', value: item.season },
    { label: 'Energy', value: item.calories },
    { label: 'Taste', value: item.taste },
    { label: 'Storage', value: item.storage },
  ];

  return (
    <article className='page'>
      <nav className='breadcrumb' aria-label='Breadcrumb'>
        <ol>
          <li>
            <Link to='/'>Overview</Link>
          </li>
          <li>{group.name}</li>
          <li aria-current='page'>{item.name}</li>
        </ol>
      </nav>

      <header className='item-hero'>
        <div className='item-hero-icon' style={{ backgroundColor: item.tint }}>
          <ItemIcon id={item.id} size={140} title={item.name + ' icon'} />
        </div>
        <div className='item-hero-text'>
          <p className='eyebrow'>{group.name}</p>
          <h1>{item.name}</h1>
          <p className='lead'>{item.tagline}</p>
          <div className='price-box'>
            <span className='price-label'>Price</span>
            <span className='price-value'>{formatPrice(item.price)}</span>
            <span className='price-unit'>{item.unit}</span>
          </div>
          <p className='price-note'>Dummy price, for illustration only.</p>

          <div className='buy-row'>
            <QuantityStepper value={quantity} onChange={setQuantity} itemName={item.name} max={MAX_QUANTITY} />
            <button type='button' className='btn btn-primary' onClick={() => addItem(item.id, quantity)}>
              <CartIcon size={20} />
              Add to cart
            </button>
          </div>
          {inCart > 0 && (
            <p className='in-cart-note'>
              {inCart} in your cart. <Link to='/cart'>View cart</Link>
            </p>
          )}
        </div>
      </header>

      <section className='panel' aria-labelledby='about-heading'>
        <h2 id='about-heading'>About</h2>
        <p>{item.description}</p>
      </section>

      <section className='panel' aria-labelledby='char-heading'>
        <h2 id='char-heading'>Characteristics</h2>
        <dl className='characteristics'>
          {characteristics.map((c) => (
            <div className='characteristic' key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav className='pager' aria-label='More products'>
        {prev ? (
          <Link to={'/item/' + prev.id} className='pager-link'>
            <ItemIcon id={prev.id} size={28} />
            <span>
              <small>Previous</small>
              {prev.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={'/item/' + next.id} className='pager-link pager-next'>
            <span>
              <small>Next</small>
              {next.name}
            </span>
            <ItemIcon id={next.id} size={28} />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
