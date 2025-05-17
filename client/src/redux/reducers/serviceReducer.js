// redux/reducers/serviceReducer.js
import { FETCH_SERVICES, CREATE_SERVICE, UPDATE_SERVICE, DELETE_SERVICE } from '../actions/serviceActions';

const initialState = {
    services: [],
};

const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SERVICES:
            return {
                ...state,
                services: action.payload,
            };
        case CREATE_SERVICE:
            return {
                ...state,
                services: [...state.services, action.payload],
            };
        case UPDATE_SERVICE:
            return {
                ...state,
                services: state.services.map((service) =>
                    service._id === action.payload._id ? action.payload : service
                ),
            };
        case DELETE_SERVICE:
            return {
                ...state,
                services: state.services.filter((service) => service._id !== action.payload),
            };
        default:
            return state;
    }
};

export default serviceReducer;