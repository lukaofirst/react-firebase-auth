import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface IPrivateRoute {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return children;
    } else {
        return <Navigate to='/login' replace />;
    }
};

export default PrivateRoute;
