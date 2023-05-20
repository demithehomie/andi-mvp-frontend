import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { LoginPage } from '../login/login.page';

@NgModule({
  imports: [
    
    HttpClientModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage],
  providers: [UsersService, AuthenticationService, AppStorageService, LoginPage]
})
export class DashboardPageModule {}
