import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionIcon,
  AccordionButton,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
import { NavLink } from "./Header";

const Sections = [
  {
    name: "Novedades",
    routes: [
      {
        route: "/backoffice/news",
        name: "Listar novedades",
      },
      {
        route: "/backoffice/news/create",
        name: "Crear novedad",
      },
    ],
  },
  {
    name: "Actividades",
    routes: [
      {
        route: "/backoffice/activities",
        name: "Listar actividades",
      },
      {
        route: "/backoffice/activities/create",
        name: "Crear actividad",
      },
    ],
  },
  {
    name: "Testimonios",
    routes: [
      {
        route: "/backoffice/testimonials",
        name: "Listar testimonios",
      },
      {
        route: "/backoffice/testimonials/create",
        name: "Crear testimonio",
      },
    ],
  },
  {
    name: "Miembros",
    routes: [
      {
        route: "/backoffice/members",
        name: "Listar miembros",
      },
      {
        route: "/backoffice/members/create",
        name: "Crear miembro",
      },
    ],
  },
  {
    name: "Categorías",
    routes: [
      {
        route: "/backoffice/categories",
        name: "Listar categorías",
      },
      {
        route: "/backoffice/categories/create",
        name: "Crear categorías",
      },
    ],
  },
  {
    name: "Slides",
    routes: [
      {
        route: "/backoffice/slides",
        name: "Listar slides",
      },
      {
        route: "/backoffice/slides/create",
        name: "Crear slide",
      },
    ],
  },
  {
    name: "Users",
    routes: [
      {
        route: "/backoffice/users",
        name: "Listar Users",
      },
      {
        route: "/backoffice/users/create",
        name: "Crear user",
      },
    ],
  },
  {
    name: "Organización",
    routes: [
      {
        route: "/backoffice/organization",
        name: "Ver organización",
      },
      {
        route: "/backoffice/organization/edit",
        name: "Editar organización",
      },
    ],
  },
  {
    name: "Backoffice",
    routes: [
      {
        route: "/backoffice",
        name: "Ver backoffice",
      },
      {
        route: "/backoffice/homeEdition",
        name: "Editar backoffice",
      },
    ],
  },
];

const Sidebar = () => {
  const router = useHistory()
  // const [open, setopen] = React.useState(false);


  return (
    <>
      <Box
        w="250px"
        py="2rem"
        height="100vh"
        overflowY="auto"
        borderRight="solid thin lightgray"
        bg="white"
        zIndex={100}
        position="fixed"
        transition="left 1s ease"
        left={"0"}
        top="0"
      >
        <Accordion allowToggle allowMultiple>
          <Box m=".6rem" onClick={()=>{router.push("/backoffice")}} cursor="pointer">
            <img
              src="/brand-logo.svg"
              style={{ margin: "auto" }}
              width="150px"
              alt="Somos más logo"
            />
            <Text fontSize="3xl" borderBottom="solid 0 lightgray">
              Somos Más
            </Text>
          </Box>

          {/* This section shows the backoffice navigation links */}
          {Sections.map((section) => (
            <AccordionItem key={section.name}>
              <AccordionButton bg="gray.100" _hover={{ background: "#9AC9FB" }}>
                <Box flex="1" textAlign="left">
                  {section.name}
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel
                pb={4}
                pl="2rem"
                display="flex"
                textAlign="left"
                flexDirection="column"
              >
                {section.routes.map((route) => (
                  <NavLink
                    key={route.name}
                    className="nav-link"
                    name={route.name}
                    route={route.route}
                  />
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </>
  );
};

export default Sidebar;
