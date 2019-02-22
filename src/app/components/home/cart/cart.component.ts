import { Component, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/cart-product.model';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartProducts: CartProduct[];
  constructor(
    public cartService: CartService,
    public toaster: ToastrService) { }

  ngOnInit() {
    this.getCartProducts();
  }

  getCartProducts() {
    this.cartProducts = this.cartService.getLocalCartProducts();
    this.cartService.cartCalculation();
  }


  removeCartProduct(product: CartProduct) {
    this.cartService.removeLocalCartProduct(product);

    // Recalling
    this.getCartProducts();
    this.toaster.success('Product successfully removed from Cart');
  }

  increaseQuantity(product: CartProduct) {
    if (product.quantity < 10) {
      product.quantity = product.quantity + 1;
      localStorage.setItem('avct_item', JSON.stringify(this.cartProducts));
      this.getCartProducts();
    }

  }

  descreaseQuantity(product: CartProduct) {
    if (product.quantity > 1) {
      product.quantity = product.quantity - 1;
      localStorage.setItem('avct_item', JSON.stringify(this.cartProducts));
      this.getCartProducts();
    }

  }




}
