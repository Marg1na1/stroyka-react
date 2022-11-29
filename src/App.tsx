import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Delivery from './pages/Delivery/Delivery';
import Documentation from './pages/Documentation/Documentation';
import Home from './pages/Home/Home';
import Refund from './pages/Refund/Refund';


const App: FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='delivery' element={<Delivery />} />
                <Route path='refund' element={<Refund />} />
                <Route path='documentation' element={<Documentation />} />
            </Route>
        </Routes>
    );
}

export default App;
