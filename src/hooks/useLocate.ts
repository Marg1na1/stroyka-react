import { RootObject } from './../@types/geocoderType';
import { RootState, useAppDispatch } from './../redux/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCords, setLocality } from './../redux/slices/locateSlice';


export const useLocate = (setChangeLocate: (x: boolean) => void) => {
    const locality = useSelector((state: RootState) => state.locate.locality);
    const cords = useSelector((state: RootState) => state.locate.cords);
    const dispatch = useAppDispatch();

    const getCords = () => {
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
                setChangeLocate(true)
            })
    }

    const getLocate = () => {
        if (cords.latitude !== null) {
            fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${process.env.REACT_APP_GEOCODER_KEY}&geocode=${cords.longitude},${cords.latitude}&format=json`)
                .then(response => response.json())
                .then(city => city.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.forEach((obj: { kind: string, name: string }) => {
                    if (obj.kind === 'locality') {
                        sessionStorage.setItem('location', obj.name)
                        dispatch(setLocality(obj.name))
                    }
                }))
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('location') === null) {
            getCords()
            getLocate()
        } else {
            dispatch(setLocality(sessionStorage.location))
        }
    }, [cords])

    return locality
}