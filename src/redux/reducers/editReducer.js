const editReducer = (state = 0, action) => {
    switch (action.type) {
        case 'SET_EDIT_ID':
            return action.payload;
        default:
            return state;
    }
};

export default editReducer;