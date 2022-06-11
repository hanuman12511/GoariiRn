import * as types from './types';
import {combineReducers} from 'redux';

const HomeReducer = (state = {}, action) => {
  switch (action.type) {
    
    case types.GET_HOME:
    // console.log("GET_HOME",action.payload)
    // dta get
      return action.payload;

    case types.ERROR:
      return action.payload;
    default:
      return state;
  }
};

const reducer = combineReducers({
  getHome: HomeReducer

}
);


export default reducer;
