import React from "react";
import { Link } from "@reach/router";
import { css } from "@emotion/core";
import colors from "./colors";

const NavBar = () => (
  <header
    css={css`
      background-color: ${colors.dark};
      position: sticky;
      top: 0;
      z-index: 10;
    `}
  >
    <Link to="/">Adopt Me!</Link>
    <Link to="/search-params">
      <span aria-label="search" role="img">
        🔍
      </span>
    </Link>
  </header>
);

export default NavBar;
