//26.
import { configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
//6.reduce import
import userSlice from './reducers/userSlice';
//27
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({thunk:false}),sagaMiddleware]
//1.one 
export const store = configureStore({
    reducer: {
        user: userSlice
    },
    middleware
})

sagaMiddleware.run(rootSaga);