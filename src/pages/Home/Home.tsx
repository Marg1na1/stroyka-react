import { FC } from 'react';
import Discount from '../../components/Discount/Discount';
import HeroSlider from '../../components/Slider/Slider';
import PopularProducts from '../../components/PopularProducts/PopularProducts';
import Hero from '../../components/Hero/Hero';
import Reviews from '../../components/Reviews/Reviews';
import style from './Home.module.scss';

const Home: FC = () => {

    return (
        <section className={style['home']}>
            <HeroSlider />
            <Discount />
            <PopularProducts />
            <Reviews />
            {/* <Hero /> */}
        </section>
    );
}

export default Home;