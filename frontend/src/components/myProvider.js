import React, { Component } from "react";

// import Overlay from "./overlay";
// import Login from "./login";

import CenterPop from "./centerPop";
import Login from "./login";

export const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    overlayStatus: [],

    account: {
      userId: null,
      name: null,
      email: null,
      username: null,
      contact: null,
      since: null,
      type: null,
      loggedIn: false,
    },
  };

  updateLoginFromLocalStorage() {
    const userId = localStorage.getItem("user_id");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    const contact = localStorage.getItem("contact");
    const since = localStorage.getItem("since");
    const type = localStorage.getItem("type");

    if (userId !== null)
      this.setState({
        account: {
          userId,
          name,
          email,
          username,
          contact,
          since,
          type,
          loggedIn: true,
        },
      });
  }
  componentDidMount() {
    this.updateLoginFromLocalStorage();
  }
  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          updateAccountState: (
            userId,
            name,
            email,
            username,
            contact,
            since,
            type,
            loggedIn
          ) => {
            this.setState({
              account: {
                userId,
                name,
                email,
                username,
                contact,
                since,
                type,
                loggedIn,
              },
            });
          },
          OPEN_OVERLAY: (component, title) => {
            this.setState({
              overlayStatus: <CenterPop html={component} title={title} />,
            });
          },
          CLOSE_OVERLAY: () => {
            this.setState({ overlayStatus: [] });
          },
          LOG_ME_OUT: () => {
            this.setState({
              account: { userId: "", name: "", loggedIn: false },
            });

            localStorage.removeItem("user_id");
            localStorage.removeItem("name");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("since");
            localStorage.removeItem("contact");
            localStorage.removeItem("type");

            this.setState({
              overlayStatus: <CenterPop html={<Login />} title="LOGIN" />,
            });
          },
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
