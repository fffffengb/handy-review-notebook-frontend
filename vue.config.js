import { join } from 'path';
function resolve (dir) {
    return join(__dirname, dir)
}

export const lintOnSave = true;
export function chainWebpack(config) {
  config.resolve.alias
    .set('@$', resolve('src'))
    .set('assets', resolve('src/assets'))
    .set('components', resolve('src/components'))
    .set('layout', resolve('src/layout'));
}
export const css = {
  loaderOptions: {
    less: {
      javascriptEnabled: true
    }
  }
};

