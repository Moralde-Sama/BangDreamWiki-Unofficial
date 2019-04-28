import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'members'
})
export class MembersPipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if (value === 6) {
      return 'https://i.bandori.party/u/i/m/6Kasumi-Toyama-jsVzTv.png';
    } else if (value === 7) {
      return 'https://i.bandori.party/u/i/m/7Tae-Hanazono-5ctAXt.png';
    } else if (value === 8) {
      return 'https://i.bandori.party/u/i/m/8Rimi-Ushigome-gMEIOR.png';
    } else if (value === 9) {
      return 'https://i.bandori.party/u/i/m/9Saaya-Yamabuki-7JDbNa.png';
    } else if (value === 10) {
      return 'https://i.bandori.party/u/i/m/10Arisa-Ichigaya-OhdoPc.png';
    } else if (value === 11) {
      return 'https://i.bandori.party/u/i/m/11Ran-Mitake-N5oapw.png';
    } else if (value === 12) {
      return 'https://i.bandori.party/u/i/m/12Moca-Aoba-FSqhqR.png';
    } else if (value === 13) {
      return 'https://i.bandori.party/u/i/m/13Himari-Uehara-w2nYPj.png';
    } else if (value === 14) {
      return 'https://i.bandori.party/u/i/m/14Tomoe-Udagawa-S7I3Tb.png';
    } else if (value === 15) {
      return 'https://i.bandori.party/u/i/m/15Tsugumi-Hazawa-KNbiyZ.png';
    } else if (value === 16) {
      return 'https://i.bandori.party/u/i/m/16Kokoro-Tsurumaki-pS7FIm.png';
    } else if (value === 17) {
      return 'https://i.bandori.party/u/i/m/17Kaoru-Seta-RHusGK.png';
    } else if (value === 18) {
      return 'https://i.bandori.party/u/i/m/18Hagumi-Kitazawa-A21E3r.png';
    } else if (value === 19) {
      return 'https://i.bandori.party/u/i/m/19Kanon-Matsubara-gUFIXE.png';
    } else if (value === 20) {
      return 'https://i.bandori.party/u/i/m/20Michelle-dbNp0x.png';
    } else if (value === 21) {
      return 'https://i.bandori.party/u/i/m/21Aya-Maruyama-Zm0u9A.png';
    } else if (value === 22) {
      return 'https://i.bandori.party/u/i/m/22Hina-Hikawa-2trHlE.png';
    } else if (value === 23) {
      return 'https://i.bandori.party/u/i/m/23Chisato-Shirasagi-NtBBCb.png';
    } else if (value === 24) {
      return 'https://i.bandori.party/u/i/m/24Maya-Yamato-kNYTzU.png';
    } else if (value === 25) {
      return 'https://i.bandori.party/u/i/m/25Eve-Wakamiya-jfMYo6.png';
    } else if (value === 26) {
      return 'https://i.bandori.party/u/i/m/26Yukina-Minato-hUboXl.png';
    } else if (value === 27) {
      return 'https://i.bandori.party/u/i/m/27Sayo-Hikawa-2g2xDG.png';
    } else if (value === 28) {
      return 'https://i.bandori.party/u/i/m/28Lisa-Imai-NSapWM.png';
    } else if (value === 29) {
      return 'https://i.bandori.party/u/i/m/29Ako-Udagawa-resmOR.png';
    } else if (value === 30) {
      return 'https://i.bandori.party/u/i/m/30Rinko-Shirokane-S5HF59.png';
    }
  }

}
