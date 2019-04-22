import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { EventDetails } from './eventdetails.class.eventdetails';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.page.html',
  styleUrls: ['./eventdetails.page.scss']
})
export class EventdetailsPage implements OnInit {
  public eventDetails: EventDetails;
  constructor(public navController: NavController, private route: ActivatedRoute) { }
  back(): void {
    this.navController.pop();
  }
  ngOnInit() {
    // this.eventDetails = JSON.parse(this.route.snapshot.paramMap.get('data'));
    // console.log(this.eventDetails['name']);
  }
  formatDate(date: string): Date {
    return new Date(date);
  }

}
