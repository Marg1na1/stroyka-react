import { useCallback, useEffect } from 'react';
import { RootState, useAppDispatch } from './../redux/store';
import { useSelector } from 'react-redux';
import { setCords, setLocality } from './../redux/slices/locateSlice';
import { setBodyConfirm, setToggleConfirm } from '../redux/slices/confirmSlice';

export const useLocate = () => {

    const locality = useSelector((state: RootState) => state.locate.locality);
    const cords = useSelector((state: RootState) => state.locate.cords);

    const dispatch = useAppDispatch();

    const getCords = useCallback(() => {
        navigator.geolocation.getCurrentPosition(
            position => {
                dispatch(setCords(
                    {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                ))
            },
            () => {
                sessionStorage.setItem('location', 'Москва')
                dispatch(setToggleConfirm(true))
                dispatch(setBodyConfirm({ message: 'Не удалось определить местоположение. Включите геолокацию или укажите самостоятельно.', type: 'error' }))
            }
        )
    }, [dispatch])

    const getLocate = useCallback(async () => {
        if (cords.latitude !== null) {
            try {
                const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_GEOCODER_KEY}&geocode=${cords.longitude},${cords.latitude}&format=json`)
                const obj = await response.json()
                const city = await obj.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components
                    .find((obj: { kind: string, name: string }) => obj.kind === 'locality')
                if (city === undefined) {
                    sessionStorage.setItem('location', 'Москва')
                    dispatch(setToggleConfirm(true))
                    dispatch(setBodyConfirm({ message: 'Не удалось определить местоположение. Хотите указать самостоятельно?', type: 'undefined' }))
                } else {
                    sessionStorage.setItem('location', city.name)
                    dispatch(setLocality(city.name))
                    dispatch(setToggleConfirm(true))
                    dispatch(setBodyConfirm({ message: `Ваш город ${city.name} ?`, type: 'defined' }))
                }
            } catch (err) {
                sessionStorage.setItem('location', 'Москва')
                dispatch(setToggleConfirm(true))
                dispatch(setBodyConfirm({ message: 'Не удалось определить местоположение. Хотите указать самостоятельно?', type: 'undefined' }))
            }

        }
    }, [cords.latitude, cords.longitude, dispatch])

    useEffect(() => {
        if (sessionStorage.getItem('location') === null) {
            getCords()
            getLocate()
        } else {
            dispatch(setLocality(sessionStorage.location))
        }
    }, [cords, dispatch, getCords, getLocate])

    return locality
}