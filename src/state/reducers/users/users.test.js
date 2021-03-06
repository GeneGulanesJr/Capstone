import {
  USERS_FETCH_DATA_INIT,
  USERS_FETCH_DATA_SUCCESS,
  USERS_FETCH_DATA_FAIL,
  USERS_DELETE_USER_INIT,
  USERS_DELETE_USER_SUCCESS,
  USERS_DELETE_USER_FAIL,
  USERS_CREATE_USER_INIT,
  USERS_CREATE_USER_SUCCESS,
  USERS_CREATE_USER_FAIL,
  USERS_MODIFY_USER_INIT,
  USERS_MODIFY_USER_SUCCESS,
  USERS_MODIFY_USER_FAIL,
  USERS_CLEAN_UP,
  USERS_CLEAR_DATA_LOGOUT,
  USERS_ADD_USER,
  USERS_REMOVE_USER,
} from 'state/actions/users';

import { usersReducer } from '.';

describe('Establishments reducer', () => {
  const initialState = {
    data: [],
    loading: false,
    error: null,
    success: false,
    deleted: false,
  };

  const reducerTest = reducerTester(usersReducer);

  it('should return the initial state', () => {
    reducerTest(initialState, {}, initialState);
  });

  it('should reset to the initialState and set loading to true when USERS_FETCH_DATA_INIT action is fired', () => {
    reducerTest(initialState, USERS_FETCH_DATA_INIT(), {
      ...initialState,
      loading: true,
    });
  });

  it('should set the state with the corresponding error and set loading to false when USERS_FETCH_DATA_FAIL actions is fired', () => {
    reducerTest(initialState, USERS_FETCH_DATA_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loading: false,
    });
  });

  it('should set error to null, loading to false and user with the corresponding values when USERS_FETCH_DATA_SUCCESS actions is fired', () => {
    const data = [
      {
        name: 'Test name',
        email: 'Test email',
        location: 'Test location',
        createdAt: '11/20/2020',
      },
    ];
    reducerTest(initialState, USERS_FETCH_DATA_SUCCESS({ data }), {
      ...initialState,
      data,
      loading: false,
      error: null,
    });
  });

  it('should set loading to true when USERS_DELETE_USER_INIT action is fired', () => {
    reducerTest(initialState, USERS_DELETE_USER_INIT(), {
      ...initialState,
      loading: true,
    });
  });

  it('should remove the corresponding establishment from the state, set loading to false and error to null when USERS_DELETE_USER_SUCCESS action is fired', () => {
    const user = { id: 'exampleId' };

    reducerTest(
      { ...initialState, data: [user] },
      USERS_DELETE_USER_SUCCESS({ id: 'exampleId' }),
      { ...initialState, error: null, loading: false, deleted: true }
    );
  });

  it('should set the state with the corresponding error and set loading to false when USERS_DELETE_USER_FAIL actions is fired', () => {
    reducerTest(initialState, USERS_DELETE_USER_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loading: false,
    });
  });

  it('should reset the state to the initial state when USERS_CLEAR_DATA_LOGOUT action is fired', () => {
    reducerTest(initialState, USERS_CLEAR_DATA_LOGOUT(), initialState);
  });

  it('should set loading to true to the current state when USERS_CREATE_USER_INIT action is fired', () => {
    reducerTest(initialState, USERS_CREATE_USER_INIT(), {
      ...initialState,
      loading: true,
    });
  });

  it('should set error to null, loading to false and add the new user to the current state when USERS_CREATE_USER_SUCCESS action is fired', () => {
    const user = [
      {
        name: 'some name',
        location: 'some location',
        email: 'some location',
      },
    ];

    reducerTest(initialState, USERS_CREATE_USER_SUCCESS({ user }), {
      ...initialState,
      data: user,
      success: true,
      loading: false,
    });
  });

  it('should set loading to false and error with the corresponding payload to the current state USERS_CREATE_USER_FAIL action is fired', () => {
    reducerTest(initialState, USERS_CREATE_USER_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loading: false,
    });
  });

  it('should set loading to true when USERS_MODIFY_USER_INIT action is fired', () => {
    reducerTest(initialState, USERS_MODIFY_USER_INIT(), {
      ...initialState,
      loading: true,
    });
  });

  it('should set loading to false, error to null and modify the corresponding user when USERS_MODIFY_USER_SUCCESS action is fired', () => {
    const initialUsers = [
      {
        name: 'test name',
        location: 'test location',
        email: 'test email',
        id: 'test id',
        logoUrl: 'some logo',
        createdAt: '11/20/2020',
      },
    ];

    const resultUser = {
      name: 'test name 2',
      location: 'test location',
      email: 'test email',
      id: 'test id',
      logoUrl: 'some logo',
      createdAt: '11/20/2020',
    };

    reducerTest(
      { ...initialState, data: initialUsers },
      USERS_MODIFY_USER_SUCCESS({
        user: resultUser,
        id: 'test id',
      }),
      {
        ...initialState,
        data: [resultUser],
        loading: false,
        error: null,
        success: true,
      }
    );
  });

  it('should set loading to false and error with the corresponding payload to the current state when USERS_MODIFY_USER_FAIL action is fired', () => {
    reducerTest(initialState, USERS_MODIFY_USER_FAIL({ error: 'some error' }), {
      ...initialState,
      error: 'some error',
      loading: false,
    });
  });

  it('should set loading, success and deleted to false and error to null when USERS_CLEAN_UP action is fired', () => {
    reducerTest(initialState, USERS_CLEAN_UP(), {
      ...initialState,
      loading: false,
      success: false,
      deleted: false,
      error: null,
    });
  });

  it('should add the user to data when USERS_ADD_USER action is fired', () => {
    const initialUsers = [
      {
        name: 'test name 1',
        location: 'test location',
        email: 'test email',
        id: 'testId1',
        logoUrl: 'some logo',
        createdAt: '11/20/2020',
      },
    ];

    const newUser = {
      name: 'test name 2',
      location: 'test location',
      email: 'test email',
      id: 'testId2',
      logoUrl: 'some logo',
      createdAt: '11/20/2020',
    };

    reducerTest(
      { ...initialState, data: initialUsers },
      USERS_ADD_USER({ user: newUser }),
      {
        ...initialState,
        data: [...initialUsers, newUser],
      }
    );
  });

  it('should delete the corresponding user from data when USERS_REMOVE_USER action is fired', () => {
    const initialUsers = [
      {
        name: 'test name 1',
        location: 'test location',
        email: 'test email',
        id: 'testId1',
        logoUrl: 'some logo',
        createdAt: '11/20/2020',
      },
      {
        name: 'test name 2',
        location: 'test location',
        email: 'test email',
        id: 'testId2',
        logoUrl: 'some logo',
        createdAt: '11/20/2020',
      },
    ];

    reducerTest(
      { ...initialState, data: initialUsers },
      USERS_REMOVE_USER({ userId: 'testId2' }),
      {
        ...initialState,
        data: [
          {
            name: 'test name 1',
            location: 'test location',
            email: 'test email',
            id: 'testId1',
            logoUrl: 'some logo',
            createdAt: '11/20/2020',
          },
        ],
      }
    );
  });
});
