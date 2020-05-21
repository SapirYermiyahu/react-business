import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import "../css/signin.css";

class CreateCard extends Form {
  state = {
    data: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    errors: {},
  };

  schema = {
    bizName: Joi.string().min(2).max(255).required(),
    bizDescription: Joi.string().min(2).max(1024).required(),
    bizAddress: Joi.string().min(2).max(400).required(),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/),
    bizImage: Joi.string().min(11).max(1024).uri().allow(""),
  };

  doSubmit = async () => {
    const { data } = this.state;
    if (!data.bizImage) delete data.bizImage;
    await cardService.createCard(this.state.data);
    toast("A new card is opened");
    this.props.history.replace("/my-cards");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Business Registration Form" />
        <div className="row">
          <div className="col-12">
            <b>
              <p>Open business card</p>
            </b>
          </div>
        </div>
        <div className="row">
          <div className="form" style={{ height: "900" }}>
            <div className="col-lg-8">
              <form
                onSubmit={this.handleSubmit}
                autoComplete="off"
                method="POST"
              >
                <div className="text-box">
                  {this.renderInput("bizName", "Business Name")}
                </div>
                <div className="text-box">
                  {this.renderInput("bizDescription", "Business Description")}
                </div>
                <div className="text-box">
                  {this.renderInput("bizAddress", "Business Address")}
                </div>
                <div className="text-box">
                  {this.renderInput("bizPhone", "Business Phone")}
                </div>
                <div className="text-box">
                  {this.renderInput("bizImage", "Business Image")}
                </div>
                <div className="btn-forms">
                  {this.renderButton("Create Card")}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
