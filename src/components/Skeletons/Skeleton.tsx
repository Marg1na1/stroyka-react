import React, { FC } from "react";
import ContentLoader from "react-content-loader";

const Skeleton: FC = () => (
    <ContentLoader
        speed={2}
        width={278}
        height={416}
        viewBox="0 0 278 416"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="550" y="224" rx="3" ry="3" width="88" height="6" />
        <rect x="550" y="242" rx="3" ry="3" width="52" height="6" />
        <rect x="502" y="272" rx="3" ry="3" width="410" height="6" />
        <rect x="502" y="288" rx="3" ry="3" width="380" height="6" />
        <rect x="502" y="304" rx="3" ry="3" width="178" height="6" />
        <circle cx="585" cy="223" r="20" />
        <rect x="486" y="190" rx="0" ry="0" width="208" height="136" />
        <rect x="389" y="118" rx="0" ry="0" width="13" height="112" />
        <rect x="423" y="269" rx="0" ry="0" width="167" height="33" />
        <rect x="573" y="268" rx="0" ry="0" width="7" height="26" />
        <rect x="101" y="139" rx="0" ry="0" width="1" height="0" />
        <rect x="467" y="271" rx="40" ry="40" width="216" height="276" />
        <rect x="39" y="29" rx="0" ry="0" width="200" height="150" />
        <rect x="16" y="224" rx="0" ry="0" width="246" height="15" />
        <rect x="16" y="245" rx="0" ry="0" width="145" height="15" />
        <rect x="16" y="308" rx="0" ry="0" width="60" height="28" />
        <rect x="16" y="355" rx="0" ry="0" width="246" height="48" />
    </ContentLoader>
)

export default Skeleton;