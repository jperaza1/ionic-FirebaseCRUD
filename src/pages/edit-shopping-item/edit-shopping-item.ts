import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';
import { Subscription } from 'rxjs';




@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})
export class EditShoppingItemPage {

  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;

  shoppingItem = {} as ShoppingItem;

  shoppingItemSubcription: Subscription;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public database: AngularFireDatabase,
              public alertCtrl: AlertController) {

                const shoppingItemId = this.navParams.get('shoppingItemId');

                this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);

                this.shoppingItemSubcription = 
                  this.shoppingItemRef$.subscribe(shoppingItem =>{
                    this.shoppingItem = shoppingItem;
                  });

  }

  editShoppingItem(shoppingItem: ShoppingItem){
    this.shoppingItemRef$.update(shoppingItem);
    this.Alert();
  }


  Alert(){
    let alert = this.alertCtrl.create({
      title: 'Advertencia',
      subTitle: 'Compra Editada Exitosamente!',
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

  ionViewWillLeave(){
    this.shoppingItemSubcription.unsubscribe();
  }


}
