import { FC } from 'react';
import { Triangle } from 'react-loader-spinner';
import style from './Loader.module.scss';

const Loader: FC = () => {
    return (
        <Triangle
            height="80"
            width="80"
            color="#171B24"
            ariaLabel="triangle-loading"
            wrapperClass={style['wrapper']}
            visible={true} />
    );
}

export default Loader;