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

export const initState = {
  orderItems: [],
  hotel: "",
  user: "",
  note: "",
  dateCheckin: "",
  dateCheckout: "",
  mode: false,
};
export function reducer(state, action) {
  switch (action.type) {
    case SET_CURRENT_USERID:
      console.log("payload", action.payload);

      return {
        ...state,
        user: action.payload,
      };
    case SET_CURRENT_USER:
      console.log("payload", action.payload);

      return {
        ...state,
        user: action.payload,
      };
    case SET_ID_HOTEL:
      console.log("payload", action.payload);

      return {
        ...state,
        hotel: action.payload.hotelId,
      };
    case SET_DATE_CHECK_IN_OUT:
      console.log("payload", action.payload);
      return {
        ...state,
        dateCheckin: action.payload.startDate,
        dateCheckout: action.payload.endDate,
      };
    case SET_ORDER_ITEM:
      const orderItemIndex = state.orderItems.findIndex(
        (orderItem) => orderItem.roomId === action.payload.roomId
      );

      if (orderItemIndex !== -1) {
        state.orderItems[orderItemIndex].quantity = action.payload.quantity;
      } else {
        state.orderItems.push({
          roomId: action.payload.roomId,
          quantity: action.payload.quantity,
          name: action.payload.name,
          price: action.payload.price,
        });
      }
      return state;
    case SET_ORDER_NOTE:
      console.log("payload", action.payload);
      return {
        ...state,
        note: action.payload,
      };
    case SET_CLEAR_ORDER:
      return {
        orderItems: [],
        note: "",
        dateCheckin: "",
        dateCheckout: "",
      };
    case SET_MODE_MODAL:
      return {
        ...state,
        mode: action.payload,
      };
    default:
      throw new Error("Invalid action ");
  }
}
