import {Platform} from 'react-native';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';

import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as reducers from './redux/index';

//import rootReducer from './redux/home/reducers';

const middleware = applyMiddleware(thunk, promise, logger);
const rootReducer = combineReducers(reducers);

const Store = createStore(
  rootReducer,
  compose(
    middleware,
  
  ),
);

export default Store;
