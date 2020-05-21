import React, { Component } from "react";
import PageHeader from "./common/pageHeader.jsx";
import Card from "./card";
import cardService from "../services/cardService";
import userService from "../services/userService";
import { toast } from "react-toastify";

class FavCards extends Component {
  state = {
    favsShown: [],
    data: [],
  };

  doSubmit = async (cardId) => {
    let { data } = this.state;
    data.splice(data.indexOf(cardId), 1);
    await userService.addFavs(data);
    this.setState({ data });
    toast("The card removed from your favorites");
  };

  async componentDidMount() {
    let { favsShown } = this.state;
    let { data } = await userService.getMyFavsCards();
    this.setState({ data });
    let favsArray = data;
    if (favsArray.length > 0) {
      for (let x = 0; x <= favsArray.length; x++) {
        let { data } = await cardService.getCard(favsArray[x]);
        if (data) {
          favsShown.push(data);
          this.setState({ favsShown });
        }
      }
    }
  }

  render() {
    const { favsShown } = this.state;
    return (
      <div>
        <div className="container">
          <PageHeader titleText="My Favorite Cards" />
          <div className="row">
            <div className="col-12">
              <p>You have {favsShown.length} Favorite Cards</p>
            </div>
          </div>
          <div className="row">
            {favsShown.map((fav) => (
              <Card
                onHandleFavs={() => this.onHandleFavs(fav.id)}
                key={fav._id}
                card={fav}
                favs={favsShown}
                doSubmit={() => this.doSubmit(fav._id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default FavCards;
