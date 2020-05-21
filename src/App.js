import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import About from "./components/about";
import Signup from "./components/signup";
import Signin from "./components/signin";
import Logout from "./components/logout";
import BizSignup from "./components/bizSignup";
import CreateCard from "./components/createCard";
import MyCards from "./components/myCards";
import EditCard from "./components/editCard";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import ProtectedRoute from "./components/common/protectedRoute";
import DeleteCard from "./components/deleteCard";
import AllCards from "./components/allCards";
import FavCards from "./components/favCards";

class App extends Component {
  state = {
    favs: [],
    user: {},
  };

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <header>
          <Navbar user={user} />
        </header>
        <main style={{ minHeight: 1000 }}>
          <Switch>
            <ProtectedRoute
              path="/my-cards/delete/:id"
              component={DeleteCard}
              biz={true}
            />
            <ProtectedRoute
              path="/my-cards/edit/:id"
              component={EditCard}
              biz={true}
            />
            <ProtectedRoute
              path="/my-cards"
              render={(props) => <MyCards {...props} user={user} />}
              biz={true}
            />
            <ProtectedRoute
              path="/create-card"
              component={CreateCard}
              biz={true}
            />
            <Route path="/favorites" component={FavCards} />
            <Route
              path="/all-cards"
              render={(props) => <AllCards {...props} user={user} />}
            />

            {/*   <Route path="/all-cards" component={AllCards}  />  */}
            <Route path="/biz-signup" component={BizSignup} />
            <Route path="/logout" component={Logout} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route
              path="/"
              render={(props) => <About {...props} user={user} />}
            />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
