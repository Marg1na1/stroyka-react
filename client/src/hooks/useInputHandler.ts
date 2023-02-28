import { ChangeEvent, useState } from 'react';

type Props = {
    min: number;
    max: number;
    defaultCount: number;
}

export const useInputHandler = ({ min, max, defaultCount }: Props) => {

    const [productAmount, setProductAmount] = useState(defaultCount);

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (+e.target.value <= min) {
            setProductAmount(1)
        } else if (+e.target.value >= max) {
            setProductAmount(max)
        } else {
            setProductAmount(+e.target.value)
        }
    }

    const onClickMinus = () => {
        if (productAmount === min) {
            setProductAmount(min)
        } else {
            setProductAmount(productAmount - 1)
        }
    }

    const onClickPlus = () => {
        if (productAmount >= max) {
            setProductAmount(max)
        } else {
            setProductAmount(productAmount + 1)

        }
    }

    return { inputHandler, onClickMinus, onClickPlus, productAmount }
}