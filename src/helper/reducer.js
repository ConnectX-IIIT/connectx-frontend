export const initialState = {
    userDetails: {}
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_DETAILS':
            return {
                ...state,
                userDetails: action.userData
            };

        case 'UPDATE_CONVERSATIONS':
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    conversations: [
                        ...state.userDetails.conversations,
                        action.id
                    ]
                }
            };

        default:
            return state;
    }
};

export default reducer;