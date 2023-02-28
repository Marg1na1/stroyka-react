import { FC } from "react";
import ContentLoader from "react-content-loader";

export const Skeleton: FC = () => (
    <ContentLoader
        speed={2}
        width={278}
        height={419}
        viewBox="0 0 278 419"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="16" y="16" rx="0" ry="0" width="259" height="191" />
        <rect x="16" y="223" rx="0" ry="0" width="259" height="14" />
        <rect x="16" y="244" rx="0" ry="0" width="130" height="14" />
        <rect x="33" y="355" rx="0" ry="0" width="224" height="48" />
        <rect x="16" y="293" rx="0" ry="0" width="51" height="28" />
    </ContentLoader>
)