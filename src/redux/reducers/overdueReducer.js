const overdueReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OVERDUE':
            return action.payload;
        default:
            return state;
    }
};

export default overdueReducer;