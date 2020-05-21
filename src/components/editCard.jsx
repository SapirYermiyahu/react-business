import React from "react";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import CardService from "../services/cardService";
import { toast } from "react-toastify";
import cardService from "../services/cardService";
import "../css/signin.css";

class EditCard extends Form {
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
    _id: Joi.string(),
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

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    const { data } = await CardService.getCard(cardId);
    this.setState({ data: this.mapToViewModel(data) });
  }

  mapToViewModel(card) {
    return {
      _id: card._id,
      bizName: card.bizName,
      bizDescription: card.bizDescription,
      bizAddress: card.bizAddress,
      bizPhone: card.bizPhone,
      bizImage: card.bizImage,
    };
  }

  doSubmit = async () => {
    const { data } = this.state;
    await cardService.editCard(data);
    toast("Card is updated ");
    this.props.history.replace("/my-cards");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Edit Card Form" />
        <div className="row">
          <div className="form">
            <div className="col-lg-6">
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
                  {this.renderButton("Update Card")}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
