import React from "react";
import {connect} from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import {} from "../../redux/cart/cart.selectors";

import "./cart-dropdown.styles.scss";

const CartDropDown = ({CartItems}) => (
    <div className="cart-dropdown">
        <div className="cart-items">
            {CartItems.map(cartItem => (
                <CartItem key={CartItem.id} item={cartItem}/>
            ))}
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

const mapStateToProps = ({cart: {cartItems}}) => ({
    CartItems: cartItems
});

export default connect(mapStateToProps)(CartDropDown);