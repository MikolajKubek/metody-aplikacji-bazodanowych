import React, { Component } from "react";
import { Container, Row } from 'react-bootstrap';

class RecipeList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            recipes: []
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:8000/cookbook/recipes/', {
            method: "GET",
            crossDomain: true,
            async: true,
            mode: 'cors',
        }).then(
            (response) => {
                response.json().then((json) => {
                    console.log(json.results)
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
                <Row>
                    <h2>Przepisy:</h2>
                </Row>
                {this.state.recipes.map((item) => {
                    return (
                        <div className="list-item" key={item.id} onClick={(event) => {
                            this.props.history.push('recipe/' + item.id)
                        }}>
                            <h4>{item.title}</h4>
                            <p>{item.description}</p>
                        </div>
                    )
                })}
            </Container>
        );
    }
}

export default RecipeList;