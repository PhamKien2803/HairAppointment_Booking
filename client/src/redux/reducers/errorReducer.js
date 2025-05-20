// redux/reducers/errorReducer.js
const initialState = {
    error: null,
    showDialog: false,
};

const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_ERROR_DIALOG':
            return {
                ...state,
                error: action.payload,
                showDialog: true,
            };
        case 'HIDE_ERROR_DIALOG':
            return {
                ...state,
                showDialog: false,
                error: null,
            };
        default:
            return state;
    }
};

export default errorReducer;
