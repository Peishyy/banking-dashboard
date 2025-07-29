import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UsersComponent } from './pages/users/users';
import { UserDetailComponent } from './pages/user-detail/user-detail';
import { TransferComponent } from './pages/transfer/transfer';
import { TransactionsComponent } from './pages/transactions/transactions';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
{ path: '', redirectTo: 'register', pathMatch: 'full' },
{ path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
];

