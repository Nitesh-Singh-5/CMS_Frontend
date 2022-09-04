import axios from "axios";
import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DELETE_FAIL,
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_SUCCESS,
  ROOM_UPDATE_FAIL,
} from "../constants/roomConstants";

export const listRooms =
  (keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ROOM_LIST_REQUEST });

      const { data } = await axios.get(`/api/rooms${keyword}`);
      console.log(data);
      dispatch({
        type: ROOM_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ROOM_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

// export const listTopProducts = () => async (dispatch) => {
//     try {
//         dispatch({ type: ROOM_TOP_REQUEST })

//         const { data } = await axios.get(`/api/products/top/`)

//         dispatch({
//             type: ROOM_TOP_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: ROOM_TOP_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }

export const listRoomDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ROOM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/rooms/${id}`);

    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletRoom = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROOM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/delete/${id}/`, config);

    dispatch({
      type: ROOM_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ROOM_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createRoom = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROOM_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products/create/`, {}, config);
    dispatch({
      type: ROOM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateRoom = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROOM_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/products/update/${product._id}/`,
      product,
      config
    );
    dispatch({
      type: ROOM_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROOM_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// export const createRoomReview = (productId, review) => async (dispatch, getState) => {
//     try {
//         dispatch({
//             type: ROOM_CREATE_REVIEW_REQUEST
//         })

//         const {
//             userLogin: { userInfo },
//         } = getState()

//         const config = {
//             headers: {
//                 'Content-type': 'application/json',
//                 Authorization: `Bearer ${userInfo.token}`
//             }
//         }

//         const { data } = await axios.post(
//             `/api/products/${productId}/reviews/`,
//             review,
//             config
//         )
//         dispatch({
//             type: ROOM_CREATE_REVIEW_SUCCESS,
//             payload: data,
//         })

//     } catch (error) {
//         dispatch({
//             type: ROOM_CREATE_REVIEW_FAIL,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }
