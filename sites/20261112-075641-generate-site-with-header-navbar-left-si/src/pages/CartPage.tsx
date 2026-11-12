import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MAX_QUANTITY, useCart } from '../cart';
import QuantityStepper from '../components/QuantityStepper';
import { formatPrice } from '../data';
import { CartIcon, ItemIcon, TrashIcon } from '../icons';

export default function CartPage() {
  const { lines, count, subtotal, setQuantity, removeItem, clear } = useCart();
  const [orderedTotal, setOrderedTotal] = useState<number | null>(null);

  useEffect(() => {
    document.title = 'Cart | Fresh Market';
  }, []);

  const placeOrder = () => {
    setOrderedTotal(subtotal);
    clear();
  };

  if (lines.length === 0 && orderedTotal !== null) {
    return (
      <div className='page cart-empty' role='status'>
        <span className='cart-empty-icon cart-empty-icon-ok'>
          <svg viewBox='0 0 24 24' width='40' height='40' fill='none' stroke='currentColor' strokeWidth='2.400' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true' focusable='false'>
            <path d='M5 12.500l4.500 4.500L19 7.500' />
          </svg>
        </span>
        <h1>Thank you!</h1>
        <p className='lead'>
          Your demo order of {formatPrice(orderedTotal)} went through. This is a demonstration store, so no payment was taken and nothing will be delivered.
        </p>
        <Link to='/' className='button'>
          Continue shopping
        </Link>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className='page cart-empty'>
        <span className='cart-empty-icon'>
          <CartIcon size={40} />
        </span>
        <h1>Your cart is empty</h1>
        <p className='lead'>Pick some fresh fruit or vegetables from the catalogue to get started.</p>
        <Link to='/' className='button'>
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className='page'>
      <p className='eyebrow'>Shopping cart</p>
      <h1>Your cart</h1>
      <p className='lead'>
        {count} {count === 1 ? 'item' : 'items'} across {lines.length} {lines.length === 1 ? 'product' : 'products'}.
      </p>

      <div className='cart-layout'>
        <ul className='cart-list' aria-label='Items in your cart'>
          {lines.map(({ item, quantity, total }) => (
            <li className='cart-line' key={item.id}>
              <span className='cart-line-icon' style={{ backgroundColor: item.tint }}>
                <ItemIcon id={item.id} size={40} />
              </span>
              <div className='cart-line-info'>
                <Link to={'/item/' + item.id} className='cart-line-name'>
                  {item.name}
                </Link>
                <span className='cart-line-unit'>
                  {formatPrice(item.price)} {item.unit}
                </span>
              </div>
              <div className='cart-line-qty'>
                <QuantityStepper
                  value={quantity}
                  onChange={(value) => setQuantity(item.id, value)}
                  itemName={item.name}
                  max={MAX_QUANTITY}
                />
              </div>
              <span className='cart-line-total'>
                <span className='visually-hidden'>Line total: </span>
                {formatPrice(total)}
              </span>
              <button
                type='button'
                className='icon-button cart-line-remove'
                aria-label={'Remove ' + item.name + ' from cart'}
                onClick={() => removeItem(item.id)}
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>

        <section className='cart-summary' aria-labelledby='summary-heading'>
          <h2 id='summary-heading'>Order summary</h2>
          <dl className='summary-rows'>
            <div className='summary-row'>
              <dt>Items</dt>
              <dd>{count}</dd>
            </div>
            <div className='summary-row'>
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className='summary-row'>
              <dt>Delivery</dt>
              <dd>Free</dd>
            </div>
            <div className='summary-row summary-total'>
              <dt>Total</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
          </dl>
          <button type='button' className='btn btn-primary btn-block' onClick={placeOrder}>
            Place demo order
          </button>
          <button type='button' className='btn btn-ghost btn-block' onClick={clear}>
            Clear cart
          </button>
          <p className='summary-note'>Demo store: prices are dummy values, no payment is taken and no order is really placed.</p>
          <Link to='/' className='summary-link'>
            Continue shopping
          </Link>
        </section>
      </div>
    </div>
  );
}
