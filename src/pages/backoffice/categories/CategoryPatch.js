import React from "react";
import { useParams } from "react-router";
import { CreateOrEditMain } from "../../../components/backoffice/categories/CreateOrEditMain";

export const CategoryPatch = () => {
  const { id } = useParams();

  return <CreateOrEditMain id={id} />;
};
