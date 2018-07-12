import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as orderActions from '../../../store/actions/index';


class ContactData extends Component {

    state = {
        orderForm: {
                name:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '', // bug to be fixed
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                                {value: 'fastest',displayValue: 'Fastest'},
                                {value: 'cheapest', displayValue: 'Cheapest'}
                            ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
            },
        },
        formIsValid: false,
    };

    checkValidity(value, rules) {
        let isValid = true;

        if(!rules) {
            return true;
        }

        if (rules.required) {
         isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    orderHandler = (event) => {
        // do not want to reload page
        event.preventDefault();
        // console.log(this.props.ingredients);
        const formData = {};
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };
        this.props.onOrderBurger(order);


    };

    inputChangedHandler = (event,inputID) => {
        //console.log(event.target.value);
        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedValue= {...updatedForm[inputID]};

        updatedValue.value = event.target.value;
        updatedValue.valid = this.checkValidity(updatedValue.value, updatedValue.validation);
        updatedValue.touched = true;
        console.log(updatedValue);
        updatedForm[inputID] = updatedValue;

        let formIsValid = true;
        for (let inputID in updatedForm ) {
            formIsValid = updatedForm[inputID].valid && formIsValid;
        }


        this.setState({orderForm: updatedForm, formIsValid: formIsValid})
    };

    render() {

        const orderForm = this.state.orderForm;

        const newOrderForm = [];

        for(let key in orderForm){
            // console.log(key);
            newOrderForm.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {newOrderForm.map( item => (
                    <Input key={item.id}
                           elementType={item.config.elementType}
                           elementConfig={item.config.elementConfig}
                           label={item.id}
                           changed={(event) => this.inputChangedHandler(event,item.id)}
                           invalid={!item.config.valid}
                           shouldValidate={item.config.validation}
                           touched={item.config.touched}
                           />
                    )
                )}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER NOW!</Button>
            </form>
        );

        if(this.props.loading){
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Please in put your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurgerBegin(orderData))
    }
};



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData, axios));