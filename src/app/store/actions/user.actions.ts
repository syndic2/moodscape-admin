import { createAction, props } from '@ngrx/store';

import { User } from 'src/app/models/user.model';

//Fetch API
export const fetchUsers= createAction('[User/API] Get users');

export const fetchUser= createAction(
  '[User/API] Get user',
  props<{ userId: string }>()
);

export const validateUpdateUser= createAction(
  '[User/API] Validate update user form',
  props<{ userId: string, fields: {}, imgUpload: File, isInvalid: boolean }>()
);

export const fetchUpdateUser= createAction(
  '[User/API] Update user',
  props<{ userId: string, fields: {}, imgUpload: File }>()
);

export const removeUsersConfirmation= createAction(
  '[User/API] Remove users confirmation',
  props<{ userIds: string[] }>()
);

export const fetchRemoveUsers= createAction(
  '[User/API] Remove users',
  props<{ userIds: string[], isSoftDelete: boolean }>()
);

//STORE
export const setUsers= createAction(
  '[User/STORE] Set users',
  props<{ users: User[] }>()
);

export const setUser= createAction(
  '[User/STORE] Set user',
  props<{ user: User }>()
);

export const updateUser= createAction(
  '[User/STORE] Update user',
  props<{ userId: string, fields: {} }>()
);

export const removeUsers= createAction(
  '[User/STORE] Remove users',
  props<{ userIds: string[], isSoftDelete: boolean }>()
);

export const clearUsers= createAction('[User/STORE] Clear users state');
