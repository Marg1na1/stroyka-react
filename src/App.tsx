import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Brands from './pages/Brands/Brands';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import Contacts from './pages/Contacts/Contacts';
import Delivery from './pages/Delivery/Delivery';
import Documentation from './pages/Documentation/Documentation';
import Home from './pages/Home/Home';
import Refund from './pages/Refund/Refund';

const App: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='brands' element={<Brands />} />
                <Route path='delivery' element={<Delivery />} />
                <Route path='refund' element={<Refund />} />
                <Route path='documentation' element={<Documentation />} />
                <Route path='contacts' element={<Contacts />} />
                <Route path='catalog' element={<Catalog />} />
                <Route path='cart' element={<Cart />} />
            </Route>
        </Routes>
    );
}

export default App;
