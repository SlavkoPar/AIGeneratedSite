import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { allItems, findGroupOfItem, formatPrice } from '../data';
import ProduceIcon from '../components/ProduceIcon';
import NotFound from './NotFound';

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const index = allItems.findIndex((i) => i.id === id);
  const item = index >= 0 ? allItems[index] : undefined;

  useEffect(() => {
    if (item) document.title = `${item.name} - Fresh Market`;
  }, [item]);

  if (!item) return <NotFound />;

  const group = findGroupOfItem(item.id);
  const prev = allItems[(index - 1 + allItems.length) % allItems.length];
  const next = allItems[(index + 1) % allItems.length];
  const accentStyle = { '--accent': item.color } as CSSProperties;

  return (
    <article className='page item-page' style={accentStyle}>
      <nav className='breadcrumb' aria-label='Breadcrumb'>
        <ol>
          <li>
            <Link to='/'>Overview</Link>
          </li>
          {group && <li>{group.name}</li>}
          <li aria-current='page'>{item.name}</li>
        </ol>
      </nav>

      <header className='item-hero'>
        <div className='item-icon'>
          <ProduceIcon id={item.id} size={120} />
        </div>
        <div className='item-intro'>
          {group && <span className='badge'>{group.name}</span>}
          <h1>{item.name}</h1>
          <p className='tagline'>{item.tagline}</p>
          <p className='price'>
            <span className='price-value'>{formatPrice(item.price)}</span>
            <span className='price-unit'> per {item.unit}</span>
          </p>
        </div>
      </header>

      <section className='panel' aria-labelledby='about-heading'>
        <h2 id='about-heading'>About</h2>
        <p>{item.description}</p>
      </section>

      <section className='panel' aria-labelledby='char-heading'>
        <h2 id='char-heading'>Characteristics</h2>
        <dl className='char-list'>
          {item.characteristics.map((c) => (
            <div className='char-row' key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.value}</dd>
            </div>
          ))}
          <div className='char-row'>
            <dt>Price</dt>
            <dd>
              {formatPrice(item.price)} / {item.unit}
            </dd>
          </div>
        </dl>
      </section>

      <nav className='pager' aria-label='More produce'>
        <Link to={`/item/${prev.id}`} className='pager-link'>
          <ProduceIcon id={prev.id} size={28} />
          <span>
            <small>Previous</small>
            {prev.name}
          </span>
        </Link>
        <Link to={`/item/${next.id}`} className='pager-link pager-next'>
          <span>
            <small>Next</small>
            {next.name}
          </span>
          <ProduceIcon id={next.id} size={28} />
        </Link>
      </nav>
    </article>
  );
}
