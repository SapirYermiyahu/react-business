import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";
import "../css/signin.css";

class Signin extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: ex.response.data } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) return <Redirect to="/all-cards" />;

    return (
      <div className=" content-center">
        <PageHeader titleText="Sign in and find new business" />
        <div className="form">
          <div className="contain">
            <div className="row">
              <div className="col-lg-12">
                <form
                  onSubmit={this.handleSubmit}
                  autoComplete="off"
                  method="POST"
                >
                  <div className="text-box">
                    {this.renderInput("email", "Email", "email")}
                  </div>
                  <div className="text-box">
                    {this.renderInput("password", "Password", "password")}
                  </div>
                  <div className="btn-forms">{this.renderButton("Signin")}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
