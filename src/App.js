import React from "react";
import {Switch, Route} from "react-router-dom";

//styling
import './App.css';

//component
import HomePage from "./Pages/homepage/homepage.component";
import ShopPage from "./Pages/shop/shop.component";
import SignInAndSignUpPage from "./Pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./Component/header/header.component";
import { auth } from "./firebase/firebase.utils";

class App extends React.Component {
constructor(){
  super();

  this.state = {
    currentUser: null
  };
}

unsubscribeFromAuth = null

componentDidMount() {
  this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
    this.setState({currentUser: user});
    console.log(user);
  })
}

componentWillUnmount() {
  this.unsubscribeFromAuth();
}

  render(){
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signInAndSignUp" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  
}

export default App;
