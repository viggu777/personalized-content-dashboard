import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the file-tracing root to this project so Next doesn't pick up an
  // unrelated lockfile higher up the tree.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
