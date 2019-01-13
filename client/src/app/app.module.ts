import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { MotionComponent } from './motion/motion.component';
import { EditСustomersComponent } from './edit-customers/edit-customers.component';
import { EditMotionComponent } from './edit-motion/edit-motion.component';
import { DataService } from './data.service';
import { AuthService} from './auth.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    MotionComponent,
    EditMotionComponent,
    EditСustomersComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditСustomersComponent,
    EditMotionComponent,
  ]
})
export class AppModule { }
