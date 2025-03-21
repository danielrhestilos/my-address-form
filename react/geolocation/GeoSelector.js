import React, { Component } from 'react';
import { geo } from './geoData'; // Asegúrate de importar correctamente el objeto geo

class GeoSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLocation: {
                departamento: '',
                provincia: '',
                distrito: '',
                codigoPostal: '',
            }
        };
    }

    handleDepartamentoChange = (event) => {
        const departamento = event.target.value;
        this.setState({
            departamento,
            provincia: '',
            distrito: '',
            codigoPostal: '',
        }, this.notifyParent);
    };

    handleProvinciaChange = (event) => {
        const provincia = event.target.value;
        this.setState({
            provincia,
            distrito: '',
            codigoPostal: '',
        }, this.notifyParent);
    };

    handleDistritoChange = (event) => {
        const distrito = event.target.value;
        const codigoPostal = geo[this.state.departamento]?.[this.state.provincia]?.[distrito] || '';
        this.setState({ distrito, codigoPostal }, this.notifyParent);
    };

    notifyParent = () => {
        const { departamento, provincia, distrito, codigoPostal } = this.state;
        this.props.onChange({ departamento, provincia, distrito, codigoPostal });
    };

    render() {
        const { departamento, provincia, distrito } = this.state;
        const provincias = departamento ? Object.keys(geo[departamento] || {}) : [];
        const distritos = provincia ? Object.keys(geo[departamento]?.[provincia] || {}) : [];

        return (
            <div>
                <label>Departamento:</label>
                <select value={departamento} onChange={this.handleDepartamentoChange}>
                    <option value="">Seleccione un departamento</option>
                    {Object.keys(geo).map((dep) => (
                        <option key={dep} value={dep}>{dep}</option>
                    ))}
                </select>

                <label>Provincia:</label>
                <select value={provincia} onChange={this.handleProvinciaChange} disabled={!departamento}>
                    <option value="">Seleccione una provincia</option>
                    {provincias.map((prov) => (
                        <option key={prov} value={prov}>{prov}</option>
                    ))}
                </select>

                <label>Distrito:</label>
                <select value={distrito} onChange={this.handleDistritoChange} disabled={!provincia}>
                    <option value="">Seleccione un distrito</option>
                    {distritos.map((dist) => (
                        <option key={dist} value={dist}>{dist}</option>
                    ))}
                </select>

                {this.state.codigoPostal && (
                    <p><strong>Código Postal:</strong> {this.state.codigoPostal}</p>
                )}
            </div>
        );
    }
}

export default GeoSelector;