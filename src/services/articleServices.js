import axiosWithAuth from "../utils/axiosWithAuth";
import React, { useState } from "react";

const articleService = () => {
  const [articles2, setArticles2] = useState([]);

  axiosWithAuth()
    .get("http://localhost:5000/api/articles")
    .then((res) => {
      setArticles2(res.data);
      return articles2;
    })
    .catch((err) => console.error(err));
  //   console.log(articles);
};

export default articleService;

//Task List:
//1. Complete articleServices. This module should make an authenticated call and return an array of those articles.
