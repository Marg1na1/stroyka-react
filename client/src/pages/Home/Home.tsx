import { FC, lazy } from 'react';
import { useScrollToTop } from 'hooks/useScrollToTop';
import style from './Home.module.scss';

const Slider = lazy(() => import('../../components/Slider/Slider'));
const Discount = lazy(() => import('../../components/Discount/Discount'));
const PopularProducts = lazy(() => import('../../components/PopularProducts/PopularProducts'));
const Reviews = lazy(() => import('../../components/Reviews/Reviews'));
const Hero = lazy(() => import('../../components/Hero/Hero'));

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