import React from "react";
import { useEffect, useState, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../context/DataProvider";

const Container = styled(Box)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50vw;
  height: 80vh;
  position: relative;
  top: 30px;
  left: 350px;
  box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const Heading = styled(Typography)`
  font-size: 30px;
  position: absolute;
  top: 2px;
  font-weight: bold;
`;

const Details = styled(Box)`
  position: absolute;
  left: 5px;
  top: 60px;
  display: flex;
  flex-direction: column;
  color: #878787;

`;

const DescriptionContainer = styled(Box)`
  margin-top: 140px;
  height: calc(70vh - 120px);
  width: 100%;
  overflow-y: auto;
  padding: 10px;
  box-sizing: border-box;
`;

const Description = styled(Typography)`
  margin: 2px;
`;

const Options = styled(Box)`
  position: absolute;
  top: 130px;
  left: 20px;
  display: flex;
  gap: 10px;
`;

const DetailView = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();
  const { account } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Container>
      <Heading>{post.title}</Heading>
      <Options>
        {account.username === post.username && (
          <>
            <Edit />
            <Delete />
          </>
        )}
      </Options>
      <Details>
        <Typography>- {post.username}</Typography>
        <Typography>{new Date(post.createdDate).toDateString()}</Typography>
      </Details>
      <DescriptionContainer>
        <Description>{post.description}</Description>
      </DescriptionContainer>
    </Container>
  );
};

export default DetailView;
