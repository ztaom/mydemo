import path from 'path';
import config from './rollup.base.config.js';

config.entry = path.join(__dirname, '..', 'src', 'frameworks', 'legacy.js');
config.dest = path.join(__dirname, '..', 'dist', 'legacy.js');
export default config;