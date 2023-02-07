import { FC, lazy, useEffect } from 'react';
import Discount from '../../components/Discount/Discount';
import HeroSlider from '../../components/Slider/Slider';
import PopularProducts from '../../components/PopularProducts/PopularProducts';
import Hero from '../../components/Hero/Hero';
import Reviews from '../../components/Reviews/Reviews';
import style from './Home.module.scss';
import { useScrollToTop } from '../../hooks/useScrollToTop';

// const Discount = lazy(() => import('../../components/Discount/Discount'));
// const HeroSlider = lazy(() => import('../../components/Slider/Slider'));
// const PopularProducts = lazy(() => import('../../components/PopularProducts/PopularProducts'));
// const Hero = lazy(() => import('../../components/Hero/Hero'));
// const Reviews = lazy(() => import('../../components/Reviews/Reviews'));

const Home: FC = () => {

    useScrollToTop();

    return (
        <section className={style['home']}>
            <HeroSlider />
            <Discount />
            <PopularProducts />
            <Reviews />
            <Hero />
        </section>
    );
}

export default Home;