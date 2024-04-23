import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "./MyApp";

test("renders page with 'Choose your path'", () => {
  render(<App />);
  const linkElement = screen.getByText(/Choose/i);
  expect(linkElement).toBeInTheDocument();
});
