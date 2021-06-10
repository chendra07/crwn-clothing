import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {withRouter} from "react-router-dom";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import {toggleCartHidden} from "../../redux/cart/cart.action.js";

import "./cart-dropdown.styles.scss";

//assets
import {ReactComponent as CartImage} from "../../assets/cart.svg";

const CartDropDown = ({cartItems, history, dispatch}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ?
                cartItems.map(cartItem => (
                    <CartItem key={CartItem.id} item={cartItem}/>
                ))
                :
                <div className="empty-cart">
                    <CartImage className="logo"/>
                    <span className="empty-message">Your cart is empty</span>
                </div>
            }
        </div>
        <CustomButton onClick={()=> {
            history.push("/checkout");
            dispatch(toggleCartHidden());
        }}>
            GO TO CHECKOUT
        </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropDown));