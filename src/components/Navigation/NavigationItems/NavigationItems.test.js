import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import React from 'react';


configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;
// each test run independently from others
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {

      expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});