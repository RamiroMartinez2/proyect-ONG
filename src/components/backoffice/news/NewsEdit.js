import NewsForm from './NewsForm'
import {useLocation} from 'react-router-dom'

const NewsEdit = () => {

    const location = useLocation()
    const newToEdit = location.state

    return(
        <>
            <NewsForm newToEdit={newToEdit}></NewsForm>
        </>
        
    )
}

export default NewsEdit