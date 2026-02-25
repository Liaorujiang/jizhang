import { e as createComponent, n as renderHead, l as renderScript, o as renderSlot, r as renderTemplate } from './astro/server_CxmVvn8Q.mjs';
import 'piccolore';
import 'clsx';
/* empty css                       */

const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="zh-CN"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>个人记账</title>${renderHead()}</head> <body class="bg-gray-50 min-h-screen"> <header class="bg-blue-600 text-white shadow-md"> <div class="container mx-auto px-4 py-4 flex justify-between items-center"> <h1 class="text-2xl font-bold">个人记账</h1> <nav> <ul class="flex space-x-6"> <li><a href="/" class="hover:text-blue-200 transition-colors">首页</a></li> <li><a href="/add" class="hover:text-blue-200 transition-colors">记账</a></li> <li><a href="/reports" class="hover:text-blue-200 transition-colors">报表</a></li> <li><a href="/settings" class="hover:text-blue-200 transition-colors">设置</a></li> <!-- 登录状态显示 --> <li id="login-state"> <a href="/login" class="hover:text-blue-200 transition-colors">登录</a> </li> <li id="register-state"> <a href="/register" class="hover:text-blue-200 transition-colors">注册</a> </li> <!-- 登录后显示 --> <li id="user-state" class="hidden"> <div class="flex items-center space-x-4"> <span id="user-name" class="font-medium"></span> <button id="logout-btn" class="hover:text-blue-200 transition-colors">退出</button> </div> </li> </ul> </nav> </div> </header> ${renderScript($$result, "D:/webjizhang/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")} <main class="container mx-auto px-4 py-8"> ${renderSlot($$result, $$slots["default"])} </main> <footer class="bg-gray-800 text-white py-6 mt-12"> <div class="container mx-auto px-4 text-center"> <p>&copy; 2026 个人记账 - 管理您的财务</p> </div> </footer> </body></html>`;
}, "D:/webjizhang/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
