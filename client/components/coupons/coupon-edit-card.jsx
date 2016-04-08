import React, { PropTypes } from 'react';
import i18n, { translate as __ } from 'lib/mixins/i18n';
import Accordion from 'components/accordion';
import Card from 'components/card';
import Gridicon from 'components/gridicon';
import FormCheckbox from 'components/forms/form-checkbox';
import FormLabel from 'components/forms/form-label';
import FormTextInput from 'components/forms/form-text-input';
import FormDateInput from 'components/forms/form-date-input';
import FormTextInputWithAffixes from 'components/forms/form-text-input-with-affixes';
import FormSelect from 'components/forms/form-select';

export default class CouponEditCard extends React.Component {
	propTypes: {
		coupon: PropTypes.object.isRequired,
		onEdit: PropTypes.func.isRequired,
		onCancelClick: PropTypes.func.isRequired,
		onSaveClick: PropTypes.func.isRequired
	}

	constructor( props ) {
		super( props );

		this.couponTypes = {
			fixed_cart: { displayName: __( "Cart Discount" ), formDiv: this.fixedDiscountDiv },
			percent: { displayName: __( "Cart % Discount" ), formDiv: this.percentDiscountDiv },
			fixed_product: { displayName: __( "Product Discount" ), formDiv: this.fixedDiscountDiv },
			percent_product: { displayName: __( "Product % Discount" ), formDiv: this.percentDiscountDiv },
			sign_up_fee: { displayName: __( "Sign Up Fee Discount" ), formDiv: this.fixedDiscountDiv },
			sign_up_fee_percent: { displayName: __( "Sign Up Fee % Discount" ), formDiv: this.percentDiscountDiv },
			recurring_fee: { displayName: __( "Recurring Product Discount" ), formDiv: this.fixedDiscountDiv },
			recurring_percent: { displayName: __( "Recurring Product % Discount" ), formDiv: this.percentDiscountDiv }
		}

		this.onFieldChange = this.onFieldChange.bind( this );
		this.onCheckboxChange = this.onCheckboxChange.bind( this );
	}

	onFieldChange( e ) {
		const { coupon, onEdit } = this.props;

		onEdit( coupon, e.target.name, e.target.value );
	}

	onCheckboxChange( e ) {
		const { coupon, onEdit } = this.props;

		onEdit( coupon, e.target.name, e.target.checked );
	}

	fixedDiscountDiv( coupon, onChange ) {
		// TODO: Change $ with appropriate currency symbol.
		return (
			<div>
				<FormLabel htmlFor="amount">
					{ __( 'Discount:' ) }
				</FormLabel>
				<FormTextInputWithAffixes
						name="amount"
						prefix="$"
						value={ coupon.amount }
						onChange={ onChange } />
			</div>
		);
	}

	percentDiscountDiv( coupon, onChange ) {
		return (
			<div>
				<FormLabel htmlFor="amount">
					{ __( 'Discount:' ) }
				</FormLabel>
				<FormTextInputWithAffixes
						name="amount"
						suffix="%"
						value={ coupon.amount }
						onChange={ onChange } />
			</div>
		);
	}

	render() {
		const { coupon, onCancelClick, onSaveClick } = this.props;

		let options = [];
		for ( let ckey in this.couponTypes ) {
			options.push( <option key={ ckey } value={ ckey }>{ this.couponTypes[ckey].displayName }</option> );
		}

		return (
			<Card className="coupon-card coupon-edit-card">
				<form>
					<div>
						<FormLabel htmlFor="code">
							{ __( 'Coupon Code:' ) }
						</FormLabel>
						<FormTextInput
								name="code"
								value={ coupon.code }
								onChange={ this.onFieldChange } />
					</div>

					<div>
						<FormLabel htmlFor="description">
							{ __( 'Description:' ) }
						</FormLabel>
						<FormTextInput
								name="description"
								value={ coupon.description }
								onChange={ this.onFieldChange } />
					</div>

					<div>
						<FormLabel htmlFor="type">
							{ __( 'Type:' ) }
						</FormLabel>
						<FormSelect
								name="type"
								value={ coupon.type }
								onChange={ this.onFieldChange } >
							{ options }
						</FormSelect>
					</div>

					{ this.couponTypes[coupon.type].formDiv( coupon, this.onFieldChange ) }

					<div>
						<FormLabel htmlFor="enable_free_shipping">
							{ __( 'Free Shipping?' ) }
						</FormLabel>
						<FormCheckbox
								name="enable_free_shipping"
								checked={ coupon.enable_free_shipping }
								onChange={ this.onCheckboxChange } />
					</div>

					<div>
						<FormLabel htmlFor="expiry_date">
							{ __( 'Expiration Date:' ) }
						</FormLabel>
						<FormDateInput
								name="expiry_date"
								value={ coupon.expiry_date }
								onChange={ this.onFieldChange } />
					</div>

					<Accordion title={ __( "Restrictions" ) } >

						<div>
							<FormLabel htmlFor="minimum_amount">
								{ __( 'Minimum Cart:' ) }
							</FormLabel>
							<FormTextInput
									name="minimum_amount"
									value={ coupon.minimum_amount }
									onChange={ this.onFieldChange } />
						</div>

						<div>
							<FormLabel htmlFor="maximum_amount">
								{ __( 'Maximum Cart:' ) }
							</FormLabel>
							<FormTextInput
									name="maximum_amount"
									value={ coupon.maximum_amount }
									onChange={ this.onFieldChange } />
						</div>

						<div>
							<FormLabel htmlFor="individual_use">
								{ __( 'Individual Use Only?' ) }
							</FormLabel>
							<FormCheckbox
									name="individual_use"
									checked={ coupon.individual_use }
									onChange={ this.onCheckboxChange } />
						</div>

						<div>
							<FormLabel htmlFor="exclude_sale_items">
								{ __( 'Exclude Sale Items?' ) }
							</FormLabel>
							<FormCheckbox
									name="exclude_sale_items"
									checked={ coupon.exclude_sale_items }
									onChange={ this.onCheckboxChange } />
						</div>

					</Accordion>

					<Gridicon
						className="cancel-icon"
						icon="undo"
						onClick={ () => { onCancelClick( coupon ); } } />
					<Gridicon
						className="save-icon"
						icon="checkmark-circle"
						onClick={ () => { onSaveClick( coupon ); } } />
				</form>
			</Card>
		);
	}
}

