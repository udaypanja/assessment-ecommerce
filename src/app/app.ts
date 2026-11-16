import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ShopStore } from './shop.store';

@Component({ selector: 'app-root', imports: [RouterOutlet, RouterLink], templateUrl: './app.html', styleUrl: './app.css' })
export class App { readonly shop = inject(ShopStore); }
