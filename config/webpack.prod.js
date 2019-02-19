const merge = require('webpack-merge');
const common = require('./webpack.common');

// Webpack plugins for production
// Compress assets after build
const CompressionPlugin = require('compression-webpack-plugin');
// Compression algorithm
const zopfli = require('@gfx/zopfli');
// Workbox plugin to generate our SW
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

// Set NODE_ENV and BABEL_ENV to build scripts
process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // Generate SW
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      importWorkboxFrom: 'cdn',
      navigateFallback: '/index.html',
      navigateFallbackBlacklist: [
        // Exclude URLs starting with /_, as they're likely an API call
        new RegExp('^/_'),
        // Exclude URLs containing a dot, as they're likely a resource in
        // public/ and not a SPA route
        new RegExp('/[^/]+\\.[^/]+$'),
      ],
    }),
    // Compress assets
    new CompressionPlugin({
      compressionOptions: {
        numiterations: 15
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      }
    }),
  ],
});
