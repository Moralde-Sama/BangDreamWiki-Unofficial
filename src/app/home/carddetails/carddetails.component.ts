import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Card, CardDetailsModel, Bands} from 'src/app/BangDream/BangDreamModule';

@Component({
  selector: 'app-carddetails',
  templateUrl: './carddetails.component.html',
  styleUrls: ['./carddetails.component.scss'],
  providers: [Card, Bands]
})
export class CarddetailsComponent implements OnInit {
  @Input() carddetails: string;
  public cardStats: Array<number> = [];
  public cardDetails: CardDetailsModel;
  public containerClass: string;
  public showCameo: number;
  public cardImgPath: string;
  private currentBtnIndex = 0;
  private currentBtnStatIndex = 0;
  constructor(private modalCtrl: ModalController, public card: Card, public bands: Bands,
    private renderer: Renderer2) { }

  async ngOnInit() {
    await (async () => {
      this.cardDetails = JSON.parse(this.carddetails);
      this.bands.setBand(this.cardDetails.member);
    })();
    await (async () => {
      this.card.setCardDetails(this.cardDetails);
      this.cardStats = this.card.getCardStats(1);
      this.showCameo = this.cardDetails.cameo_members.length;
      this.cardImgPath = this.cardDetails.art;
    })();
    if (this.cardDetails.i_rarity === 2) {
      this.containerClass = '_2stars';
    } else if (this.cardDetails.i_rarity === 3) {
      this.containerClass = '_3stars';
    } else if (this.cardDetails.i_rarity === 4) {
      this.containerClass = '_4stars';
    }
  }
  backbtn() {
    this.modalCtrl.dismiss();
  }
  selectLevel(btnIndex: number, level: number) {
    this.cardStats = this.card.getCardStats(level);
    const elements = document.getElementsByClassName('card_status');
    const element = elements[0]['children'][0]['children'][0]['children'][0]['children'][btnIndex]['children'][0];
    const removeClass = elements[0]['children'][0]['children'][0]['children'][0]['children'][this.currentBtnIndex]['children'][0];
    this.changeSelectedBtn(removeClass, element);
    this.currentBtnIndex = btnIndex;
  }
  selectCardStatus(cardStatus: string, index: number) {
    this.renderer.setStyle(document.getElementsByClassName('container')[0], 'opacity', '0');
    if (cardStatus === 'Normal') {
      this.cardImgPath = this.cardDetails.art;
    } else {
      this.cardImgPath = this.cardDetails.art_trained;
    }
    const currSelectedBtn = document.getElementById('cardStatus').children[0].children[this.currentBtnStatIndex].children[0];
    const selectedBtn = document.getElementById('cardStatus').children[0].children[index].children[0];
    this.changeSelectedBtn(currSelectedBtn, selectedBtn);
    this.currentBtnStatIndex = index;
  }
  changeSelectedBtn(currentbtn: any, selectedbtn: any) {
    this.renderer.removeClass(currentbtn, 'card_level_selected');
    this.renderer.addClass(currentbtn, 'card_level');
    this.renderer.removeClass(selectedbtn, 'card_level');
    this.renderer.addClass(selectedbtn, 'card_level_selected');
  }
  imgLoaded() {
    this.renderer.setStyle(document.getElementsByClassName('container')[0], 'opacity', '1');
  }
  getSkillIcon(skilltype: string) {
    if (skilltype === 'Life recovery') {
      return 'healer';
    } else if (skilltype === 'Score up') {
      return 'scoreup';
    } else if (skilltype === 'Life guard') {
      return 'fingers';
    } else if (skilltype === 'Perfect lock') {
      return 'perfectlock';
    }
  }
  setSkillName(skillType: string, sideSkill: string) {
    if (sideSkill !== null) {
      return skillType + ' (' + sideSkill + ')';
    } else {
      return skillType;
    }
  }
}
