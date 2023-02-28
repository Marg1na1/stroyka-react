import { FC } from "react";
import ContentLoader from "react-content-loader"

export const HorizontalSkeleton: FC = () => (
    <ContentLoader 
    speed={2}
    width={572}
    height={208}
    viewBox="0 0 572 208"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="16" y="16" rx="0" ry="0" width="259" height="191" /> 
    <rect x="291" y="16" rx="0" ry="0" width="262" height="14" /> 
    <rect x="291" y="39" rx="0" ry="0" width="200" height="14" /> 
    <rect x="291" y="87" rx="0" ry="0" width="55" height="28" /> 
    <rect x="291" y="160" rx="0" ry="0" width="262" height="48" />
  </ContentLoader>
)
