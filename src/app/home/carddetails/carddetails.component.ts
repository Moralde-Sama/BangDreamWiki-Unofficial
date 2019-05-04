import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CardDetails } from './class/carddetails.class.card';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.scss'],
})
export class CarddetailsComponent implements OnInit {
  @Input() carddetails: string;
  public cardDetails: CardDetails;
  constructor(private modalCtrl: ModalController) { }

  async ngOnInit() {
    this.cardDetails = JSON.parse(this.carddetails);
  }
  backbtn() {
    this.modalCtrl.dismiss();
  }

}
