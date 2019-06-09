import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

function* sendSms(action) {
    try {
        //ask server to send email
        const response = yield axios.post('/api/sms/send', action.payload);
        console.log('response after sms saga posts', response);
        if (response.data === 'OK') {
            //mark contacted if successful
            yield put({ type: 'MARK_CONTACTED', payload: action.payload.friend, contact_type: 'sms' });
            swal("contact complete!", "", "success");
        } else {
            swal("message failed to send", "", "info");
        }
    } catch (err) {
        console.log('updateFriend saga error:', err);
    }
} //end updateFriend

function* smsSaga() {
    yield takeLatest('SEND_SMS', sendSms);
}

export default smsSaga;