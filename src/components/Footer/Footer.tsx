import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import style from './Footer.module.scss';
import { navItems } from '../../data/footer.data';

const logo = './../assets/images/footer-logo.svg';
const mail = './../assets/images/mail_icon.svg';
const geo = './../assets/images/footer_geo_icon.svg';
const visa = './../assets/images/visa_logo.svg';
const mastercard = './../assets/images/mastercard_logo.svg';
const maestro = './../assets/images/maestro_logo.svg';
const mir = './../assets/images/mir_logo.svg';
const arrow = './../assets/images/white_arrow_icon.svg';

const Footer: FC = () => {
    
    return (
        <footer className={style['footer']}>
            <div className='container'>
                <div className={style['footer-main']}>
                    <div className={style['footer-contacts']}>
                        <Link to={'/'}>
                            <img src={logo} />
                        </Link>
                        <a href='mailto:info@strolastore.ru' className={style['email']}>
                            <img src={mail} />
                            <p>info@strolastore.ru</p>
                        </a>
                        <a href='#' className={style['adress']}>
                            <img src={geo} />
                            <p>Москва, ул. Камушкина 10</p>
                        </a>
                    </div>
                    <nav className={style['footer-nav']}>
                        <ul className={style['footer-nav-list']}>
                            {
                                navItems.map((obj, i) => (
                                    i < 4 ?
                                        <Link to={obj.path} className={style['footer-nav-list__item']} key={i}>
                                            <img src={arrow} />{obj.text}
                                        </Link> : ''
                                ))
                            }
                        </ul>
                        <ul className={style['footer-nav-list']}>
                            {
                                navItems.map((obj, i) => (
                                    i > 3 && i < 8 ?
                                        <Link to={obj.path} className={style['footer-nav-list__item']} key={i}>
                                            <img src={arrow} />{obj.text}
                                        </Link> : ''
                                ))
                            }
                        </ul>
                        <ul className={style['footer-nav-list']}>
                            {
                                navItems.map((obj, i) => (
                                    i > 7 ?
                                        <Link to={obj.path} className={style['footer-nav-list__item']} key={i}>
                                            <img src={arrow} />{obj.text}
                                        </Link> : ''
                                ))
                            }
                        </ul>

                    </nav>
                </div>
                <div className={style['footer-cellar']}>
                    <p>© СтройкаСтор</p>
                    <div className={style['footer-payment']}>
                        <img src={visa} />
                        <img src={mastercard} />
                        <img src={maestro} />
                        <img src={mir} />
                    </div>
                    <p>Сделано Margina1</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;