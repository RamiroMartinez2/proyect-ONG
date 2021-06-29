import React from 'react'
import FormTestimonials from './FormTestimonials'
import {useLocation} from 'react-router-dom'

const EditTestimonial = () => {
    const location = useLocation()
    const testimonialToEdit = location.state

    return(
        <>
            <FormTestimonials testimonialToEdit={testimonialToEdit}></FormTestimonials>
        </>
    )
}

export default EditTestimonial