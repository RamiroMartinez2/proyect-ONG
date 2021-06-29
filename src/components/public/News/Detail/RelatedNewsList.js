import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { LCard } from "../../../Cards/LCard";

const RelatedNewsList = ({ arrayOfNews, category, id }) => {
  let relatedNews = arrayOfNews
    .filter((news) => news.category_id === category)
    .filter((related) => related.id !== parseInt(id));
  if (relatedNews.length === 0) {
    relatedNews = arrayOfNews.filter((related) => related.id !== parseInt(id));
  }
  console.log(relatedNews);

  return (
    <Box mb={12}>
      <Heading>Noticias relacionadas</Heading>
      <Flex wrap="wrap" gridGap="6%" justify="center" align="center">
        {relatedNews?.map((data) => (
          <Link
            to={`${data.id}`}
            key={data.id}
            style={{ margin: "0", textDecoration: "none" }}
          >
            <LCard image={data.image} title={data.name} id={data.id} url={'novedades'} maxW="15em" />
          </Link>
        ))}
      </Flex>
    </Box>
  );
};

export default RelatedNewsList;
