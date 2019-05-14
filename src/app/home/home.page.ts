import { Component, ViewChild, OnInit, Renderer2 } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { IonInfiniteScroll, ModalController, LoadingController } from '@ionic/angular';
import { Eventdetails2Component } from './eventdetails2/eventdetails2.component';
import { CardDetail} from './class/home.class.card';
import { PopoverController } from '@ionic/angular';
import { FilterComponent } from './filter/filter.component';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public events: Array<Object> = [];
  public show_date = false;
  private cardsid: Array<number> = [];
  private nextPage: string;
  private cardetails: Array<CardDetail> = [];
  private settings: Array<{}> = [false, false, false];
  private is_upcoming_sorted = false;
  private is_date_sorted = false;
  private is_reverse = false;
  constructor(private eventsService: EventsService,
    private popoverCtrl: PopoverController, private modalCtrl: ModalController,
    private loading: LoadingController, private renderer: Renderer2) {
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
    let popover_data;
    const popover = await this.popoverCtrl.create({
      component: FilterComponent,
      componentProps: {data: this.settings},
      event: ev,
      backdropDismiss: false,
      translucent: true
    });
    await popover.present();
    await popover.onDidDismiss().then(d => {
      popover_data = d.data;
    });
    await this.popoverSort(popover_data);
  }
  //
  async popoverSort(data: any) {
    let count = 0;
      for (const result of data) {
        if (result) {
          if (count === 0) {
            if (!this.is_upcoming_sorted) {
              await this.sortByUpcomingEvnt();
            }
          } else if (count === 1) {
            if (!this.is_date_sorted) {
              await this.sortByDate();
              this.is_date_sorted = result;
            }
          } else if (count === 2) {
            await this.events.reverse();
            this.is_reverse = result;
          }
        } else {
          if (count === 0 && this.is_upcoming_sorted) {
            this.is_upcoming_sorted = result;
            if (!this.is_date_sorted) {
              await this.ngOnInit();
            }
          }
          if (count === 2 && this.is_reverse) {
            await this.events.reverse();
            this.is_reverse = result;
          }
        }
        count++;
      }
  }
  //
  async sortByDate() {
    // init loading
    const loading = await this.showLoading('Sorting by date...');
    this.nextPage = 'https://bandori.party/api/events/?page=1';
    const events = [];
    await loading.present();
    // download all events
    let count_null = 0;
    while (1) {
      if (count_null < 8) {
        await this.eventsService.getEventsByPage(this.nextPage).then(data => {
          if (data['next'] != null) {
            this.nextPage = data['next'];
            data['results'].forEach(d => {
              if (d != null) {
                if (d['english_start_date'] != null) {
                  events.push(d);
                } else {
                  count_null++;
                }
              }
            });
          }
        });
      } else {
        for (const event of events) {
          const date = new Date(event['english_start_date']);
          event['english_start_date'] = date;
        }
        this.events = [];
        this.events = events;
        this.events.sort((a, b) => a['english_start_date'] - b['english_start_date']);
        this.infiniteScroll.disabled = true;
        break;
      }
    }
    await loading.dismiss();
  }
  //
  async sortByUpcomingEvnt() {
    let pagelink = 'https://bandori.party/api/events/?page=1';
    const currnt_date = new Date();
    let count = 0;
    const events = [];
    const loading = await this.showLoading('Fetching Upcoming and Current Events');
    await loading.present();
    while (1) {
      await this.eventsService.getEventsByPage(pagelink).then(data => {
        pagelink = data['next'];
        data['results'].forEach(event => {
          if (event['english_end_date'] != null) {
            if (new Date(event['english_end_date']) > currnt_date) {
              events.push(event);
            }
          } else {
            count++;
          }
        });
      });
      if (count > 9) {
        break;
      }  else {
        count = 0;
      }
    }
    this.is_upcoming_sorted = true;
    this.events = events;
    if (this.is_reverse) {
      this.events.reverse();
    }
    await loading.dismiss();
  }
  //
  getUpcomingDate(start: string, end: string) {
    const event_start = moment(start);
    const event_end = moment(end);
    if (event_start > moment()) {
      return 'Event Starts ' + event_start.fromNow();
    } else {
      return 'Event Ends ' + event_end.fromNow();
    }
  }
  //
  async imgLoaded(index: number) {
    const get_elem_img = document.getElementsByName('event_img');
    const get_elem_spinner = document.getElementsByTagName('ion-spinner');
    const get_elem_card = document.getElementsByTagName('ion-card');
    this.renderer.setStyle(get_elem_spinner[index], 'display', 'none');
    this.renderer.setStyle(get_elem_img[index], 'display', 'block');
    this.renderer.setStyle(get_elem_card[index], 'background', 'none');
    this.renderer.setStyle(get_elem_card[index], 'background-color', '#E40046');
    this.renderer.setStyle(get_elem_card[index], 'height', 'auto');
    if (this.is_upcoming_sorted) {
      this.renderer.setStyle(get_elem_card[index]['children'][3], 'display', 'block');
    }
  }
}
