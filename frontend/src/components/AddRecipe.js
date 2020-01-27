import React, { Component } from "react";
import { Container, Form, Button} from 'react-bootstrap';

class AddRecipe extends Component {

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
                    <Form.Group controlId="title">
                        <Form.Label>Tytuł</Form.Label>
                        <Form.Control type="text" placeholder="Tytuł" />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Opis</Form.Label>
                        <Form.Control type="text" placeholder="Opis" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Dodaj Przepis
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default AddRecipe;