import React, { Component } from "react";
import { Container, Form, Button } from 'react-bootstrap';

class Recipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            authorID: "",
            comments: [],
            users: [],
            ingredients: [],
            recipeingredients: [],
        }
    }

    componentDidMount = () => {
        let recipeId = this.props.match.params.recipeID

        fetch('http://localhost:8000/cookbook/recipes/' + recipeId, {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    this.setState({ title: json.title, description: json.description, authorID: json.author })
                })
            },
            (error) => {
                console.log(error);
            }
        )

        fetch('http://localhost:8000/cookbook/comments/', {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    this.setState({ comments: json.results })
                })
            },
            (error) => {
                console.log(error);
            }
        )

        fetch('http://localhost:8000/cookbook/users/', {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    this.setState({ users: json.results })
                })
            },
            (error) => {
                console.log(error);
            }
        )

        fetch('http://localhost:8000/cookbook/recipeingredients', {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    let recipeingredients = []
                    for (let i = 0; i < json.results.length; i++) {
                        if (json.results[i].recipe == recipeId) {
                            recipeingredients.push(json.results[i])
                        }
                    }

                    this.setState({ recipeingredients: recipeingredients })
                })
            },
            (error) => {
                console.log(error);
            }
        )

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
    }
    render() {
        return (
            <Container>
                <h2>{this.state.title}</h2>
                <h3>Opis:</h3>
                <p>{this.state.description}</p>
                <h3>Składniki:</h3>
                {this.state.recipeingredients.map((recipeingredient) => {
                    return (
                        <div>
                            {this.state.ingredients.map((ingredient) => {
                                if (ingredient.id == recipeingredient.ingredient) {
                                    return (
                                        <div>
                                            <h4>Składnik: {ingredient.name}</h4>
                                            <p>Ilość: {recipeingredient.amount}g</p>
                                            <p>Węglowodany: {Math.round(ingredient.carbohydrates * recipeingredient.amount / 100, 2)}g</p>
                                            <p>Białka: {Math.round(ingredient.proteins * recipeingredient.amount / 100, 2)}g</p>
                                            <p>Tłuszcze: {Math.round(ingredient.fats * recipeingredient.amount / 100, 2)}g</p>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                    )
                })}
                <h3>Autor:</h3>
                {this.state.users.map((user) => {
                    if (user.id == this.state.authorID) {
                        return (
                            <p>{user.login}</p>
                        )
                    }
                })}
                <h3>Komentarze:</h3>
                {this.state.comments.map((comment) => {
                    if (comment.recipe == this.props.match.params.recipeID) {
                        return (
                            <div>
                                <p>{comment.content}</p>
                                {this.state.users.map((user) => {
                                    if (user.id == comment.author) {
                                        return (
                                            <small>{user.login}</small>
                                        )
                                    }
                                })}
                            </div>
                        )
                    }
                })}
            <br></br>
            <Form>
            <Form.Group controlId="comment">
                <Form.Label><h4>Dodaj komentarz</h4></Form.Label>
                <Form.Control type="text" placeholder="Komentarz" />
            </Form.Group>
            <Button variant="success" type="submit">
                Dodaj
            </Button>
            </Form>
            </Container>
        );
    }
}

export default Recipe;