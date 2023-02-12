import { FC } from 'react'
import ContentLoader from 'react-content-loader'

const Cartskeleton: FC = () => (
    <ContentLoader
        speed={2}
        width={570}
        height={208}
        viewBox='0 0 570 208'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
    >
        <rect x='16' y='16' rx='0' ry='0' width='244' height='174' />
        <rect x='276' y='16' rx='0' ry='0' width='262' height='16' />
        <rect x='276' y='40' rx='0' ry='0' width='200' height='16' />
        <rect x='276' y='99' rx='0' ry='0' width='51' height='27' />
    </ContentLoader>
)

export default Cartskeleton;