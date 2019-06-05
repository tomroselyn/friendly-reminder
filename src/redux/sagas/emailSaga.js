import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import swal from 'sweetalert';

function* sendEmail(action) {
    try {
        //ask server to send email
        const response = yield axios.post('/api/email/send', action.payload);
        if (response.data.msg === 'success') {
            //mark contacted if successful
            yield put({ type: 'MARK_CONTACTED', payload: action.payload.friend, contact_type: 'email' });
            swal("contact complete!", "", "success");
        } else if (response.data.msg === 'fail') {
            swal("message failed to send", "", "info");
        }
    } catch (err) {
        console.log('updateFriend saga error:', err);
    }
} //end updateFriend

function* emailSaga() {
    yield takeLatest('SEND_EMAIL', sendEmail);
}

export default emailSaga;