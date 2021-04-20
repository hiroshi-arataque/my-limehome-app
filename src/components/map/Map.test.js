import React from "react";
import { render } from "@testing-library/react";
import Map from "./Map";

it("should show loading maps message", () => {
  const jsdomAlert = window.alert;  // remember the jsdom alert
  window.alert = () => {};  // provide an empty implementation for window.alert

  const { getByText } = render(<Map />);

  expect(getByText("Loading Maps")).toBeVisible();
  window.alert = jsdomAlert;  // restore the jsdom alert
});
