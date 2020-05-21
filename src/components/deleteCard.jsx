import React from "react";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
/* import userService from "../services/userService"; */
import { toast } from "react-toastify";
import "../css/signin.css";
class DeleteCard extends Form {
  state = {
    users: {},
  };
  handleCancel = () => {
    this.props.history.push("/my-cards");
  };

  schema = {};

  doSubmit = async () => {
    const cardId = this.props.match.params.id;
    await cardService.deleteCard(cardId);
    toast("Your card deleted");
    this.props.history.replace("/my-cards");
  };
  /* 
  async componentDidMount() {
    let users = await userService.getUsers();
    console.log(users);
  }
 */
  render() {
    return (
      <div className="container">
        <PageHeader titleText=" Are you sure you want to delete this card ?" />
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 d-flex justify-content-center ">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              method="POST"
              style={{ textAlign: "center" }}
            >
              <div
                className="btn  mb-5"
                style={{ background: "rgb(240, 175, 212)" }}
              >
                {this.renderButton("Delete Card")}
              </div>

              <div
                className="btn btn-secondary mb-5"
                onClick={this.handleCancel}
              >
                {this.renderButton("Cancel")}
              </div>

              {/*  <div>
                <button
                  onClick={this.handleCancel}
                  className="btn btn-secondary ml-2 mb-5"
                  style={{ float: "left;" }}
                >
                  Cancel
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default DeleteCard;
