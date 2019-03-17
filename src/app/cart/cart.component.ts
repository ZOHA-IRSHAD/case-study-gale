import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any = [];
  tempProducts: any = [];
  discounts: any = [];
  pincodes: any = [];
  quantityAddSub: number[] = [];
  quantity: number[] = [];
  urlForProduct = "assets/data.json";
  activeMinusBtn: boolean[] = [];
  btnValue: boolean[] = [];
  sum: number;
  price: number[] = [];
  discountValue: number;
  pincodeValue: any;
  validPincode: boolean = false;
  availibility: any = [];
  shippingValue: any = '';
  orderTotalValue: number;


  constructor(private _service: ProductService,
    private router: Router) { }

  ngOnInit() {
    console.log("second");
    this._service.getData(this.urlForProduct)
      .subscribe(productsDetails => {
        this.products = productsDetails.products;
        this.discounts = productsDetails.discount;
        this.pincodes = productsDetails.pincode;
        for (let i = 0; i < this.products.length; i++) {
          this.price.push(this.products[i].price);
          this.quantity.push(1);
          this.activeMinusBtn.push(false);
          this.assign();
          this.subTotal();
          this.discount();
          this.orderTotal();
        }
      })



  }

  //Function for increasing the quantity of item
  add(index) {
    this.price[index] = this.products[index].price;
    this.quantity[index] = this.quantity[index] + 1;
    this.activeMinusBtn[index] = true;
    this.price[index] = this.price[index] * this.quantity[index];

    this.assign();
    this.subTotal();
    this.discount();
    this.orderTotal();

  }

  //Function for decreasing the quantity of item
  substract(index) {
    this.price[index] = this.products[index].price;
    this.quantity[index] = this.quantity[index] - 1;
    this.price[index] = this.price[index] * this.quantity[index];
    if (this.quantity[index] == 1) {
      this.activeMinusBtn[index] = false;
    }
    else {
      this.activeMinusBtn[index] = true;
    }
    this.assign();
    this.subTotal();
    this.discount();
    this.orderTotal();
  }

  //Function for assigning the quantity of item
  assign() {
    this.quantityAddSub = this.quantity;
    this.activeMinusBtn = this.btnValue;
  }


  //Function to remove item from cart
  removeFromCart(item) {
    let j: any;
    for (j in this.products) {
      if (this.products[j].name == item.name) {
        this.products.splice(j, 1);
        this.quantity.splice(j, 1);
        this.price.splice(j, 1);
        this.assign();
        this.subTotal();
        this.discount();
        this.orderTotal();
      }

    }

  }

  //Function for calculating the subTotal amount of cart
  subTotal() {
    this.sum = 0;
    let i: any;
    for (i in this.products) {
      this.sum = this.sum + this.price[i];
    }
  }

  //Discount on minTotal of 5k
  discount() {
    if (this.sum >= this.discounts.minTotal) {
      this.discountValue = Math.floor((this.discounts.discountPercentage / 100) * this.sum);
    }
    else {
      this.discountValue = 0;
    }
  }

  //function for validiating pincode
  checkPincode(val) {
    this.availibility = [];
    this.shippingValue = '';
    this.pincodeValue = val;
    var arr = Object.entries(this.pincodes);

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (this.pincodeValue == arr[i][j]) {
          this.validPincode = true;
          this.availibility.push(arr[i][++j]);
          if (this.availibility[0].deliveryPrice !== 0) {
            this.shippingValue = this.availibility[0].deliveryPrice;
          }
          else {
            this.shippingValue = 0;
          }
          break;
        }
      }
    }
    this.orderTotal();

  }

  orderTotal() {
    this.orderTotalValue = 0;
    this.orderTotalValue = this.orderTotalValue + this.sum - this.discountValue + this.shippingValue;
  }

}
