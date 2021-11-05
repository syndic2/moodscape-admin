import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

const Materials= [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    Materials
  ]
})
export class LoginModule { }
