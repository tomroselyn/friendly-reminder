const dueNowReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DUE_NOW':
            return action.payload;
        default:
            return state;
    }
};

export default dueNowReducer;