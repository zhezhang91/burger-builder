import  {BurgerBuilder} from './BurgerBuilder';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import  BuildControls from '../../components/Burger/BuildControls/BuildControls';
import React from 'react';


configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
    let wrapper;

    beforeEach( () => {
       wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
    });

    it('should render <BurgerControls/> when receiving burgerIngredients', () => {
        wrapper.setProps({ings: null});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});


