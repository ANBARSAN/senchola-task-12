//25.
import {all} from "redux-saga/effects";
import { watchUserSage } from "./userSaga";


export default function* rootSaga(){
    yield all([
        watchUserSage()
    ])
}