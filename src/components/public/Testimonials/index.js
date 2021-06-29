import imgSubtitle from "../../../assets/forBackTitle.jpg"
import { Box } from "@chakra-ui/react";
import Title from "../../Title/Title";
import TestimonialsComp from "./TestimonialsComp"

export default function Testimonials (){

    return(
      
          <Box mb={14}>
          <Title image={imgSubtitle} title="Testimonios"/>
    
        <TestimonialsComp />
            
        </Box>
    )
    
}