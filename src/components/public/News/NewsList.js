import React, { useState, useEffect } from "react";
import { Wrap, WrapItem } from "@chakra-ui/layout";
import { getNews } from "./newsService";
import SkeletonHome from "../layout/SkeletonHome";
import { LCard } from "../../Cards/LCard";

const NewsList = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState();
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getNews()
      .then((res) => {
        setNews(res.data);
        setLoading(true);
        setUpdate(false);
      })
      .catch(() => alert("Error al cargar novedades"));
  }, []);

  return loading ? (
    <Wrap
      direction="row"
      justify="center"
      spacing={10}
      paddingX="10px"
      paddingY={{ base: "6", sm: "12" }}
    >
      {news?.map((item) => (
        <WrapItem key={item.id}>
          <LCard
            image={item.image}
            title={item.name}
            text={item.content}
            postedOn={item.created_at}
            url="novedades"
            id={`${item.id}`}
            maxW="sm"
          />
        </WrapItem>
      ))}
    </Wrap>
  ) : (
    <SkeletonHome />
  );
};
export default NewsList;
