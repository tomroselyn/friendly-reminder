import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addFriend(action) {
    try {
        yield console.log('addFriendSaga hit');
        yield axios.post('/api/friend', action.payload);
    } catch(err) {
        console.log('addFriendSaga error:', err);
    }
}

function* addFriendSaga() {
    yield takeLatest('ADD_FRIEND', addFriend);
}

export default addFriendSaga;
