import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './store/reducers';
import { ApplicationEffects } from './store/effects/application.effects';

import { environment } from '../environments/environment';

import { HttpLoaderInterceptor } from './interceptors/http-loader/http-loader.interceptor';
import { RequestHeadersInterceptor } from './interceptors/request-headers/request-headers.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogModule } from './components/utilities/dialog/dialog.module';
import { ConfirmationDialogModule } from './components/utilities/confirmation-dialog/confirmation-dialog.module';

const Materials = [
  MatDialogModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot(
      reducers,
      {
        metaReducers: metaReducers,
        runtimeChecks: {
          strictActionImmutability: false,
          //strictActionSerializability: false,
          //strictActionTypeUniqueness: isDevMode(),
          //strictActionWithinNgZone: isDevMode(),
          //strictStateImmutability: isDevMode(),
          //strictStateSerializability: false,
        }
      }
    ),
    EffectsModule.forRoot([ApplicationEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    ...Materials,
    DialogModule,
    ConfirmationDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLoaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHeadersInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
