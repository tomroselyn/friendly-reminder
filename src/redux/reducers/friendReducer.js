const friendReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FRIENDS':
            return action.payload;
        default:
            return state;
    }
};

export default friendReducer;