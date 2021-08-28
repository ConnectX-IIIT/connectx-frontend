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

        case 'UPDATE_PROFILE':
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    profilePicture: action.url
                }
            };

        case 'UPDATE_BACKGROUND':
            return {
                ...state,
                userDetails: {
                    ...state.userDetails,
                    backgroundPicture: action.url
                }
            };

        default:
            return state;
    }
};

export default reducer;