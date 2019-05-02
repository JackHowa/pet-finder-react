import React from "react";
import { create } from "react-test-renderer";
import Details from "../Details";

test("snapshot", () => {
  // if anything changes, then will fail
  // prevents regressions
  // use -u to update
  const c = create(<Details />);
  expect(c.toJSON()).toMatchSnapshot();
});

test("shows modal when toggle modal", () => {
  const c = create(<Details search={() => {}} />);
  const instance = c.getInstance();

  expect(instance.state.showModal).toBe(false);
  instance.toggleModal();
  expect(instance.state.showModal).toBe(true);
});
