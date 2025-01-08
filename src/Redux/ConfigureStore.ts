import { createStore, applyMiddleware, compose, StoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './Reducers';
import Reactotron from '../ReactotronConfig';

const enhancers: StoreEnhancer = compose(applyMiddleware(thunk), Reactotron.createEnhancer())
const store = createStore(rootReducer, {}, enhancers);

export default store;