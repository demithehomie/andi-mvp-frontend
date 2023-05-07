import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { AdminHomePage } from './pages/admin-home/admin-home.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
   
  },
  {
    path: 'dashboard',
    component: DashboardPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./pages/admin-home/admin-home.module').then( m => m.AdminHomePageModule)
  },
  {
    path: 'admin-home',
    component: AdminHomePage,
    canActivate: [AuthGuard]
  },
  {
    path: 'forbidden',
    loadChildren: () => import('./pages/forbidden/forbidden.module').then( m => m.ForbiddenPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
