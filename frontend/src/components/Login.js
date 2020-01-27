import React, { Component } from "react";
import { Container, Form, Button} from 'react-bootstrap';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            login: "",
            password: "",
        }
    }

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group controlId="login">
                        <Form.Label>Login</Form.Label>
                        <Form.Control type="email" placeholder="Login" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Hasło</Form.Label>
                        <Form.Control type="password" placeholder="Hasło" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Zaloguj
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default Login;