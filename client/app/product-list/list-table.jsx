import React, { PropTypes } from 'react';
import ListHeader from './list-header';
import ListRow from './list-row';
import Card from 'components/card';

export function createRenderHelpers( currencySymbol, currencyIsPrefix, currencyDecimals, numberFormat, translate, data ) {
	return {
		currencySymbol,
		currencyIsPrefix,
		currencyDecimals,
		numberFormat,
		translate,
		data,
	};
}

export default class ListTable extends React.Component {
	propTypes: {
		products: PropTypes.object.isRequired,
		edits: PropTypes.object.isRequired,
		editable: PropTypes.bool.isRequired,
		disabled: PropTypes.bool.isRequired,
		columns: PropTypes.array.isRequired,
		selectedColumnKeys: PropTypes.set.isRequired,
		editable: PropTypes.bool.isRequired,
		renderHelpers: PropTypes.object.isRequired,
	}

	constructor( props ) {
		super( props );
	}

	getListHeaderRef() {
		return this.refs && this.refs.listHeader;
	}

	render() {
		const { products, edits, editable, disabled, selectedColumnKeys, onEdit, renderHelpers } = this.props;

		// Pass down a complete set of selected columns to children components.
		// Do the filtering once here and make use of it many times.
		const selectedColumns = this.props.columns.filter( ( col ) => selectedColumnKeys.has( col.key ) )

		// Copy all props and pass down to ListHeader for extension reasons.
		const headerProps = Object.assign( {}, this.props, { selectedColumns } );

		const classes = 'product-list__list-table product-list__list-table-columns-' + columns.length;

		return (
			<Card className={ classes }>
				<ul className="product-list__list">
					<ListHeader ref="listHeader" { ...headerProps } />
					{ products.map( ( data ) => this.renderRow( data, edits, selectedColumns, editable, disabled, onEdit, renderHelpers ) ) }
				</ul>
			</Card>
		);
	}

	renderRow( data, edits, selectedColumns, editable, disabled, onEdit, renderHelpers ) {
		// Check if there are edits on this data and show that instead.
		const updates = edits && edits.update;
		// TODO: A generic List Table implementation can't assume a unique ID.
		const updatedData = updates && updates.find( ( el ) => el.id === data.id );

		if ( updatedData ) {
			data = Object.assign( {}, data, updatedData );
		}

		return (
			<ListRow
				key={ data.id }
				selectedColumns={ selectedColumns }
				data={ data }
				editable={ editable }
				disabled={ disabled }
				onEdit={ onEdit }
				renderHelpers={ renderHelpers }
			/>
		);
	}
}

