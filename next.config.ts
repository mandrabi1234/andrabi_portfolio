import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build the whole site as plain HTML files in /out, so any static host
  // (Render Static Site, GitHub Pages, Netlify, S3) can serve it.
  output: "export",
  // Write /projects/x/index.html instead of /projects/x.html, so clean URLs
  // like /projects/x work on hosts that don't add ".html" for you.
  trailingSlash: true,
  // Next's on-the-fly image optimizer needs a running server, which a static
  // site doesn't have; images are served as-is from /public instead.
  images: { unoptimized: true },
};

export default nextConfig;
