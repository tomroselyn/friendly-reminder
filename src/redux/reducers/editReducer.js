const editReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDIT_FRIEND':
            return action.payload;
        case 'CLEAR_EDIT_FRIEND':
            return {};
        default:
            return state;
    }
};

export default editReducer;