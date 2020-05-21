import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/card.css";
import userService from "../services/userService";

class Card extends Component {
  state = {
    user: {},
    data: [],
    favs: [],
  };
  buttonClass(cardId) {
    const { data } = this.state;
    let classes = "btn btn-sm ";
    classes += data.includes(cardId)
      ? "fas fa-heart fa-2x"
      : "far fa-heart fa-2x";
    return classes;
  }

  async componentDidMount() {
    let { data } = await userService.getMyFavsCards();
    this.setState({ data });
  }

  render() {
    const { card, doSubmit, userId } = this.props;
    const { user } = this.props;
    return (
      <div className="col-md-6 col-lg-4 mt-3">
        <div className="card">
          <div className="card-image">
            <img
              className="p-2"
              src={card.bizImage}
              width="100"
              alt={card.bizName}
            />
          </div>
          <div className="card-body card-text">
            <h2 className="card-title">{card.bizName}</h2>
            <p className="card-text">{card.bizDescription}</p>
            <p className="card-text border-top pt-2">
              <b>Tel: </b>
              {card.bizPhone}
              <br />
              {card.bizAddress}
            </p>

            {user && userId === card.user_id && (
              <Link to={`/my-cards/edit/${card._id}`}>Edit</Link>
            )}
            {user && userId === card.user_id && (
              <Link className="ml-2" to={`/my-cards/delete/${card._id}`}>
                Delete
              </Link>
            )}
          </div>
          {!user && (
            <div className="card-stats">
              <div className="stat">
                <div className="value" style={{ justifyContent: "center" }}>
                  <button
                    onClick={() => {
                      doSubmit();
                      this.buttonClass();
                    }}
                    className="btn-card"
                  >
                    <i className={this.buttonClass(card._id)}></i>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
