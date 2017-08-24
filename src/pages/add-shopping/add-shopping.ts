import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController} from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database'
  

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  shoppingItem = {} as ShoppingItem;

  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public database: AngularFireDatabase, public alertCtrl: AlertController) {

    this.shoppingItemRef$ = this.database.list('shopping-list');

  }

  addNewShopping(shoppingItem: ShoppingItem){

    this.shoppingItemRef$.push({
      itemName: this.shoppingItem.itemName,
      itemNumber: Number(this.shoppingItem.itemNumber)
    });
    
    this.Alert();
    

  }

  Alert(){
    let alert = this.alertCtrl.create({
      title: 'Advertencia',
      subTitle: 'Compra Agregada Exitosamente!',
      buttons: [{
        text: 'OK',
        handler: data =>{
          this.shoppingItem = {} as ShoppingItem;
          this.navCtrl.pop();
        }
      }]
    });
    alert.present();
  }


}
