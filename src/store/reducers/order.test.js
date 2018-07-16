import reducer from './order';
import * as actionTypes from '../actions/actionTypes';

describe('order reducer', () => {
    it('should return the init state', () => {
        expect(reducer(undefined, {})).toEqual({
            orders: [],
            loading: false,
            purchased: false
        })
    });

    it('should store the orders received', () => {
        expect(reducer({
            orders: [],
            loading: false,
            purchased: false
        }, {
            type: actionTypes.FETCH_ORDERS_SUCCESS,
            orders: [{salad: 0}],
            loading: false
        })).toEqual({
            orders: [{salad: 0}],
            loading: false,
            purchased: false
        })
    })
});