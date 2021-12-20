import React from "react";
import { Link } from "react-router-dom";
import './Ficha.css';
/* import { SafeAreaView, Text, View, TextInput, Button, StyleSheet } from "react"; */


export default class Ficha extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          dap:'',
          altura:'',
          nombreCientifico:'',
          nombreComun:''
        };
  
      this.handleChangeDap = this.handleChangeDap.bind(this);
      this.handleChangeAltura = this.handleChangeAltura.bind(this);
      this.handleChangeNombreCientifico = this.handleChangeNombreCientifico.bind(this);
      this.handleChangeNombreComun = this.handleChangeNombreComun.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChangeDap(event) {this.setState({dap: event.target.value});}
    handleChangeAltura(event) {this.setState({altura: event.target.value});}
    handleChangeNombreCientifico(event) {this.setState({nombreCientifico: event.target.value});}
    handleChangeNombreComun(event) {this.setState({nombreComun: event.target.value});}

    handleSubmit(event) {
      alert('El dap es: ' + this.state.dap);
      event.preventDefault();


    }
  
    render() {
      return (
        <form className="formDataEspecie" onSubmit={this.handleSubmit}>
          <label> Altura: <input type="text" value={this.state.altura} onChange={this.handleChangeAltura} /> </label>
          <label> DAP: <input type="text" value={this.state.dap} onChange={this.handleChangeDap} /> </label>
          <label> Nombre Cientifico: <input type="text" value={this.state.nombreCientifico} onChange={this.handleChangeNombreCientifico} /> </label>
          <label> Nombre Común: <input type="text" value={this.state.nombreComun} onChange={this.handleChangeNombreComun} /> </label>

          <div>
            <Link to="/identificar" className="btn btn-primary">Identificar</Link>
          </div>
          <div>  
            <input type="submit" value="Guardar Ficha" className="btn btn-primary" />
          </div>

        </form>
      );
    }
  }