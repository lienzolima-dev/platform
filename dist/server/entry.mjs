import { r as renderers } from './chunks/_@astro-renderers_BpdHmnqV.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_vO0KEc-o.mjs';
import { manifest } from './manifest_oIMrE8ZS.mjs';
import './_astro-internal_middleware.mjs';

const _page0 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page1 = () => import('./pages/_image.astro.mjs');
const _page2 = () => import('./pages/admin/add-booking.astro.mjs');
const _page3 = () => import('./pages/admin/bookings.astro.mjs');
const _page4 = () => import('./pages/admin/complaints.astro.mjs');
const _page5 = () => import('./pages/admin/extras.astro.mjs');
const _page6 = () => import('./pages/admin/manage/collaborators.astro.mjs');
const _page7 = () => import('./pages/admin/manage/users.astro.mjs');
const _page8 = () => import('./pages/admin/services.astro.mjs');
const _page9 = () => import('./pages/admin.astro.mjs');
const _page10 = () => import('./pages/api/export/bookings.astro.mjs');
const _page11 = () => import('./pages/home.astro.mjs');
const _page12 = () => import('./pages/libro-de-reclamos.astro.mjs');
const _page13 = () => import('./pages/login/google/callback.astro.mjs');
const _page14 = () => import('./pages/login/google.astro.mjs');
const _page15 = () => import('./pages/login.astro.mjs');
const _page16 = () => import('./pages/logout.astro.mjs');
const _page17 = () => import('./pages/politica-de-privacidad.astro.mjs');
const _page18 = () => import('./pages/signup.astro.mjs');
const _page19 = () => import('./pages/verify-email.astro.mjs');
const _page20 = () => import('./pages/verify-your-email.astro.mjs');
const _page21 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.15.9_@types+node@22.9.0_rollup@4.22.4_typescript@5.6.3/node_modules/astro/dist/actions/runtime/route.js", _page0],
    ["node_modules/.pnpm/astro@4.15.9_@types+node@22.9.0_rollup@4.22.4_typescript@5.6.3/node_modules/astro/dist/assets/endpoint/node.js", _page1],
    ["src/pages/admin/add-booking.astro", _page2],
    ["src/pages/admin/bookings.astro", _page3],
    ["src/pages/admin/complaints.astro", _page4],
    ["src/pages/admin/extras.astro", _page5],
    ["src/pages/admin/manage/collaborators.astro", _page6],
    ["src/pages/admin/manage/users.astro", _page7],
    ["src/pages/admin/services.astro", _page8],
    ["src/pages/admin/index.astro", _page9],
    ["src/pages/api/export/bookings.ts", _page10],
    ["src/pages/home.astro", _page11],
    ["src/pages/libro-de-reclamos.astro", _page12],
    ["src/pages/login/google/callback.ts", _page13],
    ["src/pages/login/google/index.ts", _page14],
    ["src/pages/login/index.astro", _page15],
    ["src/pages/logout/index.ts", _page16],
    ["src/pages/politica-de-privacidad.astro", _page17],
    ["src/pages/signup.astro", _page18],
    ["src/pages/verify-email/index.ts", _page19],
    ["src/pages/verify-your-email.astro", _page20],
    ["src/pages/index.astro", _page21]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///home/runner/work/platform/platform/dist/client/",
    "server": "file:///home/runner/work/platform/platform/dist/server/",
    "host": false,
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
