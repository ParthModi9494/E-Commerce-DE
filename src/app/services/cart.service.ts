import { Injectable } from '@angular/core';
import { CartProduct } from '../models/cart-product.model';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  navbarCartCount = 0;
  estimatedTax = 8;
  deliveryCharge = 60;
  cartDetails = {
    totalMRP: null,
    tax: null,
    delivery: null,
    totalAmount: null
  };
  constructor(
    private toaster: ToastrService
  ) { }

  addToCart(data: CartProduct): void {
    let a: CartProduct[];

    a = JSON.parse(localStorage.getItem('avct_item')) || [];

    a.push(data);


    this.toaster.success('Product has been added to cart');

    localStorage.setItem('avct_item', JSON.stringify(a));
    this.calculateLocalCartProdCounts();

  }

  cartCalculation() {
    const products = this.getLocalCartProducts();
    if (products.length > 0) {
      this.cartDetails.totalMRP = products.map(prod => prod.price.offerPrice * prod.quantity).reduce((prev, next) => prev + next);
      this.cartDetails.tax = (this.cartDetails.totalMRP * this.estimatedTax) / 100;
      this.cartDetails.delivery = this.cartDetails.totalMRP >= 500 ? 0 : this.deliveryCharge;
      this.cartDetails.totalAmount = this.cartDetails.totalMRP + this.cartDetails.tax + this.cartDetails.delivery;
    } else {
      this.initCartDetails();
    }
  }

  initCartDetails() {
    this.cartDetails.totalMRP = 0;
    this.cartDetails.tax = 0;
    this.cartDetails.delivery = 0;
    this.cartDetails.totalAmount = 0;
  }

  calculateLocalCartProdCounts() {
    this.navbarCartCount = this.getLocalCartProducts().length;

    this.cartCalculation();


  }

  // Fetching Locat CartsProducts
  getLocalCartProducts(): CartProduct[] {
    const products: CartProduct[] = JSON.parse(localStorage.getItem('avct_item')) || [];

    return products;
  }

  // Removing cart from local
  removeLocalCartProduct(product: CartProduct) {

    const products: CartProduct[] = JSON.parse(localStorage.getItem('avct_item'));

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === product.id) {
        products.splice(i, 1);
        break;
      }
    }
    // ReAdding the products after remove
    localStorage.setItem('avct_item', JSON.stringify(products));

    this.calculateLocalCartProdCounts();


  }
}
