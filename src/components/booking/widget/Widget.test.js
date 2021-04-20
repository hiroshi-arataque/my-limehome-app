import React from "react";
import { render } from "@testing-library/react";
import Widget from "./Widget";

it("should equal to 1 GUEST", () => {
  const { getByText } = render(<Widget counter={1}/>);
  expect(getByText("1 GUEST")).toBeVisible();
});

it("should equal to 2 GUESTS", () => {
  const { getByText } = render(<Widget counter={2}/>);
  expect(getByText("2 GUESTS")).toBeVisible();
});
