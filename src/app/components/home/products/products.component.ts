import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CartProduct } from 'src/app/models/cart-product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: any[];
  constructor(
    public productsService: ProductService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe((actionArray) => {
      this.products = actionArray.map(product => {
        return {
          id: product.payload.doc.id,
          ...product.payload.doc.data()
        };

      });
    });

  }

  onSort(event: any) {
    if (event.target.value === 'name') {
      this.products.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    } else if (event.target.value === 'priceh2l') {
      this.products.sort((a, b) => {
        if (a.price.offerPrice > b.price.offerPrice) {
          return -1;
        }
        if (a.price.offerPrice < b.price.offerPrice) {
          return 1;
        }
        return 0;
      });

    } else if (event.target.value === 'pricel2h') {

      this.products.sort((a, b) => {
        if (a.price.offerPrice < b.price.offerPrice) {
          return -1;
        }
        if (a.price.offerPrice > b.price.offerPrice) {
          return 1;
        }
        return 0;
      });

    }
  }
}
