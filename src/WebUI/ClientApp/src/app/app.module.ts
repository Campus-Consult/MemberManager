import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { TodoComponent } from './todo/todo.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PrivacyComponent } from './privacy/privacy.component';
import { PersonalModule } from './personal/personal.module';
import { ComponentsModule } from './components/components.module';
import { PersonalComponent } from './personal/personal.component';
import { PositionModule } from './position/position.module';
import { PositionComponent } from './position/position.component';
import { MemberStatusModule } from './member-status/member-status.module';
import { MemberStatusComponent } from './member-status/member-status.component';
import localeDe from "@angular/common/locales/de";
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    TodoComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'Personal', component: PersonalComponent, pathMatch: 'full' },
      { path: 'Position', component: PositionComponent, pathMatch: 'full' },
      { path: 'member-status', component: MemberStatusComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'todo', component: TodoComponent, canActivate: [AuthorizeGuard] },
    ]),
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    PersonalModule,
    PositionModule,
    MemberStatusModule,
    ComponentsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    {provide: LOCALE_ID, useValue: 'de-DE'},
    // workaround for dates, the date picker actually uses a datetime with 00:00 as time and with timezone this makes it
    // wrap around to the previou day
    // {provide: MAT_NATIVE_DATE_FORMATS, useValue: {useUtc: true}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
