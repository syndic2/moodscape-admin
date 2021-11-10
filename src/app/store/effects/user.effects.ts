import { Injectable } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap, exhaustMap, mergeMap } from 'rxjs/operators';

import { showDialog } from '../actions/application.actions';
import {
  fetchUsers,
  fetchUsersGroupByGender,
  fetchUsersGroupByAge,
  fetchUsersGrowthByYear,
  fetchUser,
  validateUpdateUser,
  fetchUpdateUser,
  removeUsersConfirmation,
  fetchRemoveUsers,

  setUsers,
  setUsersGroupByGender,
  setUsersGroupByAge,
  setUsersGrowthByYear,
  setUser,
  updateUser,
  removeUsers,
} from '../actions/user.actions';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class UserEffects {
  getUsers$= createEffect(() => this.actions$.pipe(
    ofType(fetchUsers),
    exhaustMap(() => this.userService.getUsers().pipe(
      map(res => setUsers({ users: res }))
    ))
  ));
  
  getUsersGroupByGender= createEffect(() => this.actions$.pipe(
    ofType(fetchUsersGroupByGender),
    exhaustMap(() => this.userService.getUsersGroupByGender().pipe(
      map(res => setUsersGroupByGender({ usersGroupByGender: res }))
    ))
  ));

  getUsersGroupByAge$= createEffect(() => this.actions$.pipe(
    ofType(fetchUsersGroupByAge),
    exhaustMap(() => this.userService.getUsersGroupByAge().pipe(
      map(res => setUsersGroupByAge({ usersGroupByAge: res }))
    ))
  ));
  
  getUsersGrowthByYear$= createEffect(() => this.actions$.pipe(
    ofType(fetchUsersGrowthByYear),
    exhaustMap(({ startDate, endDate }) => this.userService.getUsersGrowthByYear(startDate, endDate).pipe(
      map(res => setUsersGrowthByYear({ usersGrowthByYear: res }))
    ))
  ));

  getUser$= createEffect(() => this.actions$.pipe(
    ofType(fetchUser),
    exhaustMap(({ userId }) => this.userService.getUser(userId).pipe(
      map(res => setUser({ user: res }))
    ))
  ));

  validateUserUpdate$= createEffect(() => this.actions$.pipe(
    ofType(validateUpdateUser),
    map(({ userId, fields, imgUpload, isInvalid }) => {
      if (isInvalid) {
        return showDialog({
          config: {
            data: {
              message: 'Tidak boleh ada kolom yang kosong!',
              buttonText: {
                close: 'OK'
              }
            }
          }
        })
      };

      return fetchUpdateUser({ userId: userId, fields: fields, imgUpload: imgUpload });
    })
  ));

  updateUser$= createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateUser),
    exhaustMap(({ userId, fields, imgUpload }) => this.userService.updateUser(userId, fields, imgUpload).pipe(
      switchMap(res => [
        showDialog({
          config: {
            data: {
              message: res.response.text,
              buttonText: {
                close: 'OK'
              }
            }
          }
        }),
        updateUser({ userId: res.updatedUser.Id, fields: res.updatedUser })
      ])
    ))
  ));
    
  removeUsersConfirmation$= createEffect(() => this.actions$.pipe(
    ofType(removeUsersConfirmation),
    exhaustMap(({ userIds }) => {
      const dialogRef= this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Apa anda yakin ingin menghapus pengguna ini?',
          buttonText: {
            ok: 'Ya',
            cancel: 'Tidak'
          },
          checkBox: {
            text: 'Hapus kasar'
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map(data => ({ dialogData: data, userIds: userIds }))
      )
    }),
    map(res => {
      if (res.dialogData.confirmation === 'yes') {
        this.store.dispatch(fetchRemoveUsers({ userIds: res.userIds, isSoftDelete: !res.dialogData.checkBoxChecked ? true : false }))
      }
    })
  ), { dispatch: false });

  removeUsers$= createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveUsers),
    mergeMap(({ userIds, isSoftDelete }) => this.userService.removeUsers(userIds, isSoftDelete).pipe(
      map(res => removeUsers({ userIds: res.removedUsers, isSoftDelete: isSoftDelete }))
    ))
  ));

  constructor(private store: Store, private actions$: Actions, private dialog: MatDialog, private userService: UserService) {}
}
