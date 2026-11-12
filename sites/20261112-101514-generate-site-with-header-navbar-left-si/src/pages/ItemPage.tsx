import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatPrice, products } from '../data';
import { ItemIcon } from '../icons';
import NotFound from './NotFound';

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const index = products.findIndex((p) => p.id === id);
  const product = index >= 0 ? products[index] : undefined;

  useEffect(() => {
    if (product) document.title = `${product.name} | Fresh Market`;
  }, [product]);

  if (!product) return <NotFound />;

  const prev = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];

  return (
    <article className='page'>
      <nav className='breadcrumb' aria-label='Breadcrumb'>
        <Link to='/'>All products</Link>
        <span aria-hidden='true'>/</span>
        <span>{product.group}</span>
        <span aria-hidden='true'>/</span>
        <span aria-current='page'>{product.name}</span>
      </nav>

      <div className='detail'>
        <div className='detail-icon' style={{ background: product.tint }}>
          <ItemIcon id={product.id} size={150} title={`${product.name} icon`} />
        </div>
        <div className='detail-body'>
          <span className='badge'>{product.group}</span>
          <h1>{product.name}</h1>
          <p className='tagline'>{product.tagline}</p>
          <p className='price'>
            <span className='price-value'>{formatPrice(product)}</span>
            <span className='price-unit'>per {product.unit}</span>
          </p>
          <p>{product.description}</p>
        </div>
      </div>

      <section className='specs' aria-labelledby='specs-title'>
        <h2 id='specs-title'>Characteristics</h2>
        <dl className='spec-grid'>
          {product.characteristics.map((c) => (
            <div className='spec' key={c.label}>
              <dt>{c.label}</dt>
              <dd>{c.value}</dd>
            </div>
          ))}
          <div className='spec'>
            <dt>Price</dt>
            <dd>
              {formatPrice(product)} per {product.unit}
            </dd>
          </div>
        </dl>
      </section>

      <nav className='pager' aria-label='More products'>
        <Link to={`/item/${prev.id}`} className='pager-link'>
          <ItemIcon id={prev.id} size={28} />
          <span>
            <small>Previous</small>
            {prev.name}
          </span>
        </Link>
        <Link to={`/item/${next.id}`} className='pager-link next'>
          <span>
            <small>Next</small>
            {next.name}
          </span>
          <ItemIcon id={next.id} size={28} />
        </Link>
      </nav>
    </article>
  );
}
