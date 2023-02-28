import { FC } from 'react';
import { Slider } from 'components/Slider';
import { Discount } from 'components/Discount';
import { PopularProducts } from 'components/PopularProducts';
import { Reviews } from 'components/Reviews';
import { Hero } from 'components/Hero';
import { useScrollToTop } from 'hooks/useScrollToTop';
import style from './Home.module.scss';

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