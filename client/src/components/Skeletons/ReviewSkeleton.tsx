import { FC } from "react"
import ContentLoader from "react-content-loader"

const ReviewSkeleton: FC = () => (
    <ContentLoader
        speed={2}
        width={339}
        height={347}
        viewBox="0 0 339 347"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="50" cy="50" r="26" />
        <rect x="86" y="38" rx="0" ry="0" width="45" height="25" />
        <rect x="24" y="86" rx="0" ry="0" width="323" height="14" />
        <rect x="24" y="106" rx="0" ry="0" width="270" height="14" />
        <rect x="24" y="126" rx="0" ry="0" width="290" height="14" />
        <rect x="24" y="146" rx="0" ry="0" width="140" height="14" />
        <rect x="24" y="166" rx="0" ry="0" width="218" height="14" />
        <rect x="24" y="186" rx="0" ry="0" width="280" height="14" />
        <rect x="24" y="206" rx="0" ry="0" width="275" height="14" />
        <rect x="24" y="225" rx="0" ry="0" width="118" height="14" />
        <rect x="24" y="281" rx="0" ry="0" width="118" height="18" />
    </ContentLoader>
)

export default ReviewSkeleton