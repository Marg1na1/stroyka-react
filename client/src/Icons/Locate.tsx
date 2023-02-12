import { FC } from 'react';

type LocateProps = {
    size: {
        width: number;
        height: number;
    }
    color: string
}

const Locate: FC<LocateProps> = ({ size, color }) => {
    return (
        <svg fill='none' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' width={size.width} height={size.height}>
            <path d='m17.5 8.3333c0 5.8334-7.5 10.833-7.5 10.833s-7.5-5-7.5-10.833c0-1.9891 0.79018-3.8968 2.1967-5.3033s3.3142-2.1967 5.3033-2.1967c1.9891 0 3.8968 0.79018 5.3033 2.1967s2.1967 3.3142 2.1967 5.3033z' stroke={color} strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' />
            <path d='m10 10.833c1.3807 0 2.5-1.1192 2.5-2.5 0-1.3807-1.1193-2.5-2.5-2.5-1.3807 0-2.5 1.1193-2.5 2.5 0 1.3807 1.1193 2.5 2.5 2.5z' stroke={color} strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' />
        </svg>
    );
}

export default Locate;