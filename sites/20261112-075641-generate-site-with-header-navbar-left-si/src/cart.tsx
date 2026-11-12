import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { allItems } from './data';
import type { Item, ItemId } from './data';

export const MAX_QUANTITY = 99;
const STORAGE_KEY = 'fresh-market-cart';

type Quantities = Partial<Record<ItemId, number>>;

export interface CartLine {
  item: Item;
  quantity: number;
  total: number;
}

export interface CartNotice {
  id: number;
  text: string;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  notice: CartNotice | null;
  quantityOf: (id: ItemId) => number;
  addItem: (id: ItemId, amount?: number) => void;
  setQuantity: (id: ItemId, quantity: number) => void;
  removeItem: (id: ItemId) => void;
  clear: () => void;
  dismissNotice: () => void;
}

function clamp(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(MAX_QUANTITY, Math.floor(value)));
}

function loadQuantities(): Quantities {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    const source = parsed as Record<string, unknown>;
    const result: Quantities = {};
    allItems.forEach((item) => {
      const value = source[item.id];
      if (typeof value === 'number') {
        const quantity = clamp(value);
        if (quantity > 0) result[item.id] = quantity;
      }
    });
    return result;
  } catch {
    return {};
  }
}

function lineTotal(price: number, quantity: number): number {
  return (Math.round(price * 100) * quantity) / 100;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Quantities>(() => loadQuantities());
  const [notice, setNotice] = useState<CartNotice | null>(null);
  const noticeId = useRef<number>(0);

  // Persist the cart so it survives a page reload.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      // Storage may be unavailable (private mode); the cart still works in memory.
    }
  }, [quantities]);

  // Auto-dismiss the confirmation message.
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 4000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = [];
    let count = 0;
    let subtotalCents = 0;
    allItems.forEach((item) => {
      const quantity = quantities[item.id] ?? 0;
      if (quantity > 0) {
        const total = lineTotal(item.price, quantity);
        lines.push({ item, quantity, total });
        count += quantity;
        subtotalCents += Math.round(item.price * 100) * quantity;
      }
    });

    const announce = (text: string) => {
      noticeId.current += 1;
      setNotice({ id: noticeId.current, text });
    };

    const withoutItem = (prev: Quantities, id: ItemId): Quantities => {
      const next: Quantities = { ...prev };
      delete next[id];
      return next;
    };

    return {
      lines,
      count,
      subtotal: subtotalCents / 100,
      notice,
      quantityOf: (id) => quantities[id] ?? 0,
      addItem: (id, amount = 1) => {
        const item = allItems.find((i) => i.id === id);
        if (!item) return;
        const current = quantities[id] ?? 0;
        const next = clamp(current + Math.max(1, Math.floor(amount)));
        const added = next - current;
        if (added <= 0) {
          announce('Maximum quantity of ' + item.name + ' reached (' + MAX_QUANTITY + ').');
          return;
        }
        setQuantities((prev) => ({ ...prev, [id]: next }));
        announce(added + ' × ' + item.name + ' added to cart.');
      },
      setQuantity: (id, quantity) => {
        const next = clamp(quantity);
        setQuantities((prev) => (next > 0 ? { ...prev, [id]: next } : withoutItem(prev, id)));
      },
      removeItem: (id) => {
        setQuantities((prev) => withoutItem(prev, id));
      },
      clear: () => {
        setQuantities({});
      },
      dismissNotice: () => setNotice(null),
    };
  }, [quantities, notice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}
