import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";

class Signup extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    data.biz = false;

    try {
      await http.post(`${apiUrl}/users`, data);
      toast("A new acoount is opened");
      this.props.history.replace("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email is taken" } });
      }
    }
  };

  render() {
    return (
      <div className=" content-center">
        <PageHeader titleText="Signup to Busieasy" />
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
                  <div className="text-box">
                    {this.renderInput("name", "Name")}
                  </div>
                  <div className="btn-forms">{this.renderButton("Signup")}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
