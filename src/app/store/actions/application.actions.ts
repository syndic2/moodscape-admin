import { ComponentType } from '@angular/cdk/portal';
import { MatDialogConfig } from '@angular/material/dialog';

import { createAction, props } from '@ngrx/store';

export const setIsResetForm = createAction(
  '[APP UI/FORM] Set reset form',
  props<{ isReset: boolean }>()
);

export const showDialog = createAction(
  '[APP UI/DIALOG] Show dialog',
  props<{ component?: ComponentType<any>, config: MatDialogConfig }>()
);

export const logout = createAction('[APP/STORE] Logout and clear store');
