import { FC, useState } from 'react';
import ReactSlider from 'react-slider';
import Select from 'react-select'

import style from './CategorySide.module.scss';
import { ProductModel } from '../../@types/models';

type CategorySideProps = {
    data: ProductModel[]
    withSearch: boolean
}

const CategorySide: FC<CategorySideProps> = ({ data, withSearch }) => {

    const minValue = Math.min(...data.map((obj) => obj.price));
    const maxValue = Math.max(...data.map((obj) => obj.price));

    const [provider, setProvider] = useState('');
    const [rangeValue, setRangeValue] = useState<number[]>([minValue, maxValue]);
    const [searchValue, setSearchValue] = useState('');

    const options = [
        { value: 1, label: 'Аксон' },
        { value: 2, label: 'Луга' },
        { value: 3, label: 'ОКСО' },
        { value: 4, label: 'Зенит' },
        { value: 5, label: 'ТОРН' },
    ];

    const changeProvider = (newValue: any) => {
        setProvider(newValue.label)

    }

    const changeInputValue = (str: string) => {
        setSearchValue(str)
    }

    const resetFilter = () => {
        setRangeValue([minValue, maxValue]);
        setSearchValue('');
        setProvider('0');
    }

    return (
        <aside className={style['category-side']}>
            <div className={style['side-main']}>
                <h2 className={style['title']}>Цена</h2>
                <div className={style['inputs-container']}>
                    <input
                        type="number"
                        value={rangeValue[0]}
                        className={style['range-input']}
                        onChange={(e) => setRangeValue([+e.target.value, rangeValue[1]])}
                        max={rangeValue[1] - 10}
                        min={minValue}
                    />
                    <input
                        type="number"
                        value={rangeValue[1]}
                        className={style['range-input']}
                        onChange={(e) => setRangeValue([rangeValue[0], +e.target.value])}
                        max={maxValue}
                        min={rangeValue[0] + 10} />

                </div>
                <ReactSlider
                    className='range-slider'
                    thumbClassName="range-slider__thumb"
                    trackClassName="range-slider__track"
                    defaultValue={[minValue, maxValue]}
                    renderThumb={(props) => <div {...props}><div className={style['slider-decorate']}></div></div>}
                    onChange={(value) => setRangeValue(value)}
                    pearling
                    value={rangeValue}
                    minDistance={0}
                    max={maxValue}
                    min={minValue}
                />
                {
                    withSearch === true &&
                    <>
                        <h2 className={style['title']}>Поиск</h2>
                        <input
                            type="text"
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
                <button className={style['submit']}>Применить</button>
                <button className={style['cancel']} onClick={resetFilter}>Сбросить</button>
            </div>
        </aside>
    );
}

export default CategorySide;