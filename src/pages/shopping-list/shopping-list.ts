import { Component } from '@angular/core';
import {  NavController, NavParams,ActionSheetController  } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { EditShoppingItemPage } from '../edit-shopping-item/edit-shopping-item';

import { AngularFireDatabase,FirebaseListObservable } from 'angularfire2/database'
import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';




@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {


  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public database: AngularFireDatabase, 
              public actionSheetCtrl:ActionSheetController) {

                this.shoppingListRef$ = this.database.list('shopping-list');
  }

  navigateToAddShoppingPage(){
    //Metodo para navegar a otra pagina 
    this.navCtrl.push(AddShoppingPage);
  }

  selectShoppingItem(shoppingItem: ShoppingItem){
    this.actionSheetCtrl.create({
      title: `${ shoppingItem.itemName }`,
      buttons: [{
        text: 'Editar',
        handler: ()=>{
          this.navCtrl.push(EditShoppingItemPage,
            { shoppingItemId: shoppingItem.$key });
        }
      },{
        text: 'Eliminar',
        role: 'destructive',
        handler: ()=> {
          this.shoppingListRef$.remove(shoppingItem.$key);
        }
      },{
        text: 'Cancelar',
        role: 'cancel',
        handler: ()=>{
          //console.log(shoppingItem);
        }
      }]
    }).present();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

}
