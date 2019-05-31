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

function* extraDay(action) {
    try {
        yield axios.put(`/api/friend/extraday/${action.payload}`);
        yield put({type: 'GET_FRIENDS'});
    } catch(err) {
        console.log('extraDay saga error:', err);
    }
} //end extraDay

function* getFriends(action) {
    try {
        let friendList = yield axios.get('/api/friend');
        //map data and reformat dates to yyyy-mm-dd
        let formattedFriendList = friendList.data.map(friend => {
            friend.last_date = friend.last_date.substr(0, 10);
            friend.due_date = friend.due_date.substr(0,10);
            return friend;
        })
        yield put({type: 'SET_FRIENDS', payload: formattedFriendList});
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
    yield takeEvery('EXTRA_DAY', extraDay);
}

export default friendSaga;
