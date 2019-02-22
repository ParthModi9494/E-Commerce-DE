import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cart-calculations',
  templateUrl: './cart-calculations.component.html',
  styleUrls: ['./cart-calculations.component.scss']
})
export class CartCalculationsComponent implements OnInit {

  @Input() cartDetails: object;
  constructor() { }

  ngOnInit() {
  }

}
