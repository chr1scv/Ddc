import React from "react";
import { Button, Card, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import UpdateContacto from "./UpdateContacto";
class Contacto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false,
      hideCard: false,
    };
  }

  hideUpdateContactoForm = () => {
    this.setState({
      showUpdateForm: false,
      hideCard: false,
    });
  };

  handleContactoEdit = () => {
    this.setState({
      showUpdateForm: true,
      hideCard: true,
    });
  };

  handleDeleteContacto = (userId) => {
    let url = `https://jsonplaceholder.typicode.com/users/${userId}`;
    fetch(url, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        this.props.deleteContacto(userId);
      }
    });
  };

  render() {
    const { user, editContacto } = this.props;
    const { id, name, email, phone, address } = user;
    const { showUpdateForm, hideCard } = this.state;
    const ColoredLine = ({ color }) => (
      <hr
        style={{
          color: color,
          backgroundColor: color,
          height: 5,
        }}
      />
    );

    return (
      <>
        <Row>
          {" "}
          {showUpdateForm ? (
            <UpdateContacto
              updateContacto={editContacto}
              user={user}
              hideForm={this.hideUpdateContactoForm}
            />
          ) : null}
        </Row>
        {!hideCard && (
          <Row>
            <Card
              style={{ width: "22rem" }}
              className="mt-3"
              border="secondary"
            >
              <Card.Body>
                <Card.Title>Contactos</Card.Title>
              </Card.Body>
              <ColoredLine color="blue" />
              <Card.Body>
                <Button variant="primary" onClick={this.handleContactoEdit}>
                  Editar
                </Button>{" "}
                <Button
                  variant="dark"
                  onClick={() => this.handleDeleteContacto(id)}
                >
                  Eliminar
                </Button>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>N° : {id}</ListGroupItem>
                <ListGroupItem>Nombre : {name}</ListGroupItem>
                <ListGroupItem>Email : {email}</ListGroupItem>
                <ListGroupItem>Telefono : {phone}</ListGroupItem>
                <ListGroupItem>Direccion : {address.city}</ListGroupItem>
              </ListGroup>
            </Card>
          </Row>
        )}
      </>
    );
  }
}
export default Contacto;
