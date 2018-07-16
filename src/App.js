import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchUser } from "./actions";

class App extends Component {
  searchUser = e => this.props.fetchUser(e.target.value);
  render = () => {
    return (
      <div>
        <h2>Github Search</h2>
        <input placeholder="Username" onChange={this.searchUser} />
        <p>
          <img src={this.props.image} alt="Not Found" width={100} />
        </p>
      </div>
    );
  };
}

const mapStateToProps = state => ({ image: state.user.avatar_url });
const mapDispatchToProps = { fetchUser };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
