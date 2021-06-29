import React, { useEffect, useState } from "react";
import { Container, Heading, Box, Image, Text } from "@chakra-ui/react";
import RelatedNewsList from "./RelatedNewsList";
import photo from "../../../../assets/Foto3.jpg";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { getDetailedNew, getNews } from "../newsService";
import { Link } from "react-router-dom";
import SkeletonDetail from "../../layout/SkeletonDetail";

function formatDate(newsDate) {
  const date = new Date(newsDate);
  return date.toLocaleDateString("es");
}

const DetailNews = () => {
  const [newsData, setNewsData] = useState("");
  const [arrayOfNews, setArrayOfNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    getDetailedNew(id)
      .then((res) => {
        setNewsData(res.data);
        getNews().then((res) => {
          setArrayOfNews(res.data);
          setLoading(false);
        });
      })
      .catch(() => alert("Error al cargar detalles."));
  }, [id]);

  if (loading) return <SkeletonDetail />;
  else
    return (
      <Container maxW="container.xl">
        <Box mb={20}>
          <Link
            to={`/novedades`}
            style={{ margin: "0", textDecoration: "none" }}
          >
            <Text
              m="2rem auto"
              maxW="900px"
              fontSize="1xl"
              textAlign="left"
              color="brandBlue.200"
              fontWeight={700}
            >
              🠔 Novedades
            </Text>
          </Link>
          <Image
            w="100%"
            maxW="900px"
            h="500px"
            m="auto"
            objectFit="cover"
            src={newsData.image}
            fallbackSrc={photo}
            alt={newsData.name}
          />
          <Box maxW="900px" m="2rem auto">
            <Text
              fontSize="1xl"
              textAlign="left"
              color="brandBlue.200"
              fontWeight={700}
            >
              {formatDate(newsData.created_at)}
            </Text>
            <Heading maxW="900px" size="2xl" textAlign="left" m="auto" mt={4}>
              {newsData.name}
            </Heading>
            <Box maxW="900px" m="auto" mt={6}>
              <Text textAlign="left">{parse(newsData.content)}</Text>
            </Box>
          </Box>
        </Box>
        <RelatedNewsList
          arrayOfNews={arrayOfNews}
          category={newsData.category_id}
          id={id}
        />
      </Container>
    );
};

export default DetailNews;
