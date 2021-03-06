import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { rootReducer } from './Reducers';

const logger = createLogger({ collapsed: true });
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;