import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTaxRates, editTaxRate, updateTaxRates } from '../../state/tax-rates/actions';
import TaxRatesScreen from './tax-rates-screen';
import screenData from '../../utils/screen-data';

const data = screenData( 'wc_synchrotron_data' );

class TaxRatesScreenContainer extends React.Component {
	constructor( props ) {
		super( props );
		this.onSave = this.onSave.bind( this );
	}

	propTypes: {
		taxRatesState: PropTypes.object.isRequired,
	}

	componentDidMount() {
		this.props.fetchTaxRates( data.endpoints.taxes, data.nonce );
	}

	onSave() {
		this.props.updateTaxRates( this.props.taxRatesState.editing, data.endpoints.taxes + '/update_items', data.nonce );
	}

	render() {
		return <TaxRatesScreen taxRatesState={ this.props.taxRatesState } i18n={ data.i18n } onTaxRateEdit={ this.props.editTaxRate } onSave={ this.onSave } />;
	}
}

function mapStateToProps( state ) {
	return {
		taxRatesState: state.taxRates
	};
}

function mapDispatchToProps( dispatch ) {
	return bindActionCreators(
		{
			fetchTaxRates,
			editTaxRate,
			updateTaxRates,
		},
		dispatch
	);
}

export default connect( mapStateToProps, mapDispatchToProps )( TaxRatesScreenContainer );
