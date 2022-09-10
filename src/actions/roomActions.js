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
      // console.log(data);
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

// export const listToprooms = () => async (dispatch) => {
//     try {
//         dispatch({ type: ROOM_TOP_REQUEST })

//         const { data } = await axios.get(`/api/rooms/top/`)

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

export const deleteRoom = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.delete(`/api/rooms/delete/${id}/`, config);

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

    const { data } = await axios.post(`/api/rooms/create/`, {}, config);
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

export const updateRoom = (room) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROOM_UPDATE_REQUEST,
    }); 
    console.log('update room',room);

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
      `/api/rooms/update/${room._id}/`,
      room,
      config
    );
    dispatch({
      type: ROOM_UPDATE_SUCCESS,
      payload: data,
    });
    console.log('data2',data);
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

// export const createRoomReview = (roomId, review) => async (dispatch, getState) => {
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
//             `/api/rooms/${roomId}/reviews/`,
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
