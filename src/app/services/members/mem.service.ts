import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemService {
  private result: any;
  constructor(private http: HttpClient) { }
  async getMembers() {
    return await this.http.get<Observable<Object>>('https://bandori.party/api/members/').toPromise();
  }
  async getMembersByPage(link: string) {
    this.result = this.http.get(link);
    return this.result['results'];
  }
}
