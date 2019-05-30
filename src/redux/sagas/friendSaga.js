import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addFriend(action) {
    try {
        yield axios.post('/api/friend', action.payload);
        yield put({type: 'GET_FRIENDS'});
    } catch(err) {
        console.log('addFriend saga error:', err);
    }
} //end addFriend

function* deleteFriend(action) {
    try {
        yield axios.delete(`/api/friend/${action.payload}`);
        yield put({type: 'GET_FRIENDS'});
    } catch(err) {
        console.log('deleteFriend saga error:', err);
    }
} //end deleteFriend

function* getFriends(action) {
    try {
        let friendList = yield axios.get('/api/friend');
        yield put({type: 'SET_FRIENDS', payload: friendList.data});
    } catch(err) {
        console.log('getFriends saga error:', err);
    }
} //end getFriends

function* updateFriend(action) {
    try {
        yield axios.put(`/api/friend/${action.id}`, action.payload);
        yield put({ type: 'GET_FRIENDS' });
    } catch (err) {
        console.log('updateFriend saga error:', err);
    }
} //end updateFriend

function* friendSaga() {
    yield takeLatest('ADD_FRIEND', addFriend);
    yield takeLatest('DELETE_FRIEND', deleteFriend);
    yield takeEvery('GET_FRIENDS', getFriends);
    yield takeLatest('UPDATE_FRIEND', updateFriend);
}

export default friendSaga;
