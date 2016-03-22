import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCoupons } from '../state/coupons/actions';
import screenData from '../utils/screen_data';

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
			<div>
				<h3>React output for Coupons Screen.</h3>
				<button onClick={ this.onClick }>Click me</button>
			</div>
		);
	}
}

CouponsScreen.propTypes = {
	data: PropTypes.object.isRequired
};

function mapStateToProps( state ) {
	return { };
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators( { fetchCoupons }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( CouponsScreen );

