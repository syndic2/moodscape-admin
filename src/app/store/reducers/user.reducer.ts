import { createReducer, on } from '@ngrx/store';

import { filterArrayByAnotherArray } from 'src/app/utilities/helpers';
import { UserState } from '../states';
import { setUsers, setUser, updateUser, removeUsers, clearUsers } from '../actions/user.actions';

const initialState: UserState= {
  users: []
};

export const userReducer= createReducer(
  initialState,
  on(setUsers, (state, { users }) => ({ ...state, users: [...users] })),

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

  on(clearUsers, (state) => ({ ...state, users: [] }))
);
