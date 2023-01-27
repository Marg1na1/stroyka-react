import { ChangeEvent, useState } from 'react';

type InputHandlerProps = {
    min: number;
    max: number;
}

export const useInputHandler = ({ min, max }: InputHandlerProps) => {

    const [productAmount, setProductAmount] = useState(1);

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