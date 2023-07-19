import React, { Component } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
class ContactoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      phone: "",
      address: {
      city: "",
      },
      showAlert: false,
    };
  }
  toggleAlert = (val) => {
    this.setState({
      showAlert: val,
    });
  };
  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };
  handleAddressInputChange = (field, value) => {
    this.setState({
      address: {
        ...this.state.address,
        [field]: value,
      },
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address } = this.state;
    if (name && email && phone && address.city) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((user) => {
          console.log(user);
          this.props.formSubmit(user);
        });
    } else {
      this.toggleAlert(true);
    }
  };
  render() {
    const { showAlert } = this.state;
    return (
      <Container>
        {" "}
        <Form className="border border-secondary p-4 border-5 rounded">
          <Row>
            {showAlert && (
              <Alert variant="danger">Completa todos los campos</Alert>
            )}
          </Row>
          <Row className="mb-3">
            {" "}
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre"
                onChange={(e) => this.handleInputChange("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ingresa.tu@email"
                onChange={(e) =>
                  this.handleInputChange("email", e.target.value)
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="formGridPhonenumber">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingresa un numero de telefono"
                onChange={(e) =>
                  this.handleInputChange("phone", e.target.value)
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ciudad"
                onChange={(e) =>
                  this.handleAddressInputChange("city", e.target.value)
                }
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit" onClick={this.onFormSubmit}>
            Añadir Contacto
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ContactoForm;
