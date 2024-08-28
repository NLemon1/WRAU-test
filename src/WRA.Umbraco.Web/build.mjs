import * as esbuild from 'esbuild';
import process from "process";
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import purgecss from 'esbuild-plugin-purgecss';

const prod = (process.argv[2] === 'production');

let ctx = await esbuild.context({
    entryPoints: {
        'js/dist/global': './wwwroot/js/src/global.js',
        'js/dist/backoffice': './wwwroot/js/src/backoffice.js',
        'js/dist/housing-statistics': './wwwroot/js/src/housing-statistics.js',
        'css/dist/backoffice': './wwwroot/css/src/backoffice.scss',
        'css/dist/global': './wwwroot/css/src/global.scss'
    },
    outdir: './wwwroot',
    bundle: true,
    minify: prod,
    target: 'es2021',
    sourcemap: prod ? false : 'inline',
    plugins: [
        sassPlugin({
            async transform(source) {
                const { css } = await postcss([autoprefixer]).process(source);
                return css;
            }
        }),
        prod && purgecss({
            content: [
                './wwwroot/**/*.html',
                './wwwroot/**/*.js',
                './wwwroot/**/*.cshtml' // Add this line to include .cshtml files
            ],
            safelist: ['safelist-class'], // Add any classes you want to keep here
        })
    ].filter(Boolean), // Remove undefined values from plugins array
    define: {
        'global': 'window', // needed for global vars
    }
})

if (!prod) {
    await ctx.watch();
    console.log('watching...');
} else {
    await ctx.rebuild();
    ctx.dispose();
}