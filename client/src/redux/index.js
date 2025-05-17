import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer';
import branchReducer from './reducers/branchReducer';
import serviceReducer from './reducers/serviceReducer';
import errorReducer from './reducers/errorReducer';
import dashboardReducer from './reducers/dashboardReducer';


const rootReducer = combineReducers({
    user: userReducer,
    branch: branchReducer,
    service: serviceReducer,
    error: errorReducer,
    dashboard: dashboardReducer,
});

export default rootReducer;