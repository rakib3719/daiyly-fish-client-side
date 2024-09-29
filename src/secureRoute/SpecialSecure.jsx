import PropTypes from 'prop-types';
import { useContext } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import useGetUser from '../hooks/useGetUser';

const AuthorSecure = ({ children }) => {
    const currentLocation = useLocation().pathname;
    const { loader, user } = useContext(AuthContext);
    const { userData, isLoading } = useGetUser();

    if (loader || isLoading) {
        return (
            <div className='flex items-center mt-28 justify-center'>
                <ColorRing
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    // Corrected condition to check the user role properly
    if (user && (userData?.userRole === "owner" || userData?.userRole === "developer")) {
        return children;
    }

    return <Navigate state={currentLocation} to='/login' />;
};

AuthorSecure.propTypes = {
    children: PropTypes.node
};

export default AuthorSecure;
