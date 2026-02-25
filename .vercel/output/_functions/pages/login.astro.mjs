/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_CxmVvn8Q.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DojHdWFA.mjs';
export { renderers } from '../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6"> <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">登录</h1> <!-- 错误提示 --> <div id="error-message" class="p-4 bg-red-50 border border-red-200 rounded-md mb-6 hidden"> <p class="text-red-800" id="error-text"></p> </div> <form id="login-form" class="space-y-6"> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label> <input type="email" id="email" name="email" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="请输入邮箱" required> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label> <input type="password" id="password" name="password" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="请输入密码" required> </div> <div class="flex items-center justify-between"> <div class="flex items-center"> <input type="checkbox" id="remember" name="remember" class="h-4 w-4 text-blue-600"> <label for="remember" class="ml-2 text-sm text-gray-700">记住我</label> </div> <a href="#" class="text-sm text-blue-600 hover:text-blue-800">忘记密码？</a> </div> <div> <button type="submit" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
登录
</button> </div> <div class="text-center"> <p class="text-sm text-gray-700">
还没有账号？ <a href="/register" class="text-blue-600 hover:text-blue-800">立即注册</a> </p> </div> </form> </div> ${renderScript($$result2, "D:/webjizhang/src/pages/login.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/webjizhang/src/pages/login.astro", void 0);

const $$file = "D:/webjizhang/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
