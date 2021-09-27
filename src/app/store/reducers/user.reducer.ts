import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { UserState } from '../states';
import { 
  setUsers, 
  setUsersGroupByGender,
  setUsersGroupByAge,
  setUsersGrowthByYear, 
  setUser, 
  updateUser, 
  removeUsers, 
  clearUsers, 
  clearUsersGroupByGender,
  clearUsersGroupByAge,
  clearUsersGrowthByYear 
} from '../actions/user.actions';

const initialState: UserState= {
  users: [],
  usersGroupByGender: null,
  usersGroupByAge: null,
  usersGrowthByYear: []
};

export const userReducer= createReducer(
  initialState,
  on(setUsers, (state, { users }) => ({ ...state, users: [...users] })),

  on(setUsersGroupByGender, (state, { usersGroupByGender }) => ({ ...state, usersGroupByGender: usersGroupByGender })),

  on(setUsersGroupByAge,  (state, { usersGroupByAge }) => ({ ...state, usersGroupByAge: usersGroupByAge })),

  on(setUsersGrowthByYear, (state, { usersGrowthByYear }) => ({ ...state, usersGrowthByYear: [...usersGrowthByYear] })),

  on(setUser, (state, { user }) => ({
    ...state,
    users: [
      ...state.users.map((object, index) => {
        if (object.Id !== user.Id) {
          return object;
        }

        return user;
      })
    ]
  })),

  on(updateUser, (state, { userId, fields }) => ({
    ...state,
    users: [
      ...state.users.map((user, index) => {
        if (user.Id !== userId) {
          return user;
        }

        return { ...user, ...fields };
      })
    ]
  })),

  on(removeUsers, (state, { userIds, isSoftDelete }) => {
    if (isSoftDelete) {
      return {
        ...state,
        users: [
          ...state.users.map((user, index) => {
            if (userIds.includes(user.Id)) {
              return { ...user, isActive: false };
            }

            return user;
          })
        ]
      }
    }

    return {
      ...state,
      users: [
        ...filterArrayByAnotherArray(
          { type: 'object', items: state.users },
          { type: 'none-object', items: userIds },
          { field1: 'Id' }
        )
      ]
    }
  }),

  on(clearUsers, state => ({ ...state, users: [] })),

  on(clearUsersGroupByGender, state => ({ ...state, usersGroupByGender: null })),

  on(clearUsersGroupByAge, state => ({ ...state, usersGroupByAge: null })),

  on(clearUsersGrowthByYear, state => ({ ...state, usersGrowthByYear: [] }))
);
