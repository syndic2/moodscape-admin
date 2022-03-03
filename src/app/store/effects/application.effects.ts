import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { showDialog } from '../actions/application.actions';
import { DialogComponent } from 'src/app/components/utilities/dialog/dialog.component';

@Injectable()
export class ApplicationEffects {
  showDialog$ = createEffect(() => this.actions$.pipe(
    ofType(showDialog),
    tap(({ component, config }) => this.dialog.open(component ? component : DialogComponent, { panelClass: 'modal-dialog', ...config }))
  ), { dispatch: false });

  constructor(private actions$: Actions, private dialog: MatDialog) { }
};
