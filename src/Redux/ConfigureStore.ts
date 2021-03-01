import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { RootReducer } from './Reducers';

const logger = createLogger({ collapsed: true });
const store = createStore(RootReducer, applyMiddleware(logger, thunk));

export default store;