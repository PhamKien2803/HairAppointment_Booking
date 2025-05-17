import axiosInstance from "../../helper/axiosInstance";
import { showErrorDialog } from './errorActions';  // Import showErrorDialog
import { toast } from 'react-toastify';

export const FETCH_BRANCHES = 'FETCH_BRANCHES';
export const CREATE_BRANCH = 'CREATE_BRANCH';
export const UPDATE_BRANCH = 'UPDATE_BRANCH';
export const DELETE_BRANCH = 'DELETE_BRANCH';

export const fetchBranches = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get('/branches');
        dispatch({
            type: FETCH_BRANCHES,
            payload: response.data.data,
        });
    } catch (error) {
        dispatch(showErrorDialog(error));
    }
};

export const createBranch = (branchData) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/branches', branchData);
        dispatch({
            type: CREATE_BRANCH,
            payload: response.data,
        });
        toast.success('Branch created successfully');
    } catch (error) {
        dispatch(showErrorDialog(error));
        throw error;
    }
};

export const updateBranch = (id, branchData) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(`/branches/${id}`, branchData);
        dispatch({
            type: UPDATE_BRANCH,
            payload: response.data,
        });
        toast.success('Branch updated successfully');
    } catch (error) {
        dispatch(showErrorDialog(error));
        throw error;
    }
};

export const deleteBranch = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/branches/${id}`);
        dispatch({
            type: DELETE_BRANCH,
            payload: id,
        });
        toast.success('Branch deleted successfully');
    } catch (error) {
        dispatch(showErrorDialog(error));
        throw error;
    }
};
