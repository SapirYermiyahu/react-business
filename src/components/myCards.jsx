import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import Card from "./card";

class MyCards extends Component {
  state = {
    cards: [],
  };

  async componentDidMount() {
    const { data } = await cardService.getMyCards();
    if (data.length > 0) this.setState({ cards: data });
  }

  addCard = () => {
    this.props.history.replace("/create-card");
  };

  render() {
    const { cards } = this.state;
    const { user } = this.props;

    return (
      <div className="container">
        <PageHeader titleText="My Cards Page" />
        <p>You have {cards.length} Cards</p>
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 col-xs-12 ">
            <span className="ml-2 btn ">
              <input
                type="button"
                className="btn btn-secondary"
                value="+Add Card"
                /*     style={{ width: "35%", margin: "20px" }} */
                onClick={this.addCard}
              />
            </span>
          </div>
        </div>
        <div className="row">
          {cards.length > 0 &&
            cards.map((card) => (
              <Card key={card._id} card={card} user={user} userId={user._id} />
            ))}
        </div>
      </div>
    );
  }
}

export default MyCards;
