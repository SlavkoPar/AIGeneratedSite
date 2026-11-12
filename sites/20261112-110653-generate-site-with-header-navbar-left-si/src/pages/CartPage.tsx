import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../data';
import { useCart } from '../cart';
import ItemIcon from '../components/ItemIcon';
import QuantityStepper from '../components/QuantityStepper';

export default function CartPage() {
  const { lines, count, total, setQuantity, remove, clear } = useCart();
  const [placed, setPlaced] = useState<boolean>(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const previousLength = useRef<number>(lines.length);

  useEffect(() => {
    document.title = 'Cart - Fresh Market';
    return () => {
      document.title = 'Fresh Market';
    };
  }, []);

  // When a line disappears its buttons vanish too, so move focus to the heading.
  useEffect(() => {
    if (lines.length < previousLength.current) {
      headingRef.current?.focus();
    }
    previousLength.current = lines.length;
  }, [lines.length]);

  const checkout = () => {
    setPlaced(true);
    clear('Demo checkout complete. No order was placed.');
  };

  const isEmpty = lines.length === 0;

  return (
    <div className="page">
      <h1 ref={headingRef} tabIndex={-1} className="cart-heading">
        {placed && isEmpty ? 'Thank you!' : 'Your cart'}
      </h1>

      {isEmpty && placed && (
        <div className="panel">
          <p>
            This is a demo store, so no order was actually placed and nothing was charged. Your
            cart has been emptied.
          </p>
          <p>
            <Link to="/" className="text-link">Continue shopping</Link>
          </p>
        </div>
      )}

      {isEmpty && !placed && (
        <div className="panel">
          <p>Your cart is empty.</p>
          <p>
            <Link to="/" className="text-link">Browse the produce</Link>
          </p>
        </div>
      )}

      {!isEmpty && (
        <>
          <p className="lead">
            {count} {count === 1 ? 'item' : 'items'} in your cart.
          </p>

          <ul className="cart-list">
            {lines.map((line) => (
              <li key={line.item.slug} className="cart-line">
                <span className="cart-line-icon">
                  <ItemIcon slug={line.item.slug} size={40} />
                </span>
                <div className="cart-line-info">
                  <Link to={'/item/' + line.item.slug} className="cart-line-name">
                    {line.item.name}
                  </Link>
                  <span className="cart-line-unit">
                    {formatPrice(line.item.price)} {line.item.unit}
                  </span>
                </div>
                <QuantityStepper
                  value={line.quantity}
                  onChange={(value) => setQuantity(line.item.slug, value)}
                  label={'Quantity of ' + line.item.name}
                />
                <span className="cart-line-total">
                  <span className="visually-hidden">Line total: </span>
                  {formatPrice(line.lineTotal)}
                </span>
                <button
                  type="button"
                  className="btn btn-ghost"
                  aria-label={'Remove ' + line.item.name + ' from cart'}
                  onClick={() => remove(line.item.slug)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <section className="panel cart-summary" aria-labelledby="summary-heading">
            <h2 id="summary-heading">Summary</h2>
            <dl className="characteristics">
              <div className="char-row">
                <dt>Items</dt>
                <dd>{count}</dd>
              </div>
              <div className="char-row">
                <dt>Total</dt>
                <dd className="cart-total">{formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="cart-note">Demo store: prices are dummy values and checkout does not place a real order.</p>
            <div className="cart-actions">
              <button type="button" className="btn" onClick={checkout}>
                Checkout
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => clear()}>
                Empty cart
              </button>
              <Link to="/" className="text-link">Continue shopping</Link>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
