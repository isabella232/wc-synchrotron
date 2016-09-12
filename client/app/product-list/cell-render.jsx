import React from 'react';
import Gridicon from 'gridicons/react/gridicon';
import FormCheckbox from 'components/forms/form-checkbox';
import FormTextInput from 'components/forms/form-text-input';
import FormNumberInput from 'components/forms/form-number-input';

export function renderString( product, key ) {
	return product[key];
}

export function renderInteger( product, key, nanString = 'N/A' ) {
	const value = Number( product[key] );
	if ( value ) {
		return ( ! isNaN( value ) ? value : nanString );
	} else {
		return '';
	}
}

export function renderBoolean( product, key, trueValues = [ true, 'true', 'yes' ], trueIcon = 'checkmark', falseIcon = 'cross-small' ) {
	const value = trueValues.includes( product[key] );
	if ( value ) {
		return trueIcon && <Gridicon icon={ trueIcon } />;
	} else {
		return falseIcon && <Gridicon icon={ falseIcon } />;
	}
}

export function renderCurrency( product, key, helpers ) {
	const value = product[key];
	const { currencySymbol, currencyIsPrefix, currencyDecimals, numberFormat } = helpers;
	if ( value ) {
		let number = numberFormat( value, currencyDecimals );
		let text;

		if ( currencyIsPrefix ) {
			text = currencySymbol + number;
		} else {
			text = number + currencySymbol;
		}
		return text;
	} else {
		return '';
	}
}

export function renderDimensions( product, key ) {
	const value = product[key];

	if ( value && ( value.length || value.width || value.height ) ) {
		const l = value.length ? Number( value.length ) : '-';
		const w = value.width ? Number( value.width ) : '-';
		const h = value.height ? Number( value.height ) : '-';

		return l + '/' + w + '/' + h;
	} else {
		return '';
	}
}

export function renderCategories( product, key ) {
	const value = product[key];

	if ( value ) {
		let names = value.map( ( c ) => c.name );

		return names.join();
	} else {
		return '';
	}
}

export function renderTags( product, key ) {
	const value = product[key];

	if ( value ) {
		let names = value.map( ( c ) => c.name );

		return names.join();
	} else {
		return '';
	}
}

export function renderTextInput( product, key, disabled, onEdit ) {
	const onChange = ( evt ) => {
		const value = evt.target.value;
		// TODO: Add customizable validation step here?
		onEdit( product, key, value );
	};

	return (
		<FormTextInput id={ key } disabled={ disabled } value={ product[ key ] } onChange={ onChange } />
	);
}

export function renderNumberInput( product, key, disabled, onEdit, min, max ) {
	const onChange = ( evt ) => {
		const value = evt.target.value;
		// TODO: Add customizable validation step here?
		onEdit( product, key, value );
	};

	return (
		<FormNumberInput id={ key } disabled={ disabled } value={ product[ key ] } onChange={ onChange } min={ min } max={ max} />
	);
}

export function renderCheckboxInput( product, key, disabled, onEdit, trueValue = true ) {
	const value = trueValue === product[ key ];

	const onChange = ( evt ) => {
		const value = evt.target.checked;
		onEdit( product, key, value );
	}

	return (
		<FormCheckbox id={ key } disabled={ disabled } checked={ value } onChange={ onChange } />
	);
}

