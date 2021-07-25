export const initialState = {
    userDetails: {}
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_DETAILS':
            return {
                ...state,
                userDetails: action.userData
            }

        case 'SET_USER':
            return state;

        case 'EMPTY_BASKET':
            return state;

        default:
            return state;
    }
};

export default reducer;