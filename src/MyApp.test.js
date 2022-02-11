import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./MyApp";

test("renders page with Submit button", () => {
  render(<App />);
  const linkElement = screen.getByText(/Submit/i);
  expect(linkElement).toBeInTheDocument();
});
