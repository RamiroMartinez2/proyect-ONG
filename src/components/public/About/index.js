import React, {useEffect, useState} from 'react';
import { Box } from "@chakra-ui/react";
import AboutUs from "./AboutUs";
import Title from "../../Title/Title";
import imgSubtitle from "../../../assets/forBackTitle.jpg"
import Members from "./Members";
import {details} from "./aboutService"

export const About = () => {

  const [detail, setDetails] = useState("")
  

  useEffect(()=>{
    details()
    .then(res => {
      setDetails(res.data[0].long_description)
    })
  }, [])

  return (
    <Box>
      <Title image={imgSubtitle} title="Nosotros"/>

      <AboutUs text={detail} />

          <Members />
    </Box>
  );
};

export default About;
