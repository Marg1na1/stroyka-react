import { FC, useState, useEffect } from 'react';
import { ProductModel } from 'types/models';
import ReactSlider from 'react-slider';
import Select, { SingleValue } from 'react-select';
import { setFilter } from 'redux/slices/sortSlice';
import { useAppDispatch } from 'redux/store';
import { useLocation } from 'react-router-dom';
import style from './SideFilter.module.scss';

type Props = {
    data: ProductModel[];
    withSearch: boolean;
}

const options = [
    { value: 1, label: 'Аксон' },
    { value: 2, label: 'Луга' },
    { value: 3, label: 'ОКСО' },
    { value: 4, label: 'Зенит' },
    { value: 5, label: 'ТОРН' },
];

const SideFilter: FC<Props> = ({ data, withSearch }) => {

    const dispatch = useAppDispatch();

    const location = useLocation();

    const [provider, setProvider] = useState('');
    const [rangeValue, setRangeValue] = useState([0, 1]);
    const [defaultRangeValue, setDefaultRangeValue] = useState([0, 1]);
    const [searchValue, setSearchValue] = useState('');
    const [locationKey, setLocationKey] = useState('');

    useEffect(() => {
        setRangeValue([Math.min(...data.map((obj) => obj.price)), Math.max(...data.map((obj) => obj.price))])
        setDefaultRangeValue([Math.min(...data.map((obj) => obj.price)), Math.max(...data.map((obj) => obj.price))])
        return () => {
            dispatch(setFilter({
                range: [],
                provider,
                search: searchValue
            }))
        }
    }, [])

    useEffect(() => {
        setLocationKey(location.key)
        if (locationKey !== location.key) {
            setRangeValue([Math.min(...data.map((obj) => obj.price)), Math.max(...data.map((obj) => obj.price))])
            setDefaultRangeValue([Math.min(...data.map((obj) => obj.price)), Math.max(...data.map((obj) => obj.price))])
        }
    }, [data])

    const changeProvider = (newValue: SingleValue<{ value: number; label: string; }>) => {
        if (newValue) setProvider(newValue.label)
    }

    const changeInputValue = (str: string) => setSearchValue(str)

    const resetFilter = () => {
        setRangeValue(defaultRangeValue);
        setSearchValue('');
        setProvider('');
    }

    const changeFilterState = () => {
        dispatch(setFilter({
            range: rangeValue,
            provider,
            search: searchValue
        }))
    }

    return (
        <aside className={style['category-side']}>
            <div className={style['side-main']}>
                <h2 className={style['title']}>Цена</h2>
                <div className={style['inputs-container']}>
                    <input
                        type='number'
                        value={rangeValue[0]}
                        className={style['range-input']}
                        onChange={(e) => setRangeValue([+e.target.value, rangeValue[1]])}
                        max={defaultRangeValue[1] - 10}
                        min={defaultRangeValue[0]} />
                    <input
                        type='number'
                        value={rangeValue[1]}
                        className={style['range-input']}
                        onChange={(e) => setRangeValue([rangeValue[0], +e.target.value])}
                        max={defaultRangeValue[1]}
                        min={defaultRangeValue[0] + 10} />
                </div>
                <ReactSlider
                    className='range-slider'
                    thumbClassName='range-slider__thumb'
                    trackClassName='range-slider__track'
                    renderThumb={(props) => <div {...props}><div className={style['slider-decorate']}></div></div>}
                    onChange={(value) => setRangeValue(value)}
                    pearling
                    value={rangeValue}
                    minDistance={0}
                    max={defaultRangeValue[1]}
                    min={defaultRangeValue[0]} />
                {
                    withSearch &&
                    <>
                        <h2 className={style['title']}>Поиск</h2>
                        <input
                            type='text'
                            className={style['search']}
                            onChange={(e) => changeInputValue(e.target.value)}
                            value={searchValue} />
                    </>
                }
                <h2 className={style['title']}>Поставщик</h2>
                <Select
                    options={options}
                    onChange={(newValue) => changeProvider(newValue)}
                    defaultValue={options[0]}
                    isSearchable
                    name='providers'
                    classNamePrefix={'select'}
                    escapeClearsValue
                    value={options[+provider]} />
            </div>
            <div className={style['side-footer']}>
                <button className={style['submit']} onClick={changeFilterState}>Применить</button>
                <button className={style['cancel']} onClick={resetFilter}>Сбросить</button>
            </div>
        </aside>
    );
}

export default SideFilter;