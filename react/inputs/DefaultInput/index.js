import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AddressShapeWithValidation from '../../propTypes/AddressShapeWithValidation'
import InputSelect from './InputSelect'
import InputText from './InputText'
import InputLabel from './InputLabel'
import InputError from './InputError'
import PostalCodeLoader from '../../postalCodeFrom/PostalCodeLoader'
import { injectIntl, intlShape } from '../../intl/utils'
import GeolocationNumberInput from './GeolocationNumberInput'

class Input extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showErrorMessage: false,
    }
  }

  handleChange = (e) => {
    this.setState({ showErrorMessage: false })
    this.props.onChange && this.props.onChange(e)
  }

  handleFocus = (e) => {
    this.setState({ showErrorMessage: false })
    this.props.onFocus && this.props.onFocus(e)
  }

  handleBlur = (e) => {
    this.setState({ showErrorMessage: true })
    this.props.onBlur && this.props.onBlur(e)
  }

  render() {
    const {
      field,
      options,
      address,
      autoFocus,
      inputRef,
      intl,
      shouldShowNumberKeyboard,
      onFocus,
      toggleNotApplicable,
      onChange,
      onBlur,
    } = this.props

    const loading = !!address[field.name].loading
    const disabled = !!address[field.name].disabled
    const { valid } = address[field.name]
    const notApplicable = !!address[field.name].notApplicable
    const noNumberValue = !address.number.value && field.name === 'number'
    const hiddenNumber = field.hidden
    const queryAndNotApplicableCondition =
      (address.addressQuery &&
        address.addressQuery.geolocationAutoCompleted &&
        noNumberValue) ||
      notApplicable

    const geolocationCondition = queryAndNotApplicableCondition && !hiddenNumber

    if (geolocationCondition) {
      const handleToggle = toggleNotApplicable

      return (
        <GeolocationNumberInput
          field={field}
          address={address}
          autoFocus={autoFocus}
          inputRef={inputRef}
          intl={intl}
          disabled={disabled}
          onBlur={onBlur}
          onFocus={onFocus}
          handleToggle={handleToggle}
          onChangeAddress={onChange}
        />
      )
    }

    if (field.name === 'postalCode') {
      return (
        <InputLabel field={field}>
          <InputText
            field={field}
            className={loading ? 'loading-postal-code' : null}
            address={address}
            autoFocus={autoFocus}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            disabled={loading}
            inputRef={inputRef}
            type={shouldShowNumberKeyboard ? 'tel' : 'text'}
            onFocus={this.handleFocus}
          />
          {loading && <PostalCodeLoader />}
          {field.forgottenURL && (
            <small>
              <a href={field.forgottenURL} target="_blank" rel="noreferrer">
                {intl.formatMessage({ id: 'address-form.dontKnowPostalCode' })}
              </a>
            </small>
          )}
          {valid === false && this.state.showErrorMessage ? (
            <InputError reason={address[field.name].reason} />
          ) : null}
        </InputLabel>
      )
    }

    if (field.name === 'addressQuery') {
      return (
        <InputLabel field={field}>
          <InputText
            field={field}
            className={loading ? 'loading-postal-code' : null}
            address={address}
            autoFocus={autoFocus}
            placeholder={intl.formatMessage({
              id: `address-form.geolocation.example.${address.country.value}`,
              defaultMessage: intl.formatMessage({
                id: 'address-form.geolocation.example.UNI',
              }),
            })}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            disabled={loading}
            inputRef={inputRef}
            onFocus={this.handleFocus}
          />
          {loading && <PostalCodeLoader />}
          {valid === false && this.state.showErrorMessage ? (
            <InputError reason={address[field.name].reason} />
          ) : null}
        </InputLabel>
      )
    }

    return (
      <InputLabel field={field}>
        {options ? (
          <InputSelect
            field={field}
            options={options}
            address={address}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            disabled={loading}
            inputRef={inputRef}
            onFocus={this.handleFocus}
          />
        ) : (
          <InputText
            field={field}
            address={address}
            autoFocus={autoFocus}
            onChange={this.handleChange}
            placeholder={
              !field.hidden && !field.required
                ? intl.formatMessage({ id: 'address-form.optional' })
                : null
            }
            onBlur={this.handleBlur}
            disabled={loading}
            inputRef={inputRef}
            onFocus={this.handleFocus}
          />
        )}
        {valid === false && this.state.showErrorMessage ? (
          <InputError reason={address[field.name].reason} />
        ) : null}
      </InputLabel>
    )
  }
}

Input.defaultProps = {
  inputRef: () => {},
  onBlur: () => {},
  autoFocus: false,
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
  autoFocus: PropTypes.bool,
  options: PropTypes.array,
  address: AddressShapeWithValidation,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  intl: intlShape,
  shouldShowNumberKeyboard: PropTypes.bool,
  toggleNotApplicable: PropTypes.func,
}

export default injectIntl(Input)
