import React, { PropTypes } from 'react';
import ListHeader from './list-header';
import ListRow from './list-row';
import Card from 'components/card';

export default class ListTable extends React.Component {
	propTypes: {
		products: PropTypes.object.isRequired,
		columns: PropTypes.array.isRequired,
		selectedColumns: PropTypes.array.isRequired,
		editable: PropTypes.bool.isRequired,
	}

	constructor( props ) {
		super( props );
	}

	getListHeaderRef() {
		return this.refs && this.refs.listHeader;
	}

	render() {
		const { products, editable } = this.props;

		// Pass down a complete set of selected columns to children components.
		// Do the filtering once here and make use of it many times.
		const selectedColumns = this.props.columns.filter( ( col ) => this.props.selectedColumns.has( col.key ) )

		// Copy all props and pass down to ListHeader for extension reasons.
		const headerProps = Object.assign( {}, this.props, { selectedColumns } );

		const classes = 'product-list__list-table product-list__list-table-columns-' + columns.length;

		return (
			<Card className={ classes }>
				<ul className="product-list__list">
					<ListHeader ref="listHeader" { ...headerProps } />
					{ products.map( ( data ) => this.renderRow( data, selectedColumns, editable ) ) }
				</ul>
			</Card>
		);
	}

	renderRow( data, selectedColumns, editable ) {
		return <ListRow key={ data.id } selectedColumns={ selectedColumns } data={ data } editable={ editable } />;
	}
}

