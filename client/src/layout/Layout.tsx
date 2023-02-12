import { FC } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';

const Layout: FC = () => {

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}

export default Layout;