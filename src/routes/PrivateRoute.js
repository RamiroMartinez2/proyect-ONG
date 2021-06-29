import React from 'react'
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({children, ...props}) => {
    //const dispatch = useDispatch();
    //const [isLoggedIn, setIsLoggedIn] = useState(false);
    // obtener el usuario logueada (si lo esta)
    /* const {user} = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user) {
        setIsLoggedIn( true );
        }
    }, [user]); */

    const user = true;

    if (user) {
        return <Route { ...props }>{children}</Route>
    } else {
        return <Redirect to="/login" />
    }
}

