import React, { useEffect, useState } from "react";
import { CreateOrEdit } from "./CreateOrEdit";
import {useLocation} from 'react-router-dom';

export const CreateOrEditMain = ({ id }) => {
  const [isCreate, setIsCreate] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (id !== undefined) {
      setIsCreate(false);
    }
  }, [id]);

  return <CreateOrEdit isCreate={isCreate} id={id} categoryToEdit={location.state ? location.state.category : null} />;
};
