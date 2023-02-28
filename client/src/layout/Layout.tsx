import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { FC } from 'react';
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