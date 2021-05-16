import React from "react";
import {Link} from "react-router-dom";
import {auth} from "../../firebase/firebase.utils";

//styling
import "./header.styles.scss";

//assets
import {ReactComponent as Logo} from "../../assets/crown.svg";


const Header = ({currentUser}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo"/>
        </Link>

        <div className="options">
            <Link className="option" to="/shop">SHOP</Link>
            <Link className="option" to="/shop">CONTACT</Link>
            {
                currentUser ?
                <div className="option" onClick={() => auth.signOut() }>SIGN OUT</div>
                :
                <Link className="option" to="/signInAndSignUp">LOGIN</Link>
            }
        </div>
    </div>
);

export default Header;