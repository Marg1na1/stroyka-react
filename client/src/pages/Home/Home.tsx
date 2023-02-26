import { FC } from 'react';
import Discount from '../../components/Sections/Discount/Discount';
import HeroSlider from '../../components/Sections/Slider/Slider';
import PopularProducts from '../../components/Sections/PopularProducts/PopularProducts';
import Hero from '../../components/Sections/Hero/Hero';
import Reviews from '../../components/Sections/Reviews/Reviews';
import style from './Home.module.scss';
import { useScrollToTop } from '../../hooks/useScrollToTop';

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