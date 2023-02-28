import { useState, useEffect } from 'react';
import { ProductModel } from 'types/models';

export const usePagination = (data: ProductModel[]) => {

    const [pageCount, setPageCount] = useState(0);
    const [currentItems, setCurrentItems] = useState<ProductModel[]>([]);
    const [pugPosition, setPugPosition] = useState(1);

    useEffect(() => {
        setPageCount(Math.ceil(data.length / 18))
        if (data.length > 17) {
            setCurrentItems(data.slice(pugPosition - 1, pugPosition * 18 - 1))
        } else {
            setCurrentItems(data)
        }

    }, [data, pugPosition])

    useEffect(() => {
        setCurrentItems(data.slice((pugPosition - 1) * 18, pugPosition * 18))
    }, [pugPosition, data])

    const next = () => {
        if (pugPosition < pageCount) {
            setPugPosition(prev => prev + 1)
        }
    }

    const prev = () => {
        if (pugPosition > 1) {
            setPugPosition(prev => prev - 1)
        }
    }

    return { pageCount, currentItems, next, prev, setPugPosition }
}