import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductService } from './services/product.service';
import { HttpModule } from '../../node_modules/@angular/http';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(
      [
      {
      path: '',
      component: CartComponent,
    },

  ]
)
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
