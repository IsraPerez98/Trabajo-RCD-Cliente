import React, { Component } from "react";

class URLs extends Component {
    //recibe this.props.url_soap
    // this.props.url_rest
    // this.props.cambiarURLSoap()
    // y this.props.cambiarURLRest()

    constructor(props) {
        super(props);

        this.cambiarURLSoap = this.cambiarURLSoap.bind(this);
        this.cambiarURLRest = this.cambiarURLRest.bind(this);
    }

    cambiarURLSoap(event) {
        this.props.cambiarURLSoap(event.target.value);
    }

    cambiarURLRest(event) {
        this.props.cambiarURLRest(event.target.value);
    }


    render() {
        const url_soap = this.props.url_soap;
        const url_rest = this.props.url_rest;

        return (
            <div className="urls">
                <div className="url-soap">
                    <label>URL SOAP:</label>
                    <input type="text" value={url_soap} onChange={this.cambiarURLSoap}></input>
                </div>

                <div className="url-rest">
                    <label>URL REST:</label>
                    <input type="text" value={url_rest} onChange={this.cambiarURLRest}></input>
                </div>

            </div>
        );
    }
}

export default URLs;
