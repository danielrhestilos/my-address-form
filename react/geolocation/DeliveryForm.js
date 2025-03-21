import React, { Component } from "react";

class DeliveryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: Object.fromEntries(
        props.fields.map(({ name, options }) => [name, options ? options[0] : ""])
      )
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => ({
        formData: { ...prevState.formData, [name]: value }
      }),
      () => this.props.onChange(this.state.formData) // Notifica al padre
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.formData);
  };

  render() {
    const { fields } = this.props;
    const { formData } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {fields.map(({ name, label, type, options }) => (
          <div key={name}>
            <label>{label}:</label>
            {options ? (
              <select name={name} value={formData[name]} onChange={this.handleChange} required>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input type={type} name={name} value={formData[name]} onChange={this.handleChange} required />
            )}
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default DeliveryForm;