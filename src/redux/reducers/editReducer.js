const editReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_EDIT_ID':
            return action.payload;
        case 'CLEAR_EDIT_ID':
            return 0;
        default:
            return state;
    }
};

export default editReducer;