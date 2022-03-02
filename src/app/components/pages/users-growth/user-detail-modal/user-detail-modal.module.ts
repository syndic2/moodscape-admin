import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { UserDetailModalComponent } from './user-detail-modal.component';
import { GenderPipe } from 'src/app/pipes/gender/gender.pipe';

const Materials = [
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [UserDetailModalComponent, GenderPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...Materials
  ],
  exports: [UserDetailModalComponent]
})
export class UserDetailModalModule {
  static getComponent(): typeof UserDetailModalComponent {
    return UserDetailModalComponent;
  }
}
