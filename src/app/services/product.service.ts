import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(public afStore: AngularFirestore) { }

  getProducts() {
    return this.afStore.collection('products').snapshotChanges();
  }

  getProduct(id: string) {
    return this.afStore.collection('products').doc(id).ref.get();
  }

}
