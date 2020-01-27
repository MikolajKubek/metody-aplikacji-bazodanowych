import React, { Component } from "react";
import { Container, Form, Button } from 'react-bootstrap';

class AddIngredient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ingredients: [],
            recipes: [],
        }
    }

    componentDidMount = () =>{
        fetch('http://localhost:8000/cookbook/ingredients/', {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    this.setState({ ingredients: json.results })
                })
            },
            (error) => {
                console.log(error);
            }
        )


        fetch('http://localhost:8000/cookbook/recipes/', {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    this.setState({ recipes: json.results })
                })
            },
            (error) => {
                console.log(error);
            }
        )
    }
    

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group controlId="recipe">
                        <Form.Label>Przepis</Form.Label>
                        <Form.Control as="select">
                            {this.state.recipes.map((recipe)=>{
                               return( 
                               <option>{recipe.title}</option>
                               )
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="ingredients">
                        <Form.Label>Składnik</Form.Label>
                        <Form.Control as="select" multiple>
                        {this.state.ingredients.map((ingredient)=>{
                               return( 
                               <option>{ingredient.name}</option>
                               )
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label>Ilość</Form.Label>
                        <Form.Control type="number" placeholder="Ilość" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Dodaj
                    </Button>
                </Form>
            </Container>
        );
    }
}

export default AddIngredient;