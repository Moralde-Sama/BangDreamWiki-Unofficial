import { Component, ViewChild, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { IonInfiniteScroll, NavController, ModalController, LoadingController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Eventdetails2Component } from './eventdetails2/eventdetails2.component';
import { CardDetail} from './class/home.class.card';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [NativePageTransitions]
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public events: Array<Object> = [];
  private cardsid: Array<number> = [];
  private nextPage: string;
  private cardetails: Array<CardDetail> = [];
  constructor(private eventsService: EventsService, private navController: NavController,
    private navTransition: NativePageTransitions, private modalCtrl: ModalController,
    private loading: LoadingController) {
  }
  async ngOnInit() {
    const loading = await this.showLoading('Fetching Events...');
    await loading.present();
    await this.getListEvents();
    this.cardsid = await this.eventsService.getCardIds();
    await this.loading.dismiss();
  }
  async showLoading(message: string) {
    return this.loading.create({
      message: message,
      spinner: 'crescent'
    });
  }
  async showEventDetails(event: Object) {
    this.cardetails = [];
    const loading = await this.showLoading('Fetching Event Details...');
    await loading.present();
    const maincard = event['main_card'];
    const secondarycard = event['secondary_card'];
    let page = await this.getPageById(maincard, this.cardsid);
    let cardnotfound = true;
    while (cardnotfound) {
      await this.eventsService.getCard(page).then(d => {
        for (let index = 0; index < Object.keys(d['results']).length; index++) {
          if (d['results'][index]['id'] === maincard) {
            this.cardetails.push(d['results'][index]);
          }
          if (d['results'][index]['id'] === secondarycard) {
            this.cardetails.push(d['results'][index]);
            cardnotfound = false;
            break;
          }
        }
      });
      if (cardnotfound) {
        page++;
      }
    }
    await loading.dismiss();
    const modal = await this.modalCtrl.create({
      component: Eventdetails2Component,
      componentProps: { eventdata: JSON.stringify(event), carddetails: JSON.stringify(this.cardetails) }
    });
    return await modal.present();
  }
  // viewEventsDetails(event: string): void {
  //   const options: NativeTransitionOptions = {
  //     direction: 'up',
  //     duration: 500,
  //     slowdownfactor: 3,
  //     slidePixels: 20,
  //     iosdelay: 100,
  //     androiddelay: 100,
  //     fixedPixelsTop: 0,
  //     fixedPixelsBottom: 0
  //   };
  //   this.navTransition.slide(options);
  //   this.navController.navigateRoot(['eventdetails', { data: JSON.stringify(event)}]);
  // }
  async getListEvents() {
    await this.eventsService.getEvents().then(result => {
      this.events = result['results'];
      this.nextPage = result['next'];
    });
  }
  async loadData(event) {
    await this.eventsService.getEventsByPage(this.nextPage).then(data => {
      if (data['next'] == null) {
        event.target.complete();
        event.target.disable = true;
      } else {
        this.nextPage = data['next'];
        data['results'].forEach(d => {
          if (d != null) {
            if (d['english_image'] != null) {
             this.events.push(d);
            }
          }
        });
        event.target.complete();
        if (data['next'] == null) {
          event.target.disable = true;
        }
      }
    });
  }
  async getPageById(id: number, service: Array<number>) {
    const page_final = service.indexOf(id) + 1;
    // tslint:disable-next-line:radix
    return parseInt((page_final / 10).toString());
  }
}
