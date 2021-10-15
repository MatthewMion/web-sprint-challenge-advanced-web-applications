import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import MutationObserver from "mutationobserver-shim";

import Article from "./Article";

const testArticle = {
  id: "aMqwd",
  headline: "headline",
  author: "author",
  createdOn: "10-15-21",
  summary: "summary",
  body: "body",
};
const testArticle2 = {
  id: "aMqwd",
  headline: "headline",
  author: "",
  createdOn: "10-15-21",
  summary: "summary",
  body: "body",
};
test("renders component without errors", () => {
  render(<Article article={testArticle} />);
});

test("renders headline, author from the article when passed in through props", () => {
  render(<Article article={testArticle} />);

  const headline = screen.getByTestId(/headline/i);
  const author = screen.getByTestId(/author/i);
  const summary = screen.getByTestId(/summary/i);
  const body = screen.getByTestId(/body/i);

  expect(headline).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(body).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', () => {
  render(<Article article={testArticle2} />);

  const headline = screen.getByTestId(/headline/i);
  const summary = screen.getByTestId(/summary/i);
  const body = screen.getByTestId(/body/i);
  const associatedPress = screen.getByText(/associated press/i);

  expect(associatedPress).toBeInTheDocument();
});

test("executes handleDelete when the delete button is pressed", () => {
  const mockDeleteFunction = jest.fn();
  render(<Article article={testArticle} handleDelete={mockDeleteFunction} />);
  const deleteButton = screen.getByTestId(/deletebutton/i);
  userEvent.click(deleteButton);

  expect(mockDeleteFunction).toBeCalledTimes(1);
});

//Task List:
//1. Complete all above tests. Create test article data when needed.
