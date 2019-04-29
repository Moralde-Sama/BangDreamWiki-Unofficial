import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Eventdetails2Component } from './home/eventdetails2/eventdetails2.component';
import { BoostAttributePipe } from './pipes/boostattribute/boost-attribute.pipe';
import { MembersPipe } from './pipes/members/members.pipe';
import { FilterComponent } from './home/filter/filter.component';

@NgModule({
  declarations: [AppComponent, Eventdetails2Component, BoostAttributePipe, MembersPipe, FilterComponent],
  entryComponents: [Eventdetails2Component, FilterComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
