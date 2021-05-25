import React from "react";
import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

//styling
import './App.css';

//component
import HomePage from "./Pages/homepage/homepage.component";
import ShopPage from "./Pages/shop/shop.component";
import SignInAndSignUpPage from "./Pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./Component/header/header.component";
import { auth, createUserProfileDocument  } from "./firebase/firebase.utils";

//redux
import {setCurrentUser} from "./redux/user/user.actions";

class App extends React.Component {
unsubscribeFromAuth = null

componentDidMount() {
  const {setCurrentUser} = this.props

  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if(userAuth){
      const userRef = await createUserProfileDocument(userAuth);
      userRef.onSnapshot(snapShot => {
        setCurrentUser ({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
        // console.log(this.state);
    }else{
      setCurrentUser({userAuth});
    }
    // console.log(user);
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
          <Route exact path="/signInAndSignUp" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
  
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(null, mapDispatchToProps)(App);
