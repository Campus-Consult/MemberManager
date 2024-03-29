import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PrivacyComponent } from './privacy/privacy.component';
import { MemberStatusModule } from './modules/member-status/member-status.module';
import { PositionModule } from './modules/position/position.module';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { OverlayContainer } from '@angular/cdk/overlay';
import { MatNativeDateModule } from '@angular/material/core';
import { MemberManagementModule } from './modules/member-management/member-management.module';

import { MatToolbarModule } from '@angular/material/toolbar';
import { CareerLevelModule } from './modules/career-level/career-level.module';
import { EventTrackingModule } from './modules/event-tracking/event-tracking.module';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'admin-center',
        loadChildren: () =>
          import('./modules/admin-center/admin-center.module').then(
            (m) => m.AdminCenterModule
          ),
      },
    ]),
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    MemberManagementModule,
    PositionModule,
    MemberStatusModule,
    MatNativeDateModule,
    MatToolbarModule,
    CareerLevelModule,
    EventTrackingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'de-DE' },
    // workaround for dates, the date picker actually uses a datetime with 00:00 as time and with timezone this makes it
    // wrap around to the previou day
    // {provide: MAT_NATIVE_DATE_FORMATS, useValue: {useUtc: true}},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('cc-theme');
  }
}
