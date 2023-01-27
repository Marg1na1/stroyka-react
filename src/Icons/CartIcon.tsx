import { FC } from 'react';

const CartIcon: FC = () => {
    return (
        <svg fill='none' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' width={24} height={24}>
            <path d='m9 22c0.55228 0 1-0.4477 1-1s-0.44772-1-1-1-1 0.4477-1 1 0.44772 1 1 1z' stroke='#5D6066' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
            <path d='m20 22c0.5523 0 1-0.4477 1-1s-0.4477-1-1-1-1 0.4477-1 1 0.4477 1 1 1z' stroke='#5D6066' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
            <path d='M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6' stroke='#5D6066' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
        </svg>
    );
}

export default CartIcon;