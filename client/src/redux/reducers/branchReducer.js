// redux/reducers/branchReducer.js
import { FETCH_BRANCHES, CREATE_BRANCH, UPDATE_BRANCH, DELETE_BRANCH } from '../actions/branchActions';

const initialState = {
    branches: [],
};

const branchReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BRANCHES:
            return {
                ...state,
                branches: action.payload,
            };
        case CREATE_BRANCH:
            return {
                ...state,
                branches: [...state.branches, action.payload],
            };
        case UPDATE_BRANCH:
            return {
                ...state,
                branches: state.branches.map((branch) =>
                    branch._id === action.payload._id ? action.payload : branch
                ),
            };
        case DELETE_BRANCH:
            return {
                ...state,
                branches: state.branches.filter((branch) => branch._id !== action.payload),
            };
        default:
            return state;
    }
};

export default branchReducer;
