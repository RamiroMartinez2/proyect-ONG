import { Container, Flex } from "@chakra-ui/layout";
import React from "react";
import { ContactData } from "./ContactData";
import ContactForm from "./ContactForm";
import { useSelector } from "react-redux";
import GoogleMap from "./GoogleMap";
import Title from "../../Title/Title";
import photo from "../../../assets/Foto6.jpg";

export const Contact = () => {
  // Se obtienen los datos de contacto a traves del estado almacenado en Redux
  const data_contact = useSelector(
    (state) => state.organization.organizationData
  );

  return (
    <>
    <Title image={photo} title={"Contacto"} />
      <Container maxW="container.xl" mt={10}>
        <Flex flexWrap="wrap" justifyContent="space-evenly" mb={14}>
          <Flex flexWrap="wrap" justifyContent="space-evenly" mt={6} mb={14}>
            <ContactForm />
            <ContactData
              address={data_contact.address}
              cellphone={data_contact.cellphone}
              phone={data_contact.phone}
              facebook="Somos_Más"
              instagram="SomosMás"
              name="Somos Más"
            />
          </Flex>
          <GoogleMap />
        </Flex>
      </Container>
    </>
  );
};
