import { render } from '@testing-library/react';
import App from './App';

it("should have logo", () => {
  const jsdomAlert = window.alert;  // remember the jsdom alert
  window.alert = () => {};  // provide an empty implementation for window.alert
  
  const { getByRole } = render(<App />);

  expect(getByRole("img", { name: "logo" })).toBeVisible();
  window.alert = jsdomAlert;  // restore the jsdom alert
});

it("should have burger-icon", () => {
  const jsdomAlert = window.alert;  // remember the jsdom alert
  window.alert = () => {};  // provide an empty implementation for window.alert
  
  const { getByRole } = render(<App />);

  expect(getByRole("img", { name: "navMenu" })).toBeVisible();
  window.alert = jsdomAlert;  // restore the jsdom alert
});
