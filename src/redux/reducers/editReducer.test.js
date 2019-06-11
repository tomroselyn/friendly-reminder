import editReducer from './editReducer';

//unit tests for editReducer

test('editReducer should initally be an empty object', () => {
    const action = {};
    const returnedState = editReducer(undefined, action);
    expect(typeof returnedState).toBe('object');
    expect(returnedState.id).toBe(undefined);
});

test('editReducer should be able to set friend to edit', () => {
    const action = { type: 'SET_EDIT_FRIEND', payload: {id: 13} };
    const returnedState = editReducer(undefined, action);
    expect(typeof returnedState).toBe('object');
    expect(returnedState.id).toBe(13);
});

test('editReducer should be able to clear info and reset', () => {
    const action = { type: 'CLEAR_EDIT_FRIEND' };
    const returnedState = editReducer({id: 13}, action);
    expect(typeof returnedState).toBe('object');
    expect(returnedState.id).toBe(undefined);
});