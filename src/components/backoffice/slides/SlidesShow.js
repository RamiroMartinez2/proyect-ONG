import React, { useRef, useCallback } from "react";
import {Link} from 'react-router-dom'
import { MappedSlides } from "../slides/MappedSlides";
import {Container, Flex, Heading, Button} from '@chakra-ui/react'
import { useBreakpointValue } from "@chakra-ui/media-query";

const SlidesShow = ({ speed = "500", slides, parentCallBack }) => {
  const slideshow = useRef(null);

  const next = useCallback(() => {
    if (slideshow.current.children.length > 0) {
      const firstElement = slideshow.current.children[0];
      slideshow.current.style.transition = `${speed}ms ease-out all`;
      const sizeSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

      const transition = () => {
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = `translateX(0)`;
        slideshow.current.appendChild(firstElement);
        slideshow.current.removeEventListener("transitionend", transition);
      };

      slideshow.current.addEventListener("transitionend", transition);
    }
  }, [speed]);

  const prev = () => {
    if (slideshow.current.children.length > 0) {
      const index = slideshow.current.children.length - 1;
      const lastElement = slideshow.current.children[index];
      slideshow.current.insertBefore(lastElement, slideshow.current.firstChild);

      slideshow.current.style.transition = "none";
      const sizeSlide = slideshow.current.children[0].offsetWidth;
      slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

      setTimeout(() => {
        slideshow.current.style.transition = `${speed}ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  const order = slides?.map((data) => data.id);

  const alignButton = useBreakpointValue({ base: "center", md: "flex-end" })
  const marginB = useBreakpointValue({ base: "1em", md: "0" })
  const marginR = useBreakpointValue({ base: "0", md: "5%" })

  return (
    <div>
      <Container maxW="container.xl">
          <Flex flexDir="column" mb={10}>
              <Heading textAlign="center" mt={10} mb={marginB}>Slides</Heading>
              <Flex alignSelf={alignButton} marginRight={marginR}>
              <Link to="/backoffice/slides/create">
                  <Button variant={'somosMas'}>+ Crear Slide</Button>
              </Link>
              </Flex>
              <MappedSlides
                next={next}
                prev={prev}
                slideshow={slideshow}
                slides={slides}
                parentCallBack={parentCallBack}
                order={order}
              />
          </Flex>
      </Container>
    </div>
  );
};

export default SlidesShow;
