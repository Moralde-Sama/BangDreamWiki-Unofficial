import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public filter: Array<{}>;
  constructor(private navParams: NavParams, private popoverCtrl: PopoverController,
    private alertCtrl: AlertController) { }

  async ngOnInit() {
    this.filter = this.navParams.get('data');
  }
  async showAlertDate() {
    const alert = await this.alertCtrl.create({
      header: 'Note',
      message: 'Sorting it by date will fetch all the data from the events of this version. Are you sure?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          this.filter[0] = false;
        }
      }, 'Yes']
    });
    await alert.present();
  }
  closePopOver() {
    this.popoverCtrl.dismiss(this.filter);
  }
}
