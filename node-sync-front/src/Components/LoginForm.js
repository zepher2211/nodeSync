import React from "react";
import socketIO from "socket.io-client";
import {
  Button,
  Form,
  Message,
  Container,
  Header,
  Icon
} from "semantic-ui-react";

export default class LoginForm extends React.Component {
  fetchData = e => {
    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: e.target[0].value, //replace this by event target value
        password: e.target[1].value //replace this by event target value
      })
    })
      .then(res => res.json())
      .then(user => {
        const io = socketIO("http://localhost:8080/", {
          transportOptions: {
            pooling: {
              //send extra headers to socket-io
              extraHeaders: {
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
                Authorization: `Bearer ${user.token}`
              }
            }
          }
        });
      });
  };

  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: "#262626"
        }}
      >
        <div
          style={{
            position: "relative",
            top: "30%",
            left: "30%",
            height: "40%",
            width: "40%",
            border: "solid 1px black",
            backgroundColor: "#151515",
            borderRadius: "5px"
          }}
        >
          <Container
            style={{
              position: "absolute",
              right: "50%",
              padding: "15px",
              width: "50%",
              top: "25%"
            }}
          >
            <Header style={{ fontSize: "30px", color: "#586e77" }} as="h1" icon>
              <Icon name="sync alternate" />
              NodeSync
              <Header.Subheader style={{ color: "#8c8c8c" }}>
                Collaborative text editing
              </Header.Subheader>
            </Header>
          </Container>
          <Container
            style={{
              position: "absolute",
              left: "50%",
              top: "0%",
              padding: "15px",
              height: "100%",
              width: "50%",
              overflow: "auto",
              textAlign: "left"
            }}
          >
            <Message
              style={{
                backgroundColor: "#8c8c8c"
              }}
            >
              <Form>
                <Form.Field>
                  <label>Username</label>
                  <input placeholder="Username" />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input placeholder="Password" />
                </Form.Field>
                <Button type="submit">Log In</Button>
              </Form>
            </Message>
            <Message
              style={{
                backgroundColor: "#8c8c8c"
              }}
            >
              <Message.Header>Not a registered user?</Message.Header>
              <p>Click this button to sign up.</p>
              <Button>Sign Up</Button>
            </Message>
          </Container>
        </div>
      </div>
    );
  }
}
