import React, { useState, useEffect } from "react";
import styled from "styled-components";
import articleService from "../services/articleServices";
import Article from "./Article";
import EditForm from "./EditForm";
import axiosWithAuth from "../utils/axiosWithAuth";

const View = (props) => {
  const [articles, setArticles] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState();

  // useEffect(() => {
  //   const getArticles = async () => {
  //     const newArticles = await articleService();
  //     setArticles(newArticles);
  //   };
  //   getArticles();
  // }, [articles]);

  useEffect(() => {
    articleService()
      .then((articles) => {
        setArticles(articles);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== +id));
  };
  const handleDelete = (id) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/articles/${id}`)
      .then((res) => {
        deleteArticle(id);
        setArticles(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (article) => {
    axiosWithAuth()
      .put(`http://localhost:5000/api/articles/${article.id}`, article)
      .then((res) => {
        setArticles(res.data);
        setEditing(false);
      })
      .catch((err) => console.error(err));
  };

  const handleEditSelect = (id) => {
    setEditing(true);
    setEditId(id);
  };

  const handleEditCancel = () => {
    setEditing(false);
  };

  return (
    <ComponentContainer>
      <HeaderContainer>View Articles</HeaderContainer>
      <ContentContainer flexDirection="row">
        <ArticleContainer>
          {articles.map((article) => {
            return (
              <ArticleDivider key={article.id}>
                <Article
                  key={article.id}
                  article={article}
                  handleDelete={handleDelete}
                  handleEditSelect={handleEditSelect}
                />
              </ArticleDivider>
            );
          })}
        </ArticleContainer>

        {editing && (
          <EditForm
            editId={editId}
            handleEdit={handleEdit}
            handleEditCancel={handleEditCancel}
          />
        )}
      </ContentContainer>
    </ComponentContainer>
  );
};

export default View;

//Task List:
//1. Build and import axiosWithAuth module in the utils.
//2. When the component mounts, make an http request that adds all articles to state.
//3. Complete handleDelete method. It should make a request that delete the article with the included id.
//4. Complete handleEdit method. It should make a request that updates the article that matches the included article param.

const Container = styled.div`
  padding: 0.5em;
`;
const HeaderContainer = styled.h1`
  border-bottom: solid black 2px;
  padding: 1em;
  margin: 0;
  font-size: 1.5em;
  background: black;
  color: white;
`;

const ArticleDivider = styled.div`
  border-bottom: 1px solid black;
  padding: 1em;
`;

const ComponentContainer = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
`;

const ArticleContainer = styled.div`
  background: grey;
`;