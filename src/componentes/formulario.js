import React, { Component } from "react";

import axios from 'axios';

import XMLParser from 'react-xml-parser';

class Formulario extends Component {
    // se le pasa this.props.url_soap
    // this.props.url_rest

    constructor(props) {
        super(props);

        this.state = {
            protocolo:"SOAP", // puede ser REST o SOAP, este valor se cambia al hacer click en un boton

            rut:"",
            apellido_paterno:"",
            apellido_materno:"",
            nombres:"",
            genero:"M",
        }

        this.cambiarProtocolo = this.cambiarProtocolo.bind(this);
        this.enviarDatos = this.enviarDatos.bind(this);
        this.cambiarValor = this.cambiarValor.bind(this);
    }

    cambiarProtocolo(protocolo) {
        this.setState({
            protocolo: protocolo
        })
    }

    cambiarValor(event) {
        const variable = event.target.name;
        this.setState({
            [variable]: event.target.value,
        })
    }

    enviarDatos(event){
        event.preventDefault()

        const protocolo = this.state.protocolo

        switch(protocolo) {
            case "REST":
                this.enviarDatosREST();
                break;
            case "SOAP":
                this.enviarDatosSOAP();
                break;
            default:
                console.err("Protocolo no valido ", protocolo)
                break;
        }
    }

    async enviarDatosREST() {
        const url_rest = this.props.url_rest;

        console.log({url_rest});

        const rut = this.state.rut;

        const apellido_paterno = this.state.apellido_paterno;
        const apellido_materno = this.state.apellido_materno;
        const nombres = this.state.nombres;
        const genero = this.state.genero;
        
        // verificador de rut
        try {
            const respuesta = await axios.post(`http://${url_rest}/digitoverificador/`, 
            {
                rut: rut,
            }, 
            {
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'content-type': 'text/json',
                },
            })
            console.log(respuesta.data);
            alert(`REST dice:\n${respuesta.data}`)
        } catch(err) {
            console.error(err);
            if(err.response){
                if(err.response.status === 400) {
                    alert("RUT ERRONEO");
                    alert(err.response.data);
                    console.log(err.response.data);
                } else {
                    alert("ERROR AL CONTACTAR EL SERVIDOR REST");
                }   
            } else {
                alert("ERROR AL CONTACTAR EL SERVIDOR REST");
            }
        }

        // nombre propio
        try {
            const respuesta = await axios.post(`http://${url_rest}/nombrepropio/`, 
            {
                'apellido paterno': apellido_paterno,
                'apellido materno': apellido_materno,
                nombres: nombres,
                genero: genero,
            }, 
            {
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'content-type': 'text/json',
                },
            })
            console.log(respuesta.data);
            alert(`REST dice:\n${respuesta.data}`)
        } catch(err) {
            console.error(err);
            if(err.response){
                if(err.response.status === 400) {
                    alert("RUT ERRONEO");
                    alert(err.response.data);
                    console.log(err.response.data);
                } else {
                    alert("ERROR AL CONTACTAR EL SERVIDOR REST");
                }   
            } else {
                alert("ERROR AL CONTACTAR EL SERVIDOR REST");
            }
        }
    }

    async enviarDatosSOAP() {
        const url_soap = this.props.url_soap;

        console.log({url_soap});

        const rut = this.state.rut;

        const apellido_paterno = this.state.apellido_paterno;
        const apellido_materno = this.state.apellido_materno;
        const nombres = this.state.nombres;
        const genero = this.state.genero;

        // verificar rut

        const xml_rut =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
            xmlns:web="http://www.webserviceX.NET/">\
            <soapenv:Header/>\
            <soapenv:Body>\
              <web:RutValidacion>\
                <web:rut>${rut}</web:rut>\
              </web:RutValidacion>\
            </soapenv:Body>\
          </soapenv:Envelope>`;

        try {
            const respuesta = await axios.post(`http://${url_soap}/`, 
            xml_rut, 
            {
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'text/xml',
                },
            })
            console.log(respuesta.data);
            const data_xml = new XMLParser().parseFromString(respuesta.data);
            console.log(data_xml);
            alert(`SOAP dice:\n${data_xml.children[0].children[0].children[0].value}`)
        } catch(err) {
            console.error(err);
            alert("ERROR AL CONTACTAR EL SERVIDOR SOAP");
        }

        //nombre propio

        const xml_nombre_propio =`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"\
            xmlns:web="http://www.webserviceX.NET/">\
            <soapenv:Header/>\
            <soapenv:Body>\
              <web:Mensaje>\
                <web:Ap>${apellido_paterno}</web:Ap>\
                <web:Am>${apellido_materno}</web:Am>\
                <web:N>${nombres}</web:N>\
                <web:G>${genero}</web:G>\
              </web:Mensaje>\
            </soapenv:Body>\
          </soapenv:Envelope>`;

        try {
            const respuesta = await axios.post(`http://${url_soap}/`, 
            xml_nombre_propio, 
            {
                headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': 'text/xml',
                },
            })
            console.log(respuesta.data);
            const data_xml = new XMLParser().parseFromString(respuesta.data);
            console.log(data_xml);
            alert(`SOAP dice:\n${data_xml.children[0].children[0].children[0].value}`)
        } catch(err) {
            console.error(err);
            alert("ERROR AL CONTACTAR EL SERVIDOR SOAP");
        }
    }



    render() {
        const rut = this.state.rut;
        const apellido_paterno = this.state.apellido_paterno;
        const apellido_materno = this.state.apellido_materno;
        const nombres = this.state.nombres;

        return (
            <div className="formulario" onSubmit={this.enviarDatos}>
                <form>
                    
                    <div className="rut">
                        <label>RUT:</label>
                        <input type="text" name="rut" value={rut} onChange={this.cambiarValor}></input>
                    </div>

                    <div className="nombres">
                        <label>Apellido Paterno:</label>
                        <input type="text" name="apellido_paterno" value={apellido_paterno} onChange={this.cambiarValor}></input>
                        <label>Apellido Materno:</label>
                        <input type="text" name="apellido_materno" value={apellido_materno} onChange={this.cambiarValor}></input>
                        <label>Nombres:</label>
                        <input type="text" name="nombres" value={nombres} onChange={this.cambiarValor}></input>

                        
                    </div>

                    <div className="genero">
                        <label>Genero:</label>

                        <div className="input-genero" onChange={this.cambiarValor}>
                            <input type="radio" value="M" name="genero" /> M
                            <input type="radio" value="F" name="genero" /> F
                        </div>
                    </div>

                    
                    <div className="botones">
                        <button type="submit" onClick={() => this.cambiarProtocolo("SOAP")}>Enviar - SOAP</button>
                        <button type="submit" onClick={() => this.cambiarProtocolo("REST")}>Enviar - REST</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Formulario;
