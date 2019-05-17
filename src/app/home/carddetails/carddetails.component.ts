import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Card, CardDetails, Bands} from 'src/app/BangDream/BangDreamModule';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.scss'],
  providers: [Card, Bands]
})
export class CarddetailsComponent implements OnInit {
  @Input() carddetails: string;
  public cardDetails: CardDetails;
  constructor(private modalCtrl: ModalController, public card: Card, private bands: Bands) { }

  async ngOnInit() {
    this.cardDetails = JSON.parse(this.carddetails);
    console.log(this.cardDetails);
    this.bands.setBand(this.cardDetails.member);
  }
  backbtn() {
    this.modalCtrl.dismiss();
  }

}
