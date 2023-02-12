import { FC } from "react"
import ContentLoader from "react-content-loader"

const SideSkeleton: FC = () => (
    <ContentLoader
        speed={2}
        width={278}
        height={410}
        viewBox="0 0 278 410"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="16" y="16" rx="0" ry="0" width="50" height="14" />
        <rect x="16" y="52" rx="0" ry="0" width="117" height="48" />
        <rect x="145" y="52" rx="0" ry="0" width="117" height="48" />
        <rect x="16" y="112" rx="0" ry="0" width="246" height="8" />
        <rect x="16" y="162" rx="0" ry="0" width="112" height="24" />
        <rect x="16" y="198" rx="0" ry="0" width="246" height="48" />
        <rect x="16" y="278" rx="0" ry="0" width="246" height="48" />
        <rect x="16" y="342" rx="0" ry="0" width="246" height="48" />
    </ContentLoader>
)

export default SideSkeleton