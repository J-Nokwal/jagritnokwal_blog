import type { NextConfig } from "next";
import   createWithVercelToolbar  from  "@vercel/toolbar/plugins/next" ;


const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ]
    
  }
};
const withVercelToolbar = createWithVercelToolbar();

export default withVercelToolbar(nextConfig);
