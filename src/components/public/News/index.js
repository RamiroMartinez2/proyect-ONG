import { Container } from "@chakra-ui/react";
import NewsList from "./NewsList";
import Title from "../../Title/Title";
import photo from "../../../assets/Foto8.jpg";

const News = () => {
  return (
    <>
      <Title image={photo} title={"Novedades"} />
      <Container maxW="container.xl" w="100%">
        <NewsList />
      </Container>
    </>
  );
};
export default News;
