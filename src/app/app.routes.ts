import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
import { LoginComponent } from './pages/login/login';
import { ProductDetailComponent } from './pages/product-detail/product-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'category/:slug', component: ProductsComponent },
  { path: 'products/:slug', component: ProductDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];
