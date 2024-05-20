import { LOGIN_SUCCESS } from "./authActions";

const initialState = {
  isLoggedIn: false,
  // diğer durum alanları...
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
      };
    // diğer durumlar...
    default:
      return state;
  }
};

export default authReducer;
