import React, { lazy, Suspense } from "react";
import { render } from "react-dom";
import { Router } from "@reach/router";
import { Provider } from "react-redux";

import Results from "./Results";
import NavBar from "./NavBar";
import store from "./store";

const SearchParams = lazy(() => import("./SearchParams"));
const Details = lazy(() => import("./Details"));

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Suspense fallback={<h1>loading route …</h1>}>
          <Provider store={store}>
            <Router>
              <Results path="/" />
              <SearchParams path="/search-params" />
              <Details path="/details/:id" />
            </Router>
          </Provider>
        </Suspense>
      </div>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
