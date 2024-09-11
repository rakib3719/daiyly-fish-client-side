
import PropTypes from 'prop-types';

import { Navigate, useLocation } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';


const PrivateRoute = ({children}) => {

    const currentLocation = useLocation().pathname
    const {loader, user} = useContext(AuthContext)
    if(loader){
        return <div  className='flex items-center mt-28 justify-center'>

<ColorRing
        
        height={100}
        width={100}
        radius={5}
        color="#4fa94d"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}

    
      ></ColorRing>
        </div>
    }
    if(user){

        return children
    }


    return <Navigate state={currentLocation}  to='/login' ></Navigate>}

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;