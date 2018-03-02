import path from 'path';
import config from './rollup.base.config.js';

config.entry = path.join(__dirname, '..', 'src', 'frameworks', 'lite.js');
config.dest = path.join(__dirname, '..', 'dist', 'lite.js');
export default config;