import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";


class Header extends Component {
  render() {
    return (
      <div>
      <h1 className="text-center text-dark p-5 m-2">
      <img src="./logo1.webp" alt="Logo" width={60}/>
        Directorio de Contactos
      </h1>
      </div>
    );
  }
}
export default Header;
