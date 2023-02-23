import { FC } from 'react';
import Layout from './layout/Layout';
import Brands from './pages/Brands/Brands';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import Category from './pages/Category/Category';
import Contacts from './pages/Contacts/Contacts';
import Delivery from './pages/Delivery/Delivery';
import Documentation from './pages/Documentation/Documentation';
import EmptyPage from './pages/EmptyPage/EmptyPage';
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';
import Product from './pages/Product/Product';
import Refund from './pages/Refund/Refund';
import Registration from './pages/Registration/Registration';
import SearchResult from './pages/SearchResult/SearchResult';
import { categoryData } from './data/catalog.data';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './hoc/PrivateRoute';

const errorPageData = {
    title: '404',
    subtitle: 'Страница не найдена',
    descr: 'Неправильно набран адрес или такая страница больше не существует',
    link_txt: 'На главную',
    path: '/'
}

const App: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/brands' element={<Brands />} />
                <Route path='/delivery' element={<Delivery />} />
                <Route path='/refund' element={<Refund />} />
                <Route path='/documentation' element={<Documentation />} />
                <Route path='/contacts' element={<Contacts />} />
                <Route path='/catalog' element={<Catalog />} />
                <Route path='/cart' element={
                    <PrivateRoute>
                        <Cart />
                    </PrivateRoute>
                } />
                <Route path='/reg' element={<Registration />} />
                <Route path='/orders' element={
                    <PrivateRoute>
                        <Orders />
                    </PrivateRoute>
                } />
                <Route path='/catalog/:category/:type/' element={<Category categoryData={categoryData} />} />
                <Route path='/catalog/search' element={<SearchResult />} />
                <Route path='/products/:id' element={<Product />} />
                <Route path='*' element={<EmptyPage {...errorPageData} />} />
            </Route>
        </Routes>
    );
}

export default App;
