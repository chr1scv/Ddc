import React from "react";
import { Container, Button, Row, CardGroup, Col } from "react-bootstrap";

import Contacto from "./Contacto";
import ContactoForm from "./ContactoForm";
import { userApi } from "../API/url";
import Header from "./Header";

class ContactoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      showAddform: false,
      lastId: 10,
      lastDeletedIndex: -1,
    };
  }
  componentDidMount() {
    fetch(userApi)
      .then((res) => res.json())
      .then((users) => {
        console.log(users);

        this.setState({
          users: users,
        });
      });
  }

  toggleAddForm = (val) => {
    this.setState({
      showAddform: val,
    });
  };

  handleformSubmit = (user) => {
    const { users } = this.state;
    user.id = this.state.lastId + 1;
    let newArray = [...users];
    newArray.push(user);
    this.setState({
      showAddform: false,
      lastId: user.id,
      users: [...newArray],
    });
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "auto",
    });
  };

  handleUpdateContact = (user) => {
    const { users, lastDeletedIndex } = this.state;
    user.id = user.userId;
    let newArray = [...users];
    let length = newArray.length;
    let { lastId } = this.state;
    let diff = lastId - length;
    if (user.id <= lastDeletedIndex) {
      newArray[user.id - 1] = user;
    } else {
      newArray[user.id - diff - 1] = user;
    }
    console.log(newArray);
    this.setState({
      users: newArray,
    });
  };

  handleDeleteContacto = (userId) => {
    const { users } = this.state;

    const filteredItems = users.filter((item) => item.id !== userId);

    this.setState({
      users: filteredItems,
      lastDeletedIndex: userId - 1,
    });
  };
  render() {
    const { users, showAddform } = this.state;
    console.log(users);
    return (
      <>
        <Container>
          <Row>
            {" "}
            <Header />
          </Row>
          <Row className="float-left">
            <Button
              variant="primary"
              size="lg"
              onClick={() => this.toggleAddForm(!showAddform)}
            >
            Ingresa un nuevo Contacto
            </Button>
          </Row>
          <Row className="mb-3">
            {showAddform ? (
              <ContactoForm formSubmit={this.handleformSubmit} />
            ) : null}
          </Row>

          <Row className="d-flex justify-content-center">
            {users.map((user) => (
              <Col>
                <CardGroup>
                  <Contacto
                    key={user}
                    user={user}
                    deleteContacto={this.handleDeleteContacto}
                    editContacto={this.handleUpdateContacto}
                  />
                </CardGroup>
              </Col>
            ))}
          </Row>
        </Container>
      </>
    );
  }
}
export default ContactoList;
