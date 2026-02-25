import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_sTTMlAda.mjs';
import { manifest } from './manifest_ClCks_n-.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/add.astro.mjs');
const _page2 = () => import('./pages/api/auth/login.astro.mjs');
const _page3 = () => import('./pages/api/auth/me.astro.mjs');
const _page4 = () => import('./pages/api/auth/register.astro.mjs');
const _page5 = () => import('./pages/api/auth/update.astro.mjs');
const _page6 = () => import('./pages/api/categories.astro.mjs');
const _page7 = () => import('./pages/api/payment-methods.astro.mjs');
const _page8 = () => import('./pages/api/records.astro.mjs');
const _page9 = () => import('./pages/login.astro.mjs');
const _page10 = () => import('./pages/register.astro.mjs');
const _page11 = () => import('./pages/reports.astro.mjs');
const _page12 = () => import('./pages/settings.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/add.astro", _page1],
    ["src/pages/api/auth/login.ts", _page2],
    ["src/pages/api/auth/me.ts", _page3],
    ["src/pages/api/auth/register.ts", _page4],
    ["src/pages/api/auth/update.ts", _page5],
    ["src/pages/api/categories.ts", _page6],
    ["src/pages/api/payment-methods.ts", _page7],
    ["src/pages/api/records.ts", _page8],
    ["src/pages/login.astro", _page9],
    ["src/pages/register.astro", _page10],
    ["src/pages/reports.astro", _page11],
    ["src/pages/settings.astro", _page12],
    ["src/pages/index.astro", _page13]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "866cc048-894d-43a0-88df-d0be9f13e7ad",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
