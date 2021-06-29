import React, { useState, useEffect } from "react";
import { Box, IconButton, Spinner } from "@chakra-ui/react";
import {
  IoIosArrowForward as RightIcon,
  IoIosArrowBack as LeftIcon,
} from "react-icons/io";
import axios from "axios";
import Slide from "./Slide";

const HomeSlides = () => {
  const [slidesData, setSlidesData] = useState({
    images: [],
    position: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("http://ongapi.alkemy.org/api/slides");
        setSlidesData((data) => {
          return { ...data, images: response.data.data };
        });
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  //Auto slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      right();
    }, 6000);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  //Show next slide
  function right() {
    setSlidesData((data) => {
      if (data.position < 100 * (data.images.length - 1))
        return { ...data, position: data.position + 100 };
      else return { ...data, position: 0 };
    });
  }

  //Show previous slide
  function left() {
    setSlidesData((data) => {
      if (data.position !== 0)
        return { ...data, position: data.position - 100 };
      else return { ...data, position: 100 * (data.images.length - 1) };
    });
  }

  //Move from one image to other (DotButton)
  function moveTo(index) {
    setSlidesData((data) => {
      return { ...data, position: index * 100 };
    });
  }

  return (
    <Box w="100%" position="relative">
      <Box
        w="100%"
        h={{ base: "25vh", sm: "35vh", md: "70vh" }}
        display="flex"
        alignItems="center"
        overflow="hidden"
      >
        {loading && <Spinner m="auto" size="xl" color="brandRed.100" thickness="5px" />}
        {slidesData.images.map((image) => (
          <Slide key={image.id} image={image} position={slidesData.position} />
        ))}
      </Box>

      {/* Dot buttons */}
      <Box
        position="absolute"
        right="50%"
        bottom="-30px"
        transform="translateX(50%)"
        display="flex"
        gridGap="10px"
      >
        {slidesData.images.map((image, i) => (
          <DotButton
            key={image.id}
            bg={
              i * 100 === slidesData.position ? "brandBlue.100" : "brandRed.100"
            }
            onClick={() => {
              moveTo(i);
            }}
          />
        ))}
      </Box>

      {/* Arrow buttons */}
      <ArrowButton top="0" left="0" onClick={left}>
        <LeftIcon size="4rem" color="#DB5752" />
      </ArrowButton>
      <ArrowButton top="0" right="0" onClick={right}>
        <RightIcon size="4rem" color="#DB5752" />
      </ArrowButton>
    </Box>
  );
};

function DotButton(props) {
  return (
    <Box
      {...props}
      w="1.25rem"
      h="1.25rem"
      borderColor="brandRed.300"
      transition="transform .25s"
      _hover={{ cursor: "pointer", transform: "scale(1.15)" }}
      borderRadius="50%"
    ></Box>
  );
}

function ArrowButton(props) {
  return (
    <IconButton
      {...props}
      position="absolute"
      borderRadius="0"
      _focus={{ border: "none" }}
      _hover={{ backgroundColor: "#9AC9FB80" }}
      _active={{ backgroundColor: "#9AC9FBA0" }}
      bg="transparent"
      h="100%"
    >
      {props.children}
    </IconButton>
  );
}

export default HomeSlides;
