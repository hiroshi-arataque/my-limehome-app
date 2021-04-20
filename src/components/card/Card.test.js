import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

it("should show placeholder if no image", () => {
  const { getByRole } = render(<Card hotelInfo={{photo: null}}/>);
  expect(getByRole("img", { name: "limehome-placeholder.jpg"})).toBeVisible();
});

it("should show distance from city center", () => {
  const { getByText } = render(<Card hotelInfo={{distanceFromCityCenter: 1.5}}/>);
  expect(getByText("1.5 KM from the city Center")).toBeVisible();
});

it("should show rate", () => {
  const { getByText } = render(<Card index={1}/>);
  expect(getByText("€91")).toBeVisible();
});

it("should show button", () => {
  const { getByRole } = render(<Card />);
  expect(getByRole("button", { name: "Book"})).toBeVisible();
});
