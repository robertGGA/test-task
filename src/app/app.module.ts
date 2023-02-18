import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from '@pages/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {UrlInterceptorService} from "@services/url-interceptor.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from '@pages/profile/profile.component';
import { PageComponent } from '@components/ui/page/page.component';
import { HeaderComponent } from '@components/ui/header/header.component';
import { NavComponent } from '@components/ui/nav/nav.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ModalHeaderComponent } from '@components/modals/modal-header/modal-header.component';
import {ModalBodyComponent} from "@components/modals/modal-body/modal-body.component";
import {DialogModule} from "@angular/cdk-experimental/dialog";
import {PushModalComponent} from "@pages/profile/push-modal/push-modal.component";
import {MatSelectModule} from "@angular/material/select";
import {IconComponent} from "@components/ui/icon/icon.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    PageComponent,
    HeaderComponent,
    NavComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    PushModalComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    DialogModule,
    MatSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: UrlInterceptorService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
