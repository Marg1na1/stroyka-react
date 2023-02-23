import { useNavigate } from 'react-router-dom';
import { useIsAuth } from '../hooks/useIsAuth';
import { setToggleOpenAuth } from '../redux/slices/popupSlice';
import { useAppDispatch } from '../redux/store';

type PrivateRouteProps = {
    children: any;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {

    const isAuth = useIsAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);


    if (isAuth === false) {
        dispatch(setToggleOpenAuth(true));
        goBack();
    } else if (isAuth === undefined) {
        return null
    } else {
        return children
    }
}

export default PrivateRoute;