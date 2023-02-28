import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from 'spinners/Loader/Loader';
import { useIsAuth } from 'hooks/useIsAuth';
import { setToggleOpenAuth } from 'redux/slices/popupSlice';
import { useAppDispatch } from 'redux/store';

type Props = {
    children: ReactElement;
}

const PrivateRoute = ({ children }: Props) => {

    const isAuth = useIsAuth();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const goBack = () => navigate(-1);


    if (isAuth === false) {
        goBack();
        dispatch(setToggleOpenAuth(true));
        return null
    } else if (isAuth === undefined) {
        return <Loader />
    } else {
        return children
    }
}

export default PrivateRoute;