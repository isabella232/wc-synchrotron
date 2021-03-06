import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import multi from 'redux-multi';
import effects from 'redux-effects';
import fetch from 'redux-effects-fetch';
import createWcApi from '../wc-api-redux';
import { routerReducer } from 'react-router-redux';

import appConfig from './app-config';
import fetchData from './fetch-data/reducer';
import coupons from './coupons/reducer';
import products from './products/reducer';
import taxRates from './tax-rates/reducer';

export const rootReducer = combineReducers( {
	appConfig,
	fetchData,
	coupons,
	products,
	taxRates,
	routing: routerReducer,
} );

const createStoreWithMiddleware = applyMiddleware(
	multi,
	effects,
	fetch,
	createWcApi(),
	createLogger()
)( createStore );

export default function configureStore( initialState ) {
	const store = createStoreWithMiddleware( rootReducer, initialState );
	return store;
}
