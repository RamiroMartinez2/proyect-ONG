import React, { useEffect, useState } from "react";
import { getSlides } from "./slidesService";
import SlidesShow from "./SlidesShow";
import Loader from '../layout/Loader'

const ListOfSlides = () => {
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState();
  const [update, setUpdate] = useState(false);
  
  useEffect(() => {
    getSlides().then((res) => {
      console.log(res.data);
      setSlides(res.data);
      setLoading(false);
      setUpdate(false);
    });
  }, [update]);

  if (loading) return <Loader />
  return (
      <SlidesShow slides={slides} parentCallBack={setUpdate} />
  );
};

export default ListOfSlides;
