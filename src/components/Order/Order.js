import React from 'react';
import classes from './Order.css';

const order = (props) => {

    const ingredients = [];

    for (let ingredientsName in props.ingredients){
        ingredients.push({
            name: ingredientsName,
            amount: props.ingredients[ingredientsName]
        }
        )
    }

    const ingredientsOutput = ingredients.map(ig => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid grey',
                    padding: '5px'
                }}>{ig.name} ({ig.amount}) </span>
        )
    });

    return (
    <div className={classes.Order}>
        <p>Ingredients: {ingredientsOutput}</p>
        <p>Price: <strong>{Number.parseFloat(props.price).toFixed(2)} CAD</strong></p>
    </div>
)};
export default order;