import path from 'path';
import config from './rollup.base.config.js';

config.entry = path.join(__dirname, '..', 'src', 'frameworks', 'render.js');
config.dest = path.join(__dirname, '..', 'dist', 'render.js');
export default config;