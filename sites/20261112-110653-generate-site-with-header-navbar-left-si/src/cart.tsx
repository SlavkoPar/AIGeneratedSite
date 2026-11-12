import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { findItem } from './data';
import type { Item } from './data';

const STORAGE_KEY = 'fresh-market-cart';
export const MAX_QUANTITY = 99;

type Quantities = Record<string, number>;

export interface CartLine {
  item: Item;
  quantity: number;
  lineTotal: number;
}

export interface Announcement {
  id: number;
  text: string;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  total: number;
  announcement: Announcement;
  getQuantity: (slug: string) => number;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: (message?: string) => void;
}

function clamp(n: number): number {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(n)));
}

function load(): Quantities {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return {};
    const result: Quantities = {};
    for (const [slug, qty] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof qty === 'number' && Number.isFinite(qty) && qty >= 1 && findItem(slug)) {
        result[slug] = clamp(qty);
      }
    }
    return result;
  } catch {
    return {};
  }
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [quantities, setQuantities] = useState<Quantities>(load);
  const [announcement, setAnnouncement] = useState<Announcement>({ id: 0, text: '' });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(quantities));
    } catch {
      /* storage may be unavailable; the cart still works in memory */
    }
  }, [quantities]);

  const announce = useCallback((text: string) => {
    setAnnouncement((prev) => ({ id: prev.id + 1, text }));
  }, []);

  const add = useCallback(
    (slug: string, quantity: number = 1) => {
      const found = findItem(slug);
      if (!found) return;
      const amount = clamp(quantity);
      setQuantities((prev) => ({ ...prev, [slug]: clamp((prev[slug] ?? 0) + amount) }));
      announce('Added ' + amount + ' x ' + found.item.name + ' to your cart.');
    },
    [announce]
  );

  const setQuantity = useCallback((slug: string, quantity: number) => {
    if (!findItem(slug)) return;
    setQuantities((prev) => ({ ...prev, [slug]: clamp(quantity) }));
  }, []);

  const remove = useCallback(
    (slug: string) => {
      const found = findItem(slug);
      setQuantities((prev) => {
        const next: Quantities = { ...prev };
        delete next[slug];
        return next;
      });
      if (found) announce('Removed ' + found.item.name + ' from your cart.');
    },
    [announce]
  );

  const clear = useCallback(
    (message: string = 'Your cart is now empty.') => {
      setQuantities({});
      announce(message);
    },
    [announce]
  );

  const value = useMemo<CartContextValue>(() => {
    const lines: CartLine[] = [];
    for (const [slug, quantity] of Object.entries(quantities)) {
      const found = findItem(slug);
      if (found) {
        lines.push({ item: found.item, quantity, lineTotal: found.item.price * quantity });
      }
    }
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const total = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    return {
      lines,
      count,
      total,
      announcement,
      getQuantity: (slug: string) => quantities[slug] ?? 0,
      add,
      setQuantity,
      remove,
      clear,
    };
  }, [quantities, announcement, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return ctx;
}
