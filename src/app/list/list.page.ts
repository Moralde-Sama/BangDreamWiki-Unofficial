import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { MemService } from '../services/members/mem.service';
import { Members } from '../services/members/mem.class.members';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss'],
  providers: [MemService, Members]
})
export class ListPage implements OnInit {
  private next: string;
  private memberss: Array<Members> = [];
  private getMemResult: Observable<Object>;
  // tslint:disable-next-line:quotemark
  public bands: Array<string> = ["https://i.bandori.party/static/img/band/Poppin'Party.png",
'https://i.bandori.party/static/img/band/Afterglow.png', 'https://i.bandori.party/static/img/band/Hello,%20Happy%20World!.png',
'https://i.bandori.party/static/img/band/Pastel*Palettes.png', 'https://i.bandori.party/static/img/band/Roselia.png'];
  constructor(public toastCtrl: ToastController,
    private memservice: MemService, private memClass: Members) {
      this.getMembersList();
  }
  async showShit(message: string) {
    const toast = await this.toastCtrl.create({
          message: message,
          duration: 2000,
          position: 'bottom'
        });
    toast.present();
  }

  private async getMembersList() {
    await this.memservice.getMembers().then(result => {
      // tslint:disable-next-line:quotemark
      this.memberss = result['results'];
    });
  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
