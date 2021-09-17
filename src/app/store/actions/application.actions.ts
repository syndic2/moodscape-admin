import { MatDialogConfig } from '@angular/material/dialog';

import { createAction, props } from '@ngrx/store';

export const setIsResetForm= createAction(
  '[APP UI/FORM] Set reset form',
  props<{ isReset: boolean }>()
);

export const showDialog= createAction(
  '[APP UI/DIALOG] Show dialog',
  props<{ config: MatDialogConfig }>()
);
