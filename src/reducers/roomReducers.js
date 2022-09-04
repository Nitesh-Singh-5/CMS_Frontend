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
  ROOM_CREATE_RESET,
  ROOM_UPDATE_REQUEST,
  ROOM_UPDATE_SUCCESS,
  ROOM_UPDATE_FAIL,
  ROOM_UPDATE_RESET,

} from "../constants/roomConstants";

export const RoomListReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return { loading: true, rooms: [] };

    case ROOM_LIST_SUCCESS:
      return {
        loading: false,
        rooms: action.payload.Rooms,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case ROOM_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const RoomDetailsReducer = (
  state = { room: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ROOM_DETAILS_REQUEST:
      return { loading: true, ...state };

    case ROOM_DETAILS_SUCCESS:
      return { loading: false, room: action.payload };

    case ROOM_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const RoomDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_DELETE_REQUEST:
      return { loading: true };

    case ROOM_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ROOM_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const RoomCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ROOM_CREATE_REQUEST:
      return { loading: true };

    case ROOM_CREATE_SUCCESS:
      return { loading: false, success: true, room: action.payload };

    case ROOM_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case ROOM_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const RoomUpdateReducer = (state = { room: {} }, action) => {
  switch (action.type) {
    case ROOM_UPDATE_REQUEST:
      return { loading: true };

    case ROOM_UPDATE_SUCCESS:
      return { loading: false, success: true, room: action.payload };

    case ROOM_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    case ROOM_UPDATE_RESET:
      return { room: {} };

    default:
      return state;
  }
};
