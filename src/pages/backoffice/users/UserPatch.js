import React from "react";
import { useParams } from "react-router";
import { CreateOrEditMain } from "../../../components/backoffice/users/CreateOrEditMain";

export const UserPatch = () => {
  const { id } = useParams();

  return <CreateOrEditMain id={id} />;
};
