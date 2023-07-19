import React, { Component } from "react";
import { Form, Button, Row, Col, Container, Alert } from "react-bootstrap";
class UpdateContacto extends Component {
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
    setTimeout(() => {
      this.setState({
        showAlert: !val,
      });
    }, 6000);
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
    const userId = this.props.user.id;
    let url = `https://jsonplaceholder.typicode.com/users/1`;
    const { name, email, phone, address } = this.state;
    if (name && email && phone && address.city) {
      fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          userId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((user) => {
          console.log(user);
          this.props.updateContacto(user);
          this.props.hideForm();
        });
    } else {
      this.toggleAlert(true);
    }
  };
  render() {
    const { email, name, phone, address } = this.props.user;
    const { showAlert } = this.state;
    return (
      <Container className="m-3">
        <Form
          className="border border-primary p-4 border-5 rounded"
          style={{ width: "22rem" }}
        >
          <Row>
            {showAlert && (
              <Alert variant="warning">
                No se an realizado cambios
              </Alert>
            )}
          </Row>
          <Button
            variant="warning"
            className="mr-3 mb-3"
            onClick={this.props.hideForm}
          >
            Cancelar
          </Button>
          <Row>
            {" "}
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Christopher Campos"
                onChange={(e) => this.handleInputChange("name", e.target.value)}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Christopher.Campos05@inacapmail.cl"
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
                type="text"
                placeholder="9 8721 3610"
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
                placeholder="Talca"
                onChange={(e) =>
                  this.handleAddressInputChange("city", e.target.value)
                }
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit" onClick={this.onFormSubmit}>
            Actualizar Contacto
          </Button>
        </Form>
      </Container>
    );
  }
}

export default UpdateContacto;
