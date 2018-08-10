import React, { Component } from "react";
import Aux from "../../../hoc/Auxx";
import Button from "../../UI/Button/Button";

class orderSummary extends Component {
  //This can be a functional component

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          The total price is <strong>{this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <p>Continue to CheckOut?</p>
        <Button btnType="Danger" clicked={this.props.cancel}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.continue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default orderSummary;
