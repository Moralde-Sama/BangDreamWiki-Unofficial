import { Component, OnInit, Input } from '@angular/core';
import { EventDetails } from './class/eventdetails.class.eventdetails';
import { EventType } from './class/eventdetails.class.eventtype';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { CardDetail } from '../class/home.class.card';
import { CarddetailsComponent } from '../carddetails/carddetails.component';

@Component({
  selector: 'app-eventdetails2',
  templateUrl: './eventdetails2.component.html',
  styleUrls: ['./eventdetails2.component.scss'],
  providers: [EventType]
})
export class Eventdetails2Component implements OnInit {
  @Input() eventdata: string;
  @Input() carddetails: string;
  public eventDetails: EventDetails;
  public cardsDetails: Array<CardDetail>;
  constructor(private navCtrl: NavController, private modalCtrl: ModalController,
    private platform: Platform, private eventType: EventType) { }

  ngOnInit() {
    this.eventDetails = JSON.parse(this.eventdata);
    this.cardsDetails = JSON.parse(this.carddetails);
    this.platform.backButton.subscribe(() => {
      this.modalCtrl.dismiss();
    });
  }
  backbtn() {
    this.modalCtrl.dismiss();
  }
  setEventType(type: string): string {
    return this.eventType.getType(type);
  }
  async showCardDetails(card: CardDetail) {
    const modal = await this.modalCtrl.create({
      component: CarddetailsComponent,
      componentProps: { carddetails: JSON.stringify(card)}
    });
    await modal.present();
  }
  async imgLoaded(index: number) {
    console.log(index);
  }

}
