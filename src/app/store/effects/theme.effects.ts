import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';

import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import { map, switchMap, exhaustMap, concatMap, mergeMap } from 'rxjs/operators';

import { showDialog, setIsResetForm } from '../actions/application.actions';
import { 
  fetchThemes, 
  fetchTheme,
  validateCreateTheme, 
  fetchCreateTheme,
  validateUpdateTheme, 
  fetchUpdateTheme, 
  removeThemesConfirmation,
  fetchRemoveThemes,
  
  setThemes,
  createTheme,
  updateTheme,
  removeThemes
} from '../actions/theme.actions';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { ConfirmationDialogComponent } from 'src/app/components/utilities/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class ThemeEffects {
  getThemes$= createEffect(() => this.actions$.pipe(
    ofType(fetchThemes),
    exhaustMap(() => this.themeService.getThemes().pipe(
      map(res => setThemes({ themes: res }))
    ))
  ));
  
  validateCreateTheme$= createEffect(() => this.actions$.pipe(
    ofType(validateCreateTheme),
    switchMap(({ fields, isInvalid }) => {
      if (isInvalid) {
        return [
          setIsResetForm({ isReset: false }),
          showDialog({
            config: {
              data: {
                message: 'Tidak boleh ada kolom yang kosong!',
                buttonText: {
                  close: 'OK'
                }
              }
            }
          })
        ];
      }

      return [fetchCreateTheme({ fields: fields })];
    })
  ));
  
  createTheme$= createEffect(() => this.actions$.pipe(
    ofType(fetchCreateTheme),
    concatMap(({ fields }) => this.themeService.createTheme(fields).pipe(
      switchMap(res => {
        if (!res.response.status) {
          return [
            setIsResetForm({ isReset: false }),
            showDialog({ 
              config: { 
                data: {
                  message: res.response.text,
                  buttonText: {
                    close: 'OK'
                  }
                }
              }
            })
          ];
        }

        return [
          setIsResetForm({ isReset: true }),
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
          createTheme({ theme: res.createdTheme })
        ];
      })
    ))
  ));

  validateUpdateTheme$= createEffect(() => this.actions$.pipe(
    ofType(validateUpdateTheme),
    map(({ themeId, fields, isInvalid}) => {
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

      return fetchUpdateTheme({ themeId: themeId, fields: fields });
    })
  ));

  updateTheme$= createEffect(() => this.actions$.pipe(
    ofType(fetchUpdateTheme),
    exhaustMap(({ themeId, fields }) => this.themeService.updateTheme(themeId, fields).pipe(
      switchMap(res => {
        if (!res.response.status) {
          return [
            showDialog({ 
              config: { 
                data: {
                  message: res.response.text,
                  buttonText: {
                    close: 'OK'
                  }
                }
              }
            })
          ];
        }

        return [
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
          updateTheme({ themeId: res.updatedTheme.Id, fields: res.updatedTheme })
        ]
      })
    ))
  ));

  removeThemesConfirmation$= createEffect(() => this.actions$.pipe(
    ofType(removeThemesConfirmation),
    exhaustMap(({ themeIds }) => {
      const dialogRef= this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Apa anda yakin ingin menghapus tema ini?',
          buttonText: {
            ok: 'Ya',
            cancel: 'Tidak'
          }
        }
      });

      return dialogRef.afterClosed().pipe(
        map(data => ({ dialogData: data, themeIds: themeIds }))
      )
    }),
    map(res => {
      if (res.dialogData.confirmation === 'yes') {
        this.store.dispatch(fetchRemoveThemes({ themeIds: res.themeIds }))
      }
    })
  ), { dispatch: false });

  removeThemes$= createEffect(() => this.actions$.pipe(
    ofType(fetchRemoveThemes),
    mergeMap(({ themeIds }) => this.themeService.removeThemes(themeIds).pipe(
      map(res => removeThemes({ themeIds: res.removedThemes }))
    ))
  ));
    
  constructor(private store: Store, private actions$: Actions, private dialog: MatDialog, private themeService: ThemeService) {}
}