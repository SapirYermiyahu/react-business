import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import "../css/about.css";

class About extends Component {
  state = {};

  signUp = () => {
    this.props.history.replace("/signup");
  };

  signUpBusiness = () => {
    this.props.history.replace("/biz-signup");
  };

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <PageHeader
            titleText="About Us"
            paragraph="Our app created for people that love comfortable life by finding new business easily"
          ></PageHeader>
          <h2>You can find in our app business for : </h2>
          <div className="wrapper">
            <div className="box-area">
              <div className="box1"></div>
              <div className="box2"></div>
              <div className="box3"></div>
              <div className="box4"></div>
              <div className="box5"></div>
              <div className="box6"></div>
            </div>
          </div>

          <div className="zigzag"></div>

          <h2 style={{ fontWeight: "bold" }}>Our Motto : </h2>
          <h3>Easy searching, Easy life</h3>
          <p style={{ border: "3px dashed rgb(240, 175, 212)" }}>
            We belive that our customers need to find the data they are looking
            for in the minimum time, <br /> we want make people's life easier
            and save time. <br /> We created this app to enable people to enjoy
            user experience and business to advertise themselves easily and
            free. <br /> Hope you will enjoy!
            <br />
            <br />
          </p>
          {!this.props.user && (
            <div style={{ textAlign: "center", margin: "50px" }}>
              <h3>So , What are you waiting for ? </h3>
              <input
                type="button"
                className="btn btn-secondary"
                value="Sign up as user!"
                style={{ width: "80%", margin: "20px" }}
                onClick={this.signUp}
              />

              <input
                type="button"
                className="btn"
                value="Sign up as business!"
                style={{
                  width: "80%",
                  margin: "20px",
                  backgroundColor: "rgb(240, 175, 212)",
                }}
                onClick={this.signUpBusiness}
              />
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default About;
