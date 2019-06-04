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
        let dueNowList = [];
        let overDueList = [];

        //sorting by date into dueNow, overDue and friendList (all friends)
        yield friendList.data.map(friend => {

            const friendDueDate = new Date(friend.due_date)
                friendDueDate.setHours(0)
                friendDueDate.setMinutes(0)
                friendDueDate.setSeconds(0)
                friendDueDate.setMilliseconds(0);

            const today = new Date();
                today.setHours(0)
                today.setMinutes(0)
                today.setSeconds(0)
                today.setMilliseconds(0);

            if (friendDueDate < today) {
                overDueList.push(friend);
            } else if (friendDueDate.getTime() === today.getTime()) {
                dueNowList.push(friend); }

            return friend;
        }) //end map
        
        //send data to reducers
        yield put({type: 'SET_FRIENDS', payload: friendList.data});
        yield put({type: 'SET_DUE_NOW', payload: dueNowList});
        yield put({ type: 'SET_OVERDUE', payload: overDueList });

    } catch(err) {
        console.log('getFriends saga error:', err);
    }
} //end getFriends

function* markContacted(action) {
    try {
        yield axios.put(`/api/friend/contact/${action.payload.id}`, 
            {friend: action.payload, contact_type: action.contact_type});
        yield put({ type: 'GET_FRIENDS' });
    } catch(err) {
        console.log('markContacted saga error:', err);
    }
}

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
    yield takeEvery('MARK_CONTACTED', markContacted);
}

export default friendSaga;
