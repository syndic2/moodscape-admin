import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { transformDateTime, checkFileType } from 'src/app/utilities/helpers';
import { showDialog } from 'src/app/store/actions/application.actions';
import { validateUpdateUser } from 'src/app/store/actions/user.actions';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss']
})
export class UserDetailModalComponent implements OnInit, OnDestroy {
  public updateUserForm: FormGroup;
  public profileImage: string;
  private imgUpload: File;
  private isValidImgType: boolean= true;
  private paswordChangesSubscription: Subscription;
  private isPasswordChanged: boolean= false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UserDetailModalComponent>,
    private store: Store,
    private formBuilder: FormBuilder,
    public utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.profileImage= this.data.user.imgUrl;

    if (this.data.isEditMode) {
      this.initializeForm();
      this.updateUserForm.patchValue({ ...this.data.user });
      this.updateUserForm.updateValueAndValidity();

      this.paswordChangesSubscription= this.password.valueChanges.subscribe(value => {
        if (value !== this.data.user.password) {
          this.isPasswordChanged= true;
        } else {
          this.isPasswordChanged= false;
        }
      });
    }
  }

  ngOnDestroy() {
    this.paswordChangesSubscription && this.paswordChangesSubscription;
  }

  get firstName() {
    return this.updateUserForm.get('firstName');
  }

  get lastName() {
    return this.updateUserForm.get('lastName');
  }

  get gender() {
    return this.updateUserForm.get('gender');
  }

  get dateOfBirth() {
    return this.updateUserForm.get('dateOfBirth');
  }

  get email() {
    return this.updateUserForm.get('email');
  }

  get username() {
    return this.updateUserForm.get('username');
  }

  get password() {
    return this.updateUserForm.get('password');
  }

  get imgUrl() {
    return this.updateUserForm.get('imgUrl');
  }

  get isActive() {
    return this.updateUserForm.get('isActive');
  }

  initializeForm() {
    this.updateUserForm= this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      imgUrl: [''],
      isActive: [null, Validators.required]
    });
  }

  onSelectFile(event) {
    if (!checkFileType(event.target.files, ['jpg', 'jpeg', 'png'])) {
      this.isValidImgType= false;
      this.store.dispatch(showDialog({
        config: {
          data: {
            message: 'Ektensi file tidak sesuai dengan file gambar, harus menggunakan ektensi jpg, jpeg atau png',
            buttonText: {
              close: 'OK'
            }
          }
        }
      }));
    } else {
      const reader= new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload= (event: any) => {
        this.profileImage= event.target.result;
      };

      this.imgUpload= event.target.files[0];
      this.isValidImgType= true;
    }
  }

  onSubmit() {
    if (!this.isValidImgType) {
      this.store.dispatch(showDialog({
        config: {
          data: {
            message: 'Ektensi file tidak sesuai dengan file gambar, harus menggunakan ektensi jpg, jpeg atau png',
            buttonText: {
              close: 'OK'
            }
          }
        }
      }));
    } else {
      const fields= { ...this.updateUserForm.value };
      fields.dateOfBirth= transformDateTime(new Date(fields.dateOfBirth)).toISODate()

      if (!this.isPasswordChanged) {
        delete fields['password'];
      }

      this.store.dispatch(validateUpdateUser({
        userId: this.data.user.Id,
        fields: fields,
        imgUpload: this.imgUpload,
        isInvalid: this.updateUserForm.invalid
      }));
    }
  }
}
