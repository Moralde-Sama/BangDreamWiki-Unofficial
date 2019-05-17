export class Card {
    getCardRarity(rarityId: number, rotate: boolean): string {
        if (rarityId === 1) {
            return 'assets/rarity/1.png';
        } else if (rarityId === 2) {
            if (rotate) {
                return 'assets/rarity/2rotate.png';
            } else {
                return 'assets/rarity/2.png';
            }
        } else if (rarityId === 3) {
            if (rotate) {
                return 'assets/rarity/3rotate.png';
            } else {
                return 'assets/rarity/3.png';
            }
        } else if (rarityId === 4) {
            if (rotate) {
                return 'assets/rarity/4rotate.png';
            } else {
                return 'assets/rarity/4.png';
            }
        }
        return '';
    }
}

export class Bands {
    protected bandIndex: number;
    protected bandIndexList: Array<{membersId: Array<number>, bandIndex: number}> = [{
        membersId: [6, 7, 8, 9, 10],
        bandIndex: 0
    },
    {
        membersId: [11, 12, 13, 14, 15],
        bandIndex: 1
    },
    {
        membersId: [16, 17, 18, 19, 20],
        bandIndex: 2
    },
    {
        membersId: [21, 22, 23, 24, 25],
        bandIndex: 3
    },
    {
        membersId: [26, 27, 28, 29, 30],
        bandIndex: 4
    }];
    protected bandMembers: Array<
        {
            bandName: string,
            bandMembersId: Array<number>,
            bandMembersName: Array<string>,
            bandMembersSqImgPath: Array<string>
        }> = [{
            bandName: 'PoppinParty',
            bandMembersId: [6, 7, 8, 9, 10],
            bandMembersName: ['Kasumi Toyama', 'Tae Hanazono', 'Rimi Ushigome', 'Saaya Yamabuki', 'Arisa Ichigaya'],
            bandMembersSqImgPath: [
                'https://i.bandori.party/u/i/m/6Kasumi-Toyama-jsVzTv.png',
                'https://i.bandori.party/u/i/m/7Tae-Hanazono-5ctAXt.png',
                'https://i.bandori.party/u/i/m/8Rimi-Ushigome-gMEIOR.png',
                'https://i.bandori.party/u/i/m/9Saaya-Yamabuki-7JDbNa.png',
                'https://i.bandori.party/u/i/m/10Arisa-Ichigaya-OhdoPc.png'
            ]
        },
        {
            bandName: 'Afterglow',
            bandMembersId: [11, 12, 13, 14, 15],
            bandMembersName: ['Ran Mitake', 'Moca Aoba', 'Himari Uehara', 'Tomoe Udagawa', 'Tsugumi Hazawa'],
            bandMembersSqImgPath: [
                'https://i.bandori.party/u/i/m/11Ran-Mitake-N5oapw.png',
                'https://i.bandori.party/u/i/m/12Moca-Aoba-FSqhqR.png',
                'https://i.bandori.party/u/i/m/13Himari-Uehara-w2nYPj.png',
                'https://i.bandori.party/u/i/m/14Tomoe-Udagawa-S7I3Tb.png',
                'https://i.bandori.party/u/i/m/15Tsugumi-Hazawa-KNbiyZ.png'
            ]
        },
        {
            bandName: 'Hello, Happy World!',
            bandMembersId: [16, 17, 18, 19, 20],
            bandMembersName: ['Kokoro Tsurumaki', 'Kaoru Seta', 'Hagumi Kitazawa', 'Kanon Matsubara', 'Misaki Okusawa"'],
            bandMembersSqImgPath: [
                'https://i.bandori.party/u/i/m/16Kokoro-Tsurumaki-pS7FIm.png',
                'https://i.bandori.party/u/i/m/17Kaoru-Seta-RHusGK.png',
                'https://i.bandori.party/u/i/m/18Hagumi-Kitazawa-A21E3r.png',
                'https://i.bandori.party/u/i/m/19Kanon-Matsubara-gUFIXE.png',
                'https://i.bandori.party/u/i/m/20Michelle-dbNp0x.png'
            ]
        },
        {
            bandName: 'Pastel*Palettes',
            bandMembersId: [21, 22, 23, 24, 25],
            bandMembersName: ['Aya Maruyama', 'Hina Hikawa', 'Chisato Shirasagi', 'Maya Yamato', 'Eve Wakamiya'],
            bandMembersSqImgPath: [
                'https://i.bandori.party/u/i/m/21Aya-Maruyama-Zm0u9A.png',
                'https://i.bandori.party/u/i/m/22Hina-Hikawa-2trHlE.png',
                'https://i.bandori.party/u/i/m/23Chisato-Shirasagi-NtBBCb.png',
                'https://i.bandori.party/u/i/m/24Maya-Yamato-kNYTzU.png',
                'https://i.bandori.party/u/i/m/25Eve-Wakamiya-jfMYo6.png'
            ]
        },
        {
            bandName: 'Roselia',
            bandMembersId: [26, 27, 28, 29, 30],
            bandMembersName: ['Yukina Minato', 'Sayo Hikawa', 'Lisa Imai', 'Ako Udagawa', 'Rinko Shirokane'],
            bandMembersSqImgPath: [
                'https://i.bandori.party/u/i/m/26Yukina-Minato-hUboXl.png',
                'https://i.bandori.party/u/i/m/27Sayo-Hikawa-2g2xDG.png',
                'https://i.bandori.party/u/i/m/28Lisa-Imai-NSapWM.png',
                'https://i.bandori.party/u/i/m/29Ako-Udagawa-resmOR.png',
                'https://i.bandori.party/u/i/m/30Rinko-Shirokane-S5HF59.png'
            ]
        }];
    setBand(memberId: number) {
        for (let index = 0; index < this.bandIndexList.length; index++) {
            console.log(this.bandIndexList[index].membersId.includes(memberId));
            console.log(index);
            if (this.bandIndexList[index].membersId.includes(memberId)) {
                this.bandIndex = this.bandIndexList[index].bandIndex;
                break;
            }
        }
        console.log(this.bandIndex);
    }
    getMemberName(memberId: number): string {
        return this.bandMembers[this.bandIndex].bandMembersName[this.bandMembers[this.bandIndex].bandMembersId.indexOf(memberId)];
    }
    getMemberImgPath(memberId: number): string {
        return this.bandMembers[this.bandIndex].bandMembersSqImgPath[this.bandMembers[this.bandIndex].bandMembersId.indexOf(memberId)];
    }
}

export class CardDetails {
    id: number;
    member: number;
    i_rarity: number;
    i_attribute: string;
    name: string;
    japanese_name: string;
    release_date: string;
    is_promo: boolean;
    is_original: boolean;
    image: string;
    image_trained: string;
    art: string;
    art_trained: string;
    transparent: string;
    transparent_trained: string;
    skill_name: string;
    japanese_skill_name: string;
    i_skill_type: string;
    i_side_skill_type: string;
    skill_template: string;
    skill_variables: {};
    side_skill_template: string;
    full_skill: string;
    performance_min: number;
    performance_max: number;
    performance_trained_max: number;
    technique_min: number;
    technique_max: number;
    technique_trained_max: number;
    visual_min: number;
    visual_max: number;
    visual_trained_max: number;
    cameo_members: Array<number>;
}
