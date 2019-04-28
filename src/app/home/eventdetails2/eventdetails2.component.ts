import { Component, OnInit, Input } from '@angular/core';
import { EventDetails } from './class/eventdetails.class.eventdetails';
import { EventType } from './class/eventdetails.class.eventtype';
import { NavController, ModalController, Platform } from '@ionic/angular';
import { CardDetail } from '../class/home.class.card';

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
    console.log(this.eventDetails);
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

}
