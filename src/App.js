import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
//styling
import './App.css';

//component
import HomePage from "./Pages/homepage/homepage.component";
import ShopPage from "./Pages/shop/shop.component";
import SignInAndSignUpPage from "./Pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./Component/header/header.component";
import CheckoutPage from "./Pages/checkout/checkout.component";


//redux
import {setCurrentUser} from "./redux/user/user.actions";
import {selectCurrentUser} from "./redux/user/user.selector";
import {selectCollectionForPreview} from "./redux/shop/shop.selectors";

class App extends React.Component {
unsubscribeFromAuth = null

componentDidMount() {
  const {setCurrentUser} = this.props;


  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
        // console.log(this.state);
    }
    setCurrentUser(userAuth);
    // addCollectionAndDocuments("collections", collectionArray.map(({title, items}) => ({title, items})));
  });
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signInAndSignUp" render={() => this.props.currentUser ? (<Redirect to="/"/>) : <SignInAndSignUpPage/>} />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);
