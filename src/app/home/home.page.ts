import { Component } from '@angular/core';
import { EventsService } from '../services/events/events.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private events: Array<{english_image: string}> = [];
	constructor(private eventsService: EventsService) {
    this.getListEvents();
  }
  async getListEvents() {
    await this.eventsService.getEvents().then(result => {
      this.events = result['results'];
      console.log(result['results']);
    });
  }

}
