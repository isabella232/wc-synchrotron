import React from 'react';
import { Route, IndexRoute } from 'react-router'
import App from 'app';
import Dashboard from './app/dashboard';
import CouponsScreen from './app/coupons/coupons-screen';
import ProductList from './app/product-list';
import TaxRatesScreenContainer from './app/tax-rates/tax-rates-screen-container';

/**
 * This returns routes.
 * @type object
 */
export const routes = (
	<Route path="/" component={ App }>
		<IndexRoute component={ Dashboard } />
		<Route path='products' component={ ProductList } />
		<Route path='coupons' component={ CouponsScreen } />
		<Route path='taxes' component={ TaxRatesScreenContainer } />
	</Route>
);
