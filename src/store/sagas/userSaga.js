//16
import {put, takeLatest,call} from 'redux-saga/effects';
import {  saveUserInfo, fetchUserStart, createUserStart,checkUserName,updatePasswordStart} from '../reducers/userSlice'; 
import { makeRequest } from '../../http/makeRequest';

function*userLoginSaga({ payload }){
    const {userName, password, navigate} = payload;
     try{
        //yield put(fetchUserStart())
        const response = yield call(makeRequest,"get","users",);
        if(response.statusText === "OK"){
            const user = response.data.find((user)=> user.userName === userName && user.password === password);
            if(user){
                const userPayload ={
                       isUserAuthenticated: true,
                      userInfo:{
                      userId: user.userId,
                      userName: user.userName,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      address: user.address,
                      mobileNo: user.moNo,
                      userType: user.userType,
                      restaruntName: user.restaruntName,
                      restaruntAddress: user.restaruntAddress,
                      deliveryAgentKnownLanguages: user.deliveryAgentKnownLanguages,
                      avatar:user.avatar,
                      
                    },
                  };
                    yield put({type: saveUserInfo.type, payload: userPayload});
                    yield put(navigate("/"));
              }
        }
        //console.log(response, "from user Login saga");
     }catch(error){
        console.log(error);
     }
}

//18 updateUserInfoSaga po

function* createUserSaga({payload}){  // 24 payload vanganum
    const {method, endpoint, navigate} = payload;
    try{
       //yield put(fetchUserStart())
       // yield put(createUserStart());
       
        const response = yield call(makeRequest, method, endpoint, payload.data);
        
        //20 
        const {statusText, data} = response;
        //19 copy pase payload
        if(statusText === "Created"){
            const userPayload ={
               isUserAuthenticated: true,
              userInfo:{
              userName: data.userName,
              firstName: data.firstName,
              lastName: data.lastName,
              address: data.address,
              mobileNo: data.moNo,
              userType: data.userType,
              restaruntName: data.restaruntName,
              restaruntAddress: data.restaruntAddress,
              deliveryAgentKnownLanguages: data.deliveryAgentKnownLanguages,
              avatar: data.avatar,
            },
          };
           //21
    yield put(saveUserInfo(userPayload));
    navigate("/");
    }

   
}catch(error){
    console.log(error);
}

}

function* checkUserNameSaga({payload}) {
    const response = yield call(makeRequest, "get",
        "users",
      );
      if(response.statusText === "OK") {
        const user = response.data.find(
          (user) => user.userName === payload.userName
        );
      if(user) {
        const userPayload = {
         
            userName: user.userName,
            userId: user.userId
         
        };
        //console.log("valid user");
        //yield put(saveUserInfo(userPayload))
        payload.navigate("/update/password", { state: userPayload });
      } else {
        //console.log("invalid user");
      //yield put(userNotFound);
      payload.navigate("/forgot",{replace: true, state:{
        invalidUser: true
        
      }
    });
      }
  }
  }

  function* updatePasswordSaga({ payload }) {
    try {
      const response = yield call(makeRequest, "put", `users/${payload.userId}`, {
        password: payload.password,
      });
      if (response.statusText === "OK") {
        payload.navigate("/login");
      } else {
        console.log("Password not updated please check with admin");
      }
    } catch (error) {
      console.log("Error during the update password: ", error);
    }
  }
  





//17 watch user saga
export function*watchUserSage(){
    yield takeLatest(fetchUserStart.type, userLoginSaga);
    yield takeLatest(createUserStart.type, createUserSaga);
    yield takeLatest(checkUserName.type, checkUserNameSaga);
    yield takeLatest(updatePasswordStart.type, updatePasswordSaga);
}