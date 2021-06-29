import { Flex } from "@chakra-ui/react";
import React from "react";
import { BackofficeLink } from "./BackofficeLink";

export const BackofficeRoutes = () => {
  const adminRoutes = [
    {
      section: "Novedades",
      routes: [
        {
          listRoute: "/backoffice/news",
          listName: "Listar novedades",
        },
        {
          createRoute: "/backoffice/news/create",
          createName: "Crear novedad",
        },
      ],
    },
    {
      section: "Actividades",
      routes: [
        {
          listRoute: "/backoffice/activities",
          listName: "Listar actividades",
        },
        {
          createRoute: "/backoffice/activities/create",
          createName: "Crear actividad",
        },
      ],
    },
    {
      section: "Testimonios",
      routes: [
        {
          listRoute: "/backoffice/testimonials",
          listName: "Listar testimonios",
        },
        {
          createRoute: "/backoffice/testimonials/create",
          createName: "Crear testimonio",
        },
      ],
    },
    {
      section: "Miembros",
      routes: [
        {
          listRoute: "/backoffice/members",
          listName: "Listar miembros",
        },
        {
          createRoute: "/backoffice/members/create",
          createName: "Crear miembro",
        },
      ],
    },
    {
      section: "Categorías",
      routes: [
        {
          listRoute: "/backoffice/categories",
          listName: "Listar categorías",
        },
        {
          createRoute: "/backoffice/categories/create",
          createName: "Crear categorías",
        },
      ],
    },
    {
      section: "Slides",
      routes: [
        {
          listRoute: "/backoffice/slides",
          listName: "Listar slides",
        },
        {
          createRoute: "/backoffice/slides/create",
          createName: "Crear slide",
        },
      ],
    },
    {
      section: "Users",
      routes: [
        {
          listRoute: "/backoffice/users",
          listName: "Listar Users",
        },
        {
          createRoute: "/backoffice/users/create",
          createName: "Crear user",
        },
      ],
    },
    {
      section: "Organización",
      routes: [
        {
          listRoute: "/backoffice/organization",
          listName: "Ver organización",
        },
        {
          createRoute: "/backoffice/organization/edit",
          createName: "Editar organización",
        },
      ],
    },
  ];
  return adminRoutes.map((route, index) => (
    <Flex key={index} margin="1em" alignItems="center">
      <BackofficeLink section={route.section} routes={route.routes} />
    </Flex>
  ));
};
