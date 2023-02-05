import { FC, memo } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import style from './YMap.module.scss';

const YMap: FC = memo(() => {
    return (
        <YMaps>
            <Map className={style['map']} defaultState={{ center: [55.722365, 37.653873], zoom: 15 }}>
                <Placemark defaultGeometry={[55.722365, 37.653873]} />
            </Map>
        </YMaps>
    );
})

export default YMap;