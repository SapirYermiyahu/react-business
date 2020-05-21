import React, { Component } from "react";
import userService from "../services/userService";
import cardService from "../services/cardService";
import PageHeader from "../components/common/pageHeader";
import { toast } from "react-toastify";
import Card from "./card";
import Search from "./search";

class AllCards extends Component {
  state = {
    cards: [],
    favs: [],
    cardsBySearch: [],
    cardsArray: [],
  };

  getSearchCards = (data) => {
    let { cardsBySearch, cardsArray } = this.state;
    this.setState({ cards: cardsArray });
    cardsBySearch = [];
    for (let x = 0; x < data.length; x++) {
      for (let y = 0; y < cardsArray.length; y++) {
        if (data[x] === cardsArray[y].bizName) {
          cardsBySearch.push(cardsArray[y]);
        }
      }
    }
    this.setState({ cards: cardsBySearch });
  };

  doSubmit = async (cardId) => {
    let { data } = await userService.getMyFavsCards();
    const length = data.length;
    if (data.includes(cardId)) {
      data.splice(data.indexOf(cardId), 1);
    } else {
      data.push(cardId);
    }
    await userService.addFavs(data);
    this.setState({ favs: data });
    if (data.length > length) {
      toast("The card saved for you");
    } else {
      toast("The card removed from your favorites");
    }
  };

  async componentDidMount() {
    const { data } = await cardService.getAllCards();
    if (data.length > 0) this.setState({ cards: data });
    this.setState({ cardsArray: data });
  }

  render() {
    const { cards, favs } = this.state;
    const { user } = this.props;
    return (
      <div className="container">
        <PageHeader titleText="All Cards" />
        <div className="row">
          <Search getSearchCards={this.getSearchCards}></Search>
        </div>
        <div className="row">
          {cards.length > 0 &&
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                doSubmit={() => this.doSubmit(card._id)}
                user={user.biz}
                userId={user._id}
                favs={favs}
                getCardFunction={this.getCardFunction}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default AllCards;
