import { FC } from "react"
import ContentLoader from "react-content-loader"

export const SearchSkeletonCard: FC = () => (
    <ContentLoader
        speed={2}
        width={400}
        height={98}
        viewBox="0 0 400 98"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="5" y="5" rx="0" ry="0" width="121" height="90" />
        <rect x="131" y="5" rx="0" ry="0" width="260" height="7" />
        <rect x="131" y="16" rx="0" ry="0" width="180" height="7" />
        <rect x="131" y="74" rx="0" ry="0" width="42" height="20" />
        <rect x="303" y="74" rx="0" ry="0" width="97" height="28" />
    </ContentLoader>
)
