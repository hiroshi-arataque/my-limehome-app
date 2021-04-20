import React from "react";
import { render, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Form from "./Form";

it("should increment 1", () => {
  const { getByTestId, getByText } = render(<Form show={true}/>);

  userEvent.click(getByTestId('incrementer-control-plus'));

  expect(getByText("2 GUESTS")).toBeVisible();
  
});

it("should decrement 1", () => {
  const { getByTestId, getByText } = render(<Form show={true}/>);

  userEvent.click(getByTestId('incrementer-control-plus'));
  userEvent.click(getByTestId('incrementer-control-minus'));

  expect(getByText("1 GUEST")).toBeVisible();
  
});

it("should not decrement less than 1", () => {
  const { getByTestId, getByText } = render(<Form show={true}/>);

  userEvent.click(getByTestId('incrementer-control-minus'));

  expect(getByText("1 GUEST")).toBeVisible();
  
});

it("should not increment more than 15", () => {
  const { getByTestId, getByText } = render(<Form show={true}/>);

  for (let i = 0; i < 16; i++) {
    userEvent.click(getByTestId("incrementer-control-plus"));
  }

  expect(getByText("15 GUESTS")).toBeVisible();
});

it("should show calendar", () => {
  const { getByText, getByTestId } = render(<Form show={true}/>);

  userEvent.click(getByTestId("booking__date-placeholder"));

  expect(getByText("Choose Dates")).toBeVisible();
});

it("should have button disabled if no check-in/out dates", () => {
  const { getByText } = render(<Form show={true}/>);

  expect(getByText("Book Now").closest('button')).toBeDisabled();
});

it("should show placeholder if no image", () => {
  const { getByRole } = render(<Form show={true} hotelInfo={{photo: null}}/>);
  expect(getByRole("img", { name: "limehome-placeholder.jpg"})).toBeVisible();
});