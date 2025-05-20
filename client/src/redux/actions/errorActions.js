// redux/actions/errorActions.js
export const SHOW_ERROR_DIALOG = 'SHOW_ERROR_DIALOG';
export const HIDE_ERROR_DIALOG = 'HIDE_ERROR_DIALOG';

export const showErrorDialog = (error) => {
    return {
        type: SHOW_ERROR_DIALOG,
        payload: error,
    };
};

export const hideErrorDialog = () => {
    return {
        type: HIDE_ERROR_DIALOG,
    };
};
