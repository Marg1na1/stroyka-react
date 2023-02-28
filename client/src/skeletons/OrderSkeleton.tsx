import {FC} from 'react'
import ContentLoader from 'react-content-loader'

export const OrderSkeleton: FC = () => (
  <ContentLoader 
    speed={2}
    width={530}
    height={144}
    viewBox='0 0 530 144'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='16' y='16' rx='0' ry='0' width='158' height='112' /> 
    <rect x='180' y='16' rx='0' ry='0' width='350' height='16' /> 
    <rect x='180' y='40' rx='0' ry='0' width='250' height='16' /> 
    <rect x='180' y='104' rx='0' ry='0' width='65' height='24' /> 
    <rect x='214' y='118' rx='0' ry='0' width='1' height='0' /> 
    <rect x='180' y='66' rx='0' ry='0' width='50' height='24' />
  </ContentLoader>
)

