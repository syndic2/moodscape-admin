import { createAction, props } from '@ngrx/store';

import { User, UsersGroupByGender, UsersGroupByAge, UsersGrowthByYear } from 'src/app/models/user.model';

//Fetch API
export const fetchUsers = createAction('[User/API] Get users');

export const fetchUsersGroupByGender = createAction('[User/API] Get users group by gender');

export const fetchUsersGroupByAge = createAction('[User/API] Get users group by age');

export const fetchUsersGrowthByYear = createAction(
  '[User/API] Get users growth by yeary',
  props<{ startDate: string, endDate: string }>()
);

export const fetchUser = createAction(
  '[User/API] Get user',
  props<{ userId: string }>()
);

export const validateUpdateUser = createAction(
  '[User/API] Validate update user form',
  props<{ userId: string, fields: {}, imgUpload: File, isInvalid: boolean }>()
);

export const fetchUpdateUser = createAction(
  '[User/API] Update user',
  props<{ userId: string, fields: {}, imgUpload: File }>()
);

export const removeUsersConfirmation = createAction(
  '[User/API] Remove users confirmation',
  props<{ userIds: string[] }>()
);

export const fetchRemoveUsers = createAction(
  '[User/API] Remove users',
  props<{ userIds: string[], isSoftDelete: boolean }>()
);

//STORE
export const setUsers = createAction(
  '[User/STORE] Set users',
  props<{ users: User[] }>()
);

export const setUsersGroupByGender = createAction(
  '[User/STORE] Set users group by gender',
  props<{ usersGroupByGender: UsersGroupByGender }>()
);

export const setUsersGroupByAge = createAction(
  '[User/STORE] Set users group by age',
  props<{ usersGroupByAge: UsersGroupByAge }>()
);

export const setUsersGrowthByYear = createAction(
  '[User/STORE] Set users growth by year',
  props<{ usersGrowthByYear: UsersGrowthByYear[] }>()
);

export const setUser = createAction(
  '[User/STORE] Set user',
  props<{ user: User }>()
);

export const updateUser = createAction(
  '[User/STORE] Update user',
  props<{ userId: string, fields: {} }>()
);

export const removeUsers = createAction(
  '[User/STORE] Remove users',
  props<{ userIds: string[], isSoftDelete: boolean }>()
);
