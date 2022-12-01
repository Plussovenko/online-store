import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddPageComponent } from './add-page/add-page.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { DashdoardComponent } from './dashdoard/dashdoard.component';
import { LoginComponent } from './login/login.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    AddPageComponent,
    AdminLayoutComponent,
    DashdoardComponent,
    LoginComponent,
    EditPageComponent,
    OrdersPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/adminka/login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
          {
            path: 'dashboard',
            component: DashdoardComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'add',
            component: AddPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'orders',
            component: OrdersPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'product/:id/edit',
            component: EditPageComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
  ],
})
export class AdminkaModule {}
