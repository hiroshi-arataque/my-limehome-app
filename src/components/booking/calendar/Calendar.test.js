import React from "react";
import { render } from "@testing-library/react";
import Calendar from "./Calendar";

it("should have check in check out date", () => {
  const { getByText } = render(
    <Calendar tempCheckInDate={"Apr 18"} tempCheckOutDate={"Apr 23"} />
  );

  expect(getByText("Apr 18")).toHaveTextContent("Apr 18");
  expect(getByText("Apr 23")).toHaveTextContent("Apr 23");
});

it("should have button disabled if no check-in/out dates", () => {
  const { getByText } = render(<Calendar tempCheckInDate={'Apr 18'}/>);

  expect(getByText("Confirm").closest('button')).toBeDisabled();
});

it("should have button enabled if there are check-in/out dates", () => {
  const { getByText } = render(<Calendar tempCheckInDate={'Apr 18'} tempCheckOutDate={'Apr 23'}/>);

  expect(getByText("Confirm").closest('button')).not.toBeDisabled();
});
