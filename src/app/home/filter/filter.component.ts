import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public filter: Array<boolean>;
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
          this.filter[1] = false;
        }
      }, {
        text: 'Yes',
        cssClass: 'primary',
        handler: () => {
          this.toggle(1);
        }
      }]
    });
    await alert.present();
  }
  //
  toggle(position: number) {
    if (position === 0) {
      this.filter[1] = false;
    } else {
      this.filter[0] = false;
    }
  }
  //
  closePopOver() {
    this.popoverCtrl.dismiss(this.filter);
  }
}
