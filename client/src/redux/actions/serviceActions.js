import axiosInstance from "../../helper/axiosInstance";
import { showErrorDialog } from './errorActions';  // Import showErrorDialog
import { toast } from 'react-toastify';

export const FETCH_SERVICES = 'FETCH_SERVICES';
export const CREATE_SERVICE = 'CREATE_SERVICE';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';

export const fetchServices = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/services');
        dispatch({
            type: FETCH_SERVICES,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const createService = (serviceData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/services', serviceData);
        dispatch({
            type: CREATE_SERVICE,
            payload: response.data,
        });
        toast.success('Service created successfully');
    } catch (error) {
        dispatch(showErrorDialog(error));
        throw error;
    }
};

export const updateService = (id, serviceData) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(`/services/${id}`, serviceData);
        dispatch({
            type: UPDATE_SERVICE,
            payload: response.data,
        });
        toast.success('Service updated successfully');
    } catch (error) {
        dispatch(showErrorDialog(error));
        throw error;
    }
};

export const deleteService = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/services/${id}`);
        dispatch({
            type: DELETE_SERVICE,
            payload: id,
        });
        toast.success('Service deleted successfully');
    } catch (error) {
        dispatch(showErrorDialog(error));
        throw error;
    }
};
