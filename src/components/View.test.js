import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import View from "./View";
import articleService from "../services/articleServices";
jest.mock("../services/articleServices.js");

const testArticlesNoText = [{}];
const testArticles = [
  {
    id: "1",
    headline: "headline",
    author: "author",
    createdOn: "10-15-21",
    summary: "summary",
    body: "body",
  },
  {
    id: "2",
    headline: "headline",
    author: "author",
    createdOn: "10-15-21",
    summary: "summary",
    body: "body",
  },
  {
    id: "3",
    headline: "headline",
    author: "author",
    createdOn: "10-15-21",
    summary: "summary",
    body: "body",
  },
];

test("renders zero articles without errors", async () => {
  articleService.mockResolvedValueOnce(testArticlesNoText);
  render(<View articles={testArticlesNoText} />);
  const article = await screen.queryByTestId(/article/i);
  expect(article).toBeNull();
});

test("renders three articles without errors", async () => {
  articleService.mockResolvedValueOnce(testArticles);
  render(<View />);
  const article = await screen.findAllByTestId(/article/i);

  expect(article).toHaveLength(3);
});

//Task List
//1. Complete the above two tests. Make sure to mocking the articleService call before rendering.
