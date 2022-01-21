import React, {useContext, useEffect} from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';


//Higer Order Components 

const PrivateRoute = ({component:Component,...props}) => {
    const authContext = useContext(AuthContext);
    const {authenticated,userAuthenticated,loading} = authContext;

    useEffect(() => {
        userAuthenticated();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    return ( !authenticated && !loading ? <Navigate to="/" /> : 
                <Outlet />
           );
}
 
export default PrivateRoute;