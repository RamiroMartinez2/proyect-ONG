import React from "react";
import { HeaderLink } from "./HeaderLink";

export const HeaderRoutes = ({ routes }) => {
  return routes.map((route) => (
    <HeaderLink key={route.name} url={route.url} name={route.name} />
  ));
};
