import { Routes } from '@angular/router';
import { CartPage, CatalogPage, DetailPage, HomePage, RegisterPage } from './pages';

export const routes: Routes = [
  {path:'',component:HomePage,title:'Sunday — Thoughtful things for everyday living'},
  {path:'shop',component:CatalogPage,title:'Shop all — Sunday'},
  {path:'product/:id',component:DetailPage,title:'Product — Sunday'},
  {path:'cart',component:CartPage,title:'Your bag — Sunday'},
  {path:'register',component:RegisterPage,title:'Create your account — Sunday'},
  {path:'**',redirectTo:''}
];
