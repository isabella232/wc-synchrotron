import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCoupons } from '../state/coupons/actions';
import screenData from '../utils/screen_data';
import CouponsList from './coupons_list';

export default class CouponsScreen extends React.Component {
	constructor( props ) {
		super( props );
		this.onClick = this.onClick.bind( this );
	}

	onClick() {
		const { data } = this.props;

		this.props.fetchCoupons( data.endpoints.get_coupons, data.nonce );
	}

	render() {
		return (
			<div className="wrap">
				<button onClick={ this.onClick }>Click me</button>
				{ this.renderCouponsList( this.props.coupons ) }
			</div>
		);
	}

	renderCouponsList( couponsState ) {
		const { isFetching, isFetched, coupons, error } = couponsState;

		if ( isFetched ) {
			return <CouponsList coupons={ coupons } />;
		} else if ( isFetching ) {
			return <h4>Please wait...</h4>;
		}
	}
}

CouponsScreen.propTypes = {
	data: PropTypes.object.isRequired,
	coupons: PropTypes.object.isRequired
};

function mapStateToProps( state ) {
	const { coupons } = state;

	return {
		coupons
	};
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators( { fetchCoupons }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( CouponsScreen );

