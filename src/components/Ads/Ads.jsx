"use client"

import { Adsense } from "@ctrl/react-adsense";
import React from "react";

const Ads = () => {
  return <div className="text-center adsbygoogle my-3">
  <Adsense
    client="ca-pub-2066100267293064"
    slot="7632305408"
    style={{ display: "block" }}
    layout="in-article"
    format="fluid"
  />
</div>;
};

export default Ads;
