import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import { useGetproductsQuery } from './redux/stroykaAPI';

const App: FC = () => {

    const { data = [] } = useGetproductsQuery();

    return (
        <Routes>
            <Route path='/' element={<Layout />}>

            </Route>
        </Routes>
    );
}

export default App;
