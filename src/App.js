import React from 'react';
import './App.css';

import URLs from './componentes/urls';

import Formulario from './componentes/formulario';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      url_soap: "127.0.0.1:5000",
      url_rest: "127.0.0.1:3000",
    }

    this.cambiarURLSoap = this.cambiarURLSoap.bind(this);
    this.cambiarURLRest = this.cambiarURLRest.bind(this);
  }
  
  cambiarURLSoap(url) {
    this.setState({
      url_soap: url
    })
  }

  cambiarURLRest(url) {
    this.setState({
      url_rest: url
    })
  }

  render() {
    return (
        <div className="app">
          <URLs
            url_soap={this.state.url_soap}
            url_rest={this.state.url_rest}

            cambiarURLSoap={this.cambiarURLSoap}
            cambiarURLRest={this.cambiarURLRest}
          />

          <Formulario 
            url_soap={this.state.url_soap}
            url_rest={this.state.url_rest}
          />
        </div>
      );
  }
}

export default App;
