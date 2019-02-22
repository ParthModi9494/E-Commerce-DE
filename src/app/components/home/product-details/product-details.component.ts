import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/app/models/cart-product.model';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  public vegTopping = 25;
  public nonvegTopping = 50;

  public product;
  public productId: string;
  public varients = ['Veg', 'Non Veg'];
  public vegOptions = [];
  public nonvegOptions = [];
  public varient = null;
  public options: string[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public productService: ProductService,
    public toaster: ToastrService,
    public cartService: CartService,
    public fb: FormBuilder) {
  }

  ngOnInit() {

    this.productId = this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.getProduct(this.productId).then((doc) => {
      if (doc.exists) {
        this.product = doc.data();

        this.galleryImages = this.product.productImages.map((item) => {
          return { small: item.imgUrl, medium: item.imgUrl, big: item.imgUrl };
        });
        this.vegOptions = this.product.options.filter(item => {
          return item.type === 'Veg';
        });

        this.nonvegOptions = this.product.options.filter(item => {
          return item.type === 'Non Veg';
        });
      }

    }).catch((error) => {
      this.toaster.error(error.message);
    });




    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

  }

  addToCart(product: Product) {

    if (this.varient && this.options.length > 0) {
      const cartProduct = new CartProduct();
      cartProduct.id = this.productId;
      cartProduct.name = product.name;
      cartProduct.image = product.productImages.length > 0 ? product.productImages[0].imgUrl : '';
      cartProduct.options = this.options;
      cartProduct.varient = this.varient;
      cartProduct.price = product.price;

      const localCartProducts = this.cartService.getLocalCartProducts();
      const similarProducts = localCartProducts.filter((item) => {
        return item.id === cartProduct.id;
      });


      if (similarProducts.length > 0) {
        const sameProduct = similarProducts.find(item => {
          // tslint:disable-next-line:max-line-length
          return item.options.length === cartProduct.options.length && item.options.sort().every((value, index) => value === cartProduct.options.sort()[index]);
        });
        if (sameProduct) {
          const index = localCartProducts.indexOf(sameProduct);
          if (index !== -1) {
            sameProduct.quantity++;
            localCartProducts[index] = sameProduct;
            // localStorage.removeItem('avct_item');
            localStorage.setItem('avct_item', JSON.stringify(localCartProducts));
            this.toaster.info('Product quantity modified');
          }
          // this.cartService.addToCart(sameProduct);

        } else {
          cartProduct.quantity = 1;

          this.cartService.addToCart(cartProduct);

        }
      } else {
        cartProduct.quantity = 1;
        this.cartService.addToCart(cartProduct);


      }



    } else {

    }
  }

  onOptionToggle(event: any) {
    if (event.target.checked) {
      this.options.push(event.target.value);
    } else {
      const index = this.options.indexOf(event.target.value);
      if (index !== -1) {
        this.options.splice(index, 1);
      }
    }
  }

  onVarientToggle() {
    this.options = [];
  }



}
