import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm: {
                name:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: ''
                },
                street:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: ''
                },
                zipCode:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your ZIP Code'
                    },
                    value: ''
                },
                country:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Country'
                    },
                    value: ''
                },
                email:{
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: ''
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                                {value: 'fastest',displayValue: 'Fastest'},
                                {value: 'cheapest', displayValue: 'Cheapest'}
                            ]
                    },
                    value: ''
            },
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);
        this.setState({loading: true});
        const formDate = {};
        for (let formElementId in this.state.orderForm) {
            formDate[formElementId]=this.state.orderForm[formElementId].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderDate: formDate
        };

        axios.post('/order.json',order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false})
            })
    };

    inputChangedHandler = (event,inputID) => {
        //console.log(event.target.value);
        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedValue= {...updatedForm[inputID]};

        updatedValue.value = event.target.value;

        updatedForm[inputID] = updatedValue;

        this.setState({orderForm: updatedForm})
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
                           />
                    )
                )}
                <Button btnType="Success">ORDER NOW!</Button>
            </form>
        );

        if(this.state.loading){
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

export default ContactData;