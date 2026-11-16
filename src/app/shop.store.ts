import { Injectable, computed, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  label?: string;
  color: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ShopStore {
  readonly products: Product[] = [
    {
      id: 1,
      name: 'Sunday linen throw',
      category: 'Home',
      price: 68,
      oldPrice: 84,
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
      label: 'BESTSELLER',
      color: 'Natural oat',
      description:
        'A soft, breathable layer for slow mornings and long evenings. Woven from European flax linen with a relaxed, lived-in feel.',
    },
    {
      id: 2,
      name: 'Everyday ceramic mug',
      category: 'Kitchen',
      price: 28,
      image:
        'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85',
      label: 'HANDMADE',
      color: 'Warm white',
      description:
        'A considered little ritual, made by hand. This stoneware mug has an easy, comfortable handle and a soft satin glaze.',
    },
    {
      id: 3,
      name: 'Market tote in canvas',
      category: 'Accessories',
      price: 42,
      image:
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
      color: 'Olive',
      description:
        'Room for the market, the beach, and everything in between. Heavyweight recycled cotton canvas with sturdy shoulder straps.',
    },
    {
      id: 4,
      name: 'Sculpted glass carafe',
      category: 'Kitchen',
      price: 54,
      image:
        'https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?auto=format&fit=crop&w=900&q=85',
      label: 'LOW STOCK',
      color: 'Clear',
      description:
        'A softly sculptural silhouette for water at the table or stems on the windowsill. Each piece has its own subtle character.',
    },
    {
      id: 5,
      name: 'Soft cotton bath towel',
      category: 'Home',
      price: 36,
      image:
        'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?auto=format&fit=crop&w=900&q=85',
      color: 'Clay',
      description:
        'Everyday comfort, made better. Plush organic cotton with a textured finish that gets softer with every wash.',
    },
    {
      id: 6,
      name: 'Sunday scent, no. 02',
      category: 'Accessories',
      price: 48,
      image:
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85',
      color: 'Fig & cedar',
      description:
        'Green fig, warm cedar, and a little sunlight. A clean-burning soy candle poured in small batches for unhurried evenings.',
    },
    {
      id: 7,
      name: 'Woven picnic blanket',
      category: 'Home',
      price: 89,
      image:
        'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=900&q=85',
      label: 'NEW',
      color: 'Sand stripe',
      description:
        'A generous, easy-care blanket for outside days. Lightweight, packable, and finished with a soft fringe.',
    },
    {
      id: 8,
      name: 'Daily ritual journal',
      category: 'Accessories',
      price: 24,
      image:
        'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85',
      color: 'Ochre',
      description:
        'A little space to gather your thoughts. Recycled paper, lay-flat binding, and a linen-textured cover.',
    },
  ];
  private readonly cartItems = signal<{ product: Product; quantity: number }[]>([]);
  readonly cart = this.cartItems.asReadonly();
  readonly count = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
  readonly subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );
  add(product: Product) {
    this.cartItems.update((items) => {
      const found = items.find((item) => item.product.id === product.id);
      return found
        ? items.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...items, { product, quantity: 1 }];
    });
  }
  change(id: number, delta: number) {
    this.cartItems.update((items) =>
      items
        .map((item) =>
          item.product.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }
  remove(id: number) {
    this.cartItems.update((items) => items.filter((item) => item.product.id !== id));
  }
  clear() {
    this.cartItems.set([]);
  }
}
