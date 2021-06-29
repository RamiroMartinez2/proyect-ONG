import React from "react";

import { CreateOrEditForm } from "./CreateOrEditForm";

export const CreateOrEditUser = ({ id }) => {
  return (
    <>
      <CreateOrEditForm id={id} />
    </>
  );
};
