import {
  SET_CLEAR_ORDER,
  SET_CURRENT_USER,
  SET_CURRENT_USERID,
  SET_DATE_CHECK_IN_OUT,
  SET_ID_HOTEL,
  SET_MODE_MODAL,
  SET_ORDER_ITEM,
  SET_ORDER_NOTE,
} from "./Constains";

export const setDateCheckInOut = (payload) => ({
  type: SET_DATE_CHECK_IN_OUT,
  payload,
});
export const setOrderItem = (payload) => ({
  type: SET_ORDER_ITEM,
  payload,
});
export const setIdHotel = (payload) => ({
  type: SET_ID_HOTEL,
  payload,
});
export const setOrderNote = (payload) => ({
  type: SET_ORDER_NOTE,
  payload,
});

export const setCurrentUserId = (payload) => ({
  type: SET_CURRENT_USERID,
  payload,
});

export const setClearOrder = (payload) => ({
  type: SET_CLEAR_ORDER,
  payload,
});

export const setCurrentUser = (payload) => ({
  type: SET_CURRENT_USER,
  payload,
});
export const setModeModal = (payload) => ({
  type: SET_MODE_MODAL,
  payload,
});
