import React from "react"
import ContentLoader from "react-content-loader"

const MarketItemLoader  = () => (
    <ContentLoader
        speed={0}
        width={380}
        height={90}
        viewBox="0 0 380 90"
        backgroundColor="#b69370"
        foregroundColor="#60432f"
    >
        <rect x="11" y="10" rx="7" ry="7" width="65" height="65" />
        <rect x="258" y="30" rx="20" ry="20" width="108" height="36" />
        <rect x="104" y="38" rx="10" ry="10" width="140" height="16" />
    </ContentLoader>
)

export default MarketItemLoader;