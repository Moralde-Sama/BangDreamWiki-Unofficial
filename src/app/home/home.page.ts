import { Component, ViewChild, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { IonInfiniteScroll, ModalController, LoadingController } from '@ionic/angular';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { Eventdetails2Component } from './eventdetails2/eventdetails2.component';
import { CardDetail} from './class/home.class.card';
import { PopoverController } from '@ionic/angular';
import { FilterComponent } from './filter/filter.component';

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
  private settings: Array<{}> = [false, false, false];
  private is_date_sorted = false;
  constructor(private eventsService: EventsService,
    private popoverCtrl: PopoverController, private modalCtrl: ModalController,
    private loading: LoadingController) {
  }
  //
  async ngOnInit() {
    const loading = await this.showLoading('Fetching Events...');
    await loading.present();
    await this.getListEvents();
    this.cardsid = await this.eventsService.getCardIds();
    await this.loading.dismiss();
  }
  //
  async showLoading(message: string) {
    return this.loading.create({
      message: message,
      spinner: 'crescent'
    });
  }
  //
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
  //
  async getListEvents() {
    await this.eventsService.getEvents().then(result => {
      this.events = result['results'];
      this.nextPage = result['next'];
    });
  }
  //
  async loadData(event) {
    let count_null = 0;
    await this.eventsService.getEventsByPage(this.nextPage).then(data => {
      this.nextPage = data['next'];
        data['results'].forEach(d => {
          if (d != null) {
            if (d['english_start_date'] != null) {
             this.events.push(d);
            } else {
              count_null++;
            }
          }
        });
        event.target.complete();
        if (count_null > 9) {
          this.infiniteScroll.disabled = true;
        }
    });
  }
  //
  async getPageById(id: number, service: Array<number>) {
    const page_final = service.indexOf(id) + 1;
    // tslint:disable-next-line:radix
    return parseInt((page_final / 10).toString());
  }
  //
  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: FilterComponent,
      componentProps: {data: this.settings},
      event: ev,
      backdropDismiss: false,
      translucent: true
    });
    await popover.present();
    await popover.onDidDismiss().then(d => {
      let count = 0;
      for (const data of d.data) {
        if (data) {
          if (count === 0) {
            if (!this.is_date_sorted) {
              this.is_date_sorted = true;
              this.sortByDate();
            }
          }
        }
        count++;
      }
    });
  }
  //
 async sort() {
    if (this.settings['upcoming']) {
    }
  }
  //
  async sortByDate() {
    // init loading
    const loading = await this.showLoading('Sorting by date...');
    await loading.present();
    // download all events
    const is_events_exist = true;
    let count_null = 0;
    while (is_events_exist) {
      if (count_null < 8) {
        await this.eventsService.getEventsByPage(this.nextPage).then(data => {
          if (data['next'] != null) {
            this.nextPage = data['next'];
            data['results'].forEach(d => {
              if (d != null) {
                if (d['english_start_date'] != null) {
                 this.events.push(d);
                } else {
                  count_null++;
                }
              }
            });
          }
        });
      } else {
        for (const event of this.events) {
          const date = new Date(event['english_start_date']);
          event['english_start_date'] = date;
        }
        this.events.sort((a, b) => a['english_start_date'] - b['english_start_date']);
        this.infiniteScroll.disabled = true;
        break;
      }
    }
    await loading.dismiss();
  }
}
