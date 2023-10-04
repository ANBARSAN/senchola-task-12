import { createSlice } from "@reduxjs/toolkit";



const userInitialState =  {
  fetchUserStart: false,
  createUserStart: false,
  updatePasswordStart:false,
  isUserAuthenticated: false,
  userNotFound: false,
  userInfo: {
    userName: "",
    userId: "",
    firstName: "",
    lastName: "",
    address: "",
    mobileNo: "",
    userType: "",
    restaurantName: "",
    restaurantAddress: "",
    deliveryAgentKnownLanguages: [],
    avatar: "",
  },
}

//3.creat reducer folder and sginup page

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  // initialState: {
  //   //12.isloading
  //   fetchUserStart: false,
  //   createUserStart: false,
  //   updatePasswordStart:false,
  //   //8 isUserAuthenticated
  //   isUserAuthenticated: false,
  //   userNotFound: false,
  //   userInfo: {
  //     userName: "",
  //     userId:"",
  //     firstName: "",
  //     lastName: "",
  //     address: "",
  //     mobileNo: "",
  //     userType: "",
  //     restaruntName: "",
  //     restaruntAddress: "",
  //     deliveryAgentKnownLanguages: [],
  //     avatar: "",
  //   },
  // },
  reducers: {
    //11 redux saga start
    fetchUserStart: (state) => {
      state.fetchUserStart = true;
    },
    createUserStart: (state) => {
      state.createUserStart = true;
    },
    saveUserInfo: (state, action) => {
      console.log("user slice user save", action)
      //14
      state.fetchUserStart = false;
      state.createUserStart = false;
      //9.
      state.isUserAuthenticated = action.payload.isUserAuthenticated;
      state.userInfo = action.payload.userInfo;
    },

    checkUserName: (state) => {
      state.fetchUserStart = false;
      state.createUserStart = false;
    },

    updatePasswordStart: (state) => {
      state.updatePasswordStart = true;
    },
    userLogout: () => userInitialState
  },
});

// 4. destructuring export

export const { fetchUserStart, createUserStart, saveUserInfo, updatePasswordStart, checkUserName, userLogout } =
  userSlice.actions;
export default userSlice.reducer;
