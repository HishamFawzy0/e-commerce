import { authGuard } from './core/guards/auth/auth.guard';
import { Routes } from '@angular/router';
import { HomeComponent } from './features/pages/home/home.component';
import { CartComponent } from './features/pages/cart/cart.component';
import { ProductsComponent } from './features/pages/products/products.component';
import { CategoriesComponent } from './features/pages/categories/categories.component';
import { BrandsComponent } from './features/pages/brands/brands.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { NotfoundComponent } from './features/layout/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent ,canActivate:[authGuard] },
  { path: 'cart', component: CartComponent ,canActivate:[authGuard] },
  { path: 'products', component: ProductsComponent ,canActivate:[authGuard] },
  { path: 'categories', component: CategoriesComponent ,canActivate:[authGuard] },
  { path: 'brands', component: BrandsComponent ,canActivate:[authGuard] },


  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotfoundComponent },
];
