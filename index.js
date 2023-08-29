import { readFile, writeFile } from 'node:fs/promises';
import { ArgumentParser } from 'argparse';
import { minify } from 'minify';
import * as sass from 'sass';
import * as watch from 'watch';

const parser = new ArgumentParser();
parser.add_argument('-e', '--env', { help: 'Environment name', default: 'dev' });
const { env } = parser.parse_args();

const errHandler = err => console.error(err);
const pathCss = './main.css';

function compileSass() {
  const { css } = sass.compile('./styles/main.scss');
  writeFile(pathCss, css, { encoding: 'utf-8' })
    .catch(errHandler)
    .then(() => { console.log('sass compiled') });
}

function watchSass() {
  const recompileSass = () => {
    compileSass();
  };
  watch.watchTree('./styles', recompileSass);
}

function minifyCss() {
  minify(pathCss)
    .catch(errHandler)
    .then(() => { console.log('css minified') });
}

if (env === 'dev') {
  compileSass();
  watchSass();
} else {
  compileSass();
  minifyCss();
}
