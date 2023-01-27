import { FC } from 'react';
import FooterLogotype from '../../Icons/FooterLogotye';
import MailIcon from '../../Icons/MailIcon';
import Locate from '../../Icons/Locate';
import SlimArrowIcon from '../../Icons/SlimArrowIcon';
import { navItems } from '../../data/footer.data';
import { Link } from 'react-router-dom';
import style from './Footer.module.scss';

const visa = './../assets/images/visa_logo.svg';
const mastercard = './../assets/images/mastercard_logo.svg';
const maestro = './../assets/images/maestro_logo.svg';
const mir = './../assets/images/mir_logo.svg';

const Footer: FC = () => {

    const parametrs = {
        size: {
            width: 24,
            height: 24
        },
        color: '#E8E9EA'
    }

    return (
        <footer className={style['footer']} >
            <div className='container'>
                <div className={style['footer-main']}>
                    <div className={style['footer-contacts']}>
                        <Link to={'/'}>
                            <FooterLogotype />
                        </Link>
                        <a href='mailto:info@stroykastore.ru' className={style['email']}>
                            <MailIcon />
                            <p>info@strolastore.ru</p>
                        </a>
                        <a href='#' className={style['adress']}>
                            <Locate {...parametrs} />
                            <p>Москва, ул. Камушкина 10</p>
                        </a>
                    </div>
                    <nav className={style['footer-nav']}>
                        <ul className={style['footer-nav-list']}>
                            {
                                navItems.map((obj, i) => (
                                    i < 4 &&
                                    <Link to={obj.path} className={style['footer-nav-list__item']} key={i}>
                                        <SlimArrowIcon />{obj.text}
                                    </Link>
                                ))
                            }
                        </ul>
                        <ul className={style['footer-nav-list']}>
                            {
                                navItems.map((obj, i) => (
                                    (i > 3 && i < 8) &&
                                    <Link to={obj.path} className={style['footer-nav-list__item']} key={i}>
                                        <SlimArrowIcon />{obj.text}
                                    </Link>
                                ))
                            }
                        </ul>
                        <ul className={style['footer-nav-list']}>
                            {
                                navItems.map((obj, i) => (
                                    i > 7 &&
                                    <Link to={obj.path} className={style['footer-nav-list__item']} key={i}>
                                        <SlimArrowIcon />{obj.text}
                                    </Link>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
                <div className={style['footer-cellar']}>
                    <p>© СтройкаСтор</p>
                    <div className={style['footer-payment']}>
                        <img src={visa} alt={'visa'} />
                        <img src={mastercard} alt={'mastercard'} />
                        <img src={maestro} alt={'maestro'} />
                        <img src={mir} alt={'mir'} />
                    </div>
                    <p>Сделано Margina1</p>
                </div>
            </div>
        </footer >
    );
}

export default Footer;