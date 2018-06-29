import React,{Component} from 'react';
import Aux from '../../hoc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';


let INGREDIENTS_PRICES = null;

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: null,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: null
    };


    componentDidMount () {
        console.log(this.props);
        axios.get('https://react-zhe-burger.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
                console.log(response);
            })
            .catch(error => {
                this.setState({error: true})
            });

        axios.get('https://react-zhe-burger.firebaseio.com/price.json')
            .then(response => {
                INGREDIENTS_PRICES= response.data;
                console.log(response);
            })
            .catch(error => {
                this.setState({error: true})
            });

        axios.get('https://react-zhe-burger.firebaseio.com/totalprice.json')
            .then(response => {
                this.setState({totalPrice: response.data});
                console.log(response);
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum,el) => {
                return sum + el
            },0);
        this.setState({purchaseable: sum > 0});
    };

    AddIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
        this.updatePurchaseState(updatedIngredients);
    };

    RemoveIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        let newPrice = oldPrice - priceDeduction;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice,
        });
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler =() => {
        this.setState({purchasing: true})
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    };

    purchaseContinueHandler = () => {
        const queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }

        queryParams.push('price=' + this.state.totalPrice);

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryParams.join('&')
        });
    };

    render() {

        const disableInfo = {
            ...this.state.ingredients
        };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <=0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p> Ingredients can't loaded!</p>:<Spinner/>;

        if(this.state.ingredients && this.state.totalPrice){
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.AddIngredientHandler}
                    ingredientRemoved={this.RemoveIngredientHandler}
                    disabled={disableInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                                         cancel={this.purchaseCancelHandler}
                                         continue={this.purchaseContinueHandler}
                                         totalPrice={this.state.totalPrice}/>;
        }

        if(this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Model show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);