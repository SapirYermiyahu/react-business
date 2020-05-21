import React, { Component } from "react";
import cardService from "../services/cardService";
import "../css/search.css";

class Search extends Component {
  state = {
    input: "",
    search: [],
    titles: [],
    titlesMatch: [],
  };

  sendData = (titlesMatch) => {
    this.props.getSearchCards(titlesMatch);
  };

  updateSearch = (event) => {
    let { titlesMatch } = this.state;
    let input = event.target.value;
    titlesMatch = [];

    this.setState({ titlesMatch });
    this.checkIncludes(input);
  };

  checkIncludes = (input) => {
    let { titles, titlesMatch } = this.state;
    if (!input) {
      titlesMatch = [...titles];
    } else {
      for (let y = 0; y < titles.length; y++) {
        let include = titles[y].toLowerCase().includes(input.toLowerCase());

        if (include) {
          titlesMatch.push(titles[y]);
        }
      }
    }

    this.sendData(titlesMatch);
  };

  setTitles = () => {
    let { search, titles } = this.state;
    for (let x = 0; x < search.length; x++) {
      titles.push(search[x].bizName);
    }
    this.setState({ titles });
  };

  async componentDidMount() {
    const { data } = await cardService.getAllCards();
    this.setState({ search: data });
    this.setTitles();
  }

  render() {
    return (
      <section className="search-bar">
        <div className="col-12">
          <div className="input-group mb-3">
            <input
              type="text"
              onChange={this.updateSearch}
              id="search-cards-field"
              className="form-control form-control-lg search"
              placeholder=" Search Business"
              style={{ fontFamily: "Arial" }}
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
