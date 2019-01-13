import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { MotionComponent } from './motion/motion.component';
import { AuthComponent } from "./auth/auth.component";

import { AuthGuard } from "./auth.guard";

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard] },
      { path: 'motion', component: MotionComponent, canActivate: [AuthGuard] },
      { path: 'auth', component: AuthComponent },
      { path: '',
        redirectTo: 'vehicles',
        pathMatch: 'full'
      },
      { path: '**',
        redirectTo: 'vehicles',
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
