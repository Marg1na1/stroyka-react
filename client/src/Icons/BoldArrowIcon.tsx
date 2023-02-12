import { FC } from 'react';

const BoldArrowIcon: FC = () => {
    return (
        <svg width={24} height={24} fill='none' stroke='#454950' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path d='m5 12h14' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
            <path d='m12 5 7 7-7 7' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
        </svg>
    );
}

export default BoldArrowIcon;