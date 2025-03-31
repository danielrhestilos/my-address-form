import React, { Component } from "react";
import styles from "./DeliveryForm.css";

class DeliveryForm extends Component {
  constructor(props) {
    super(props);

    const { fields, defaultValues = {} } = props;

    this.state = {
      formData: Object.fromEntries(
        fields.map(({ name, options, type }) => [
          name,
          defaultValues[name] ?? (options ? options[0] : type === "number" ? 0 : "")
        ])
      ),
      errors: {} // Estado para errores de validación
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(
      (prevState) => ({
        formData: { ...prevState.formData, [name]: value },
        errors: { ...prevState.errors, [name]: value.trim() === "" }
      }),
      () => this.props.onChange(this.state.formData)
    );
  };

  handleSubmit = (e) => {
    console.log('handleSubmit');
    
    e.preventDefault();
    const errors = {};
    let hasError = false;

    // Validar que los campos no estén vacíos
    Object.entries(this.state.formData).forEach(([key, value]) => {
      console.log('key: ',key);
      
      if (value.toString().trim() === '') {
        errors[key] = true;
        hasError = true;
      }
    });

    if (hasError) {
      this.setState({ errors });
      return;
    }

    this.props.onSubmit(this.state.formData);
  };

  render() {
    const { fields, onSubmit } = this.props;
    const { formData, errors } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <div className={styles.formContainer}>
          {fields.map(({ name, label, type, options ,placeholder}, index) => (
            <div
              key={name}
              style={{ marginBottom: "10px" }}
              className={fields.length - 1 === index ? styles.fullWidth : ""}
            >
              <label>{label}:</label>
              {options ? (
                <select
                  name={name}
                  value={formData[name]}
                  onChange={this.handleChange}
                  required
                  style={{
                    width: "88%",
                    padding: "8px",
                    border: errors[name] ? "1px solid red" : "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                >
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className={styles.inputTextDelivery}
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={this.handleChange}
                  placeholder={placeholder}
                  required
                  style={{
                    padding: "8px",
                    border: errors[name] ? "1px solid red" : "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                />
              )}
              {errors[name] && (
                <p
                  style={{
                    fontFamily: "Outfit",
                    color: "red",
                    fontSize: "12px",
                    margin: "5px 0 0"
                  }}
                >
                  Este campo es obligatorio
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => onSubmit(this.state.formData)}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#e91111",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontFamily: "Outfit"
          }}
        >
          Confirmar
        </button>
      </form>
    );
  }
}

export default DeliveryForm;