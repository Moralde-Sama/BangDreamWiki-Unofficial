import { Component, ViewChild, OnInit } from '@angular/core';
import { EventsService } from '../services/events/events.service';
import { IonInfiniteScroll, NavController, ModalController, LoadingController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Eventdetails2Component } from './eventdetails2/eventdetails2.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [NativePageTransitions]
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public events: Array<Object> = [];
  private nextPage: string;
  constructor(private eventsService: EventsService, private navController: NavController,
    private navTransition: NativePageTransitions, private modalCtrl: ModalController,
    private loading: LoadingController) {
  }
  async ngOnInit() {
    const loading = await this.showLoading();
    await loading.present();
    await this.getListEvents();
    await this.loading.dismiss();
  }
  async showLoading() {
    return this.loading.create({
      message: 'Fetching Events...',
      spinner: 'crescent'
    });
  }
  async showEventDetails(event: Object) {
    const modal = await this.modalCtrl.create({
      component: Eventdetails2Component,
      componentProps: { eventdata: JSON.stringify(event) }
    });
    return await modal.present();
  }
  viewEventsDetails(event: string): void {
    const options: NativeTransitionOptions = {
      direction: 'up',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 100,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 0
    };
    this.navTransition.slide(options);
    this.navController.navigateRoot(['eventdetails', { data: JSON.stringify(event)}]);
  }
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
  // async showModal(event: string) {
  //   const modal = await this.modalCtrl.create({
  //     component: ComponentComponent,
  //     componentProps: { data: JSON.stringify(event) }
  //   });
  //   return modal.present();
  // }

}
