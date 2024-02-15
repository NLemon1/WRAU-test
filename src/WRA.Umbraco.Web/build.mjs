import * as esbuild from 'esbuild';
import process from "process";
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const prod = (process.argv[2] === 'production');

let ctx = await esbuild.context({
    entryPoints: { 'js/dist/global': './wwwroot/js/src/global.js', 'css/dist/global': './wwwroot/css/src/global.scss' },
    outdir: './wwwroot',
    bundle: true,
    minify: prod ? true : false,
    target: 'es2017',
    sourcemap: prod ? false : 'inline',
    plugins: [
        sassPlugin({
            async transform(source, resolveDir) {
                const { css } = await postcss([autoprefixer]).process(source)
                return css
            }
        })
    ],
    define: {
        "global": 'window',//needed for global vars
    }
})

if (!prod) {
    await ctx.watch();
    console.log('watching...');
} else {
    await ctx.rebuild();
    ctx.dispose();
}