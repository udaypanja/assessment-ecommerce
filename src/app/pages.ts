import { Component, inject, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product, ShopStore } from './shop.store';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './pages/product-card.html',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  private shop = inject(ShopStore);
  add() {
    this.shop.add(this.product);
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, ProductCard, RouterLink],
  templateUrl: './pages/home-page.html',
})
export class HomePage {
  readonly products = inject(ShopStore).products;
}

@Component({
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './pages/catalog-page.html',
})
export class CatalogPage {
  private route = inject(ActivatedRoute);
  readonly products = inject(ShopStore).products;
  categories = ['All', 'Home', 'Kitchen', 'Accessories'];
  active = 'All';
  constructor() {
    this.route.queryParamMap.subscribe((p) => {
      const cat = p.get('category');
      this.active = cat && this.categories.includes(cat) ? cat : 'All';
    });
  }
  get filtered() {
    return this.active === 'All'
      ? this.products
      : this.products.filter((p) => p.category === this.active);
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './pages/detail-page.html',
})
export class DetailPage {
  private route = inject(ActivatedRoute);
  private shop = inject(ShopStore);
  readonly product = this.shop.products.find(
    (p) => p.id === Number(this.route.snapshot.paramMap.get('id')),
  );
  add() {
    if (this.product) this.shop.add(this.product);
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './pages/cart-page.html',
})
export class CartPage {
  readonly shop = inject(ShopStore);
  orderPlaced = false;
  orderNumber = '';
  get total() {
    return this.shop.subtotal() + (this.shop.subtotal() >= 75 || !this.shop.count() ? 0 : 6);
  }
  pay() {
    this.orderNumber = String(Math.floor(10000 + Math.random() * 89999));
    this.orderPlaced = true;
    this.shop.clear();
  }
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pages/register-page.html',
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';
  created = false;
  submit(form: any) {
    if (form.valid) this.created = true;
  }
}
