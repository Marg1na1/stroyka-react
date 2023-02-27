import { FC } from 'react';
import { Discount } from '../../components/Sections/Discount';
import { Slider } from '../../components/Sections/Slider';
import { PopularProducts } from '../../components/Sections/PopularProducts';
import { Hero } from '../../components/Sections/Hero';
import { Reviews } from '../../components/Sections/Reviews';
import style from './Home.module.scss';
import { useScrollToTop } from '../../hooks/useScrollToTop';

const Home: FC = () => {

    useScrollToTop();

    return (
        <section className={style['home']}>
            <Slider />
            <Discount />
            <PopularProducts />
            <Reviews />
            <Hero />
        </section>
    );
}

export default Home;