import React from 'react'
import FormActivities from './FormActivities'
import {useLocation} from 'react-router-dom'

const EditActivity = () => {

    const location = useLocation()
    const activityToEdit = location.state

    return(
        <>
            <FormActivities activityToEdit={activityToEdit}></FormActivities>
        </>
        
    )
}

export default EditActivity