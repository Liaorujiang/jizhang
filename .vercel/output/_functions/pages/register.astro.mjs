/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_CxmVvn8Q.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DojHdWFA.mjs';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-6"> <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">注册</h1> <!-- 错误提示 --> <div id="error-message" class="p-4 bg-red-50 border border-red-200 rounded-md mb-6 hidden"> <p class="text-red-800" id="error-text"></p> </div> <!-- 成功提示 --> <div id="success-message" class="p-4 bg-green-50 border border-green-200 rounded-md mb-6 hidden"> <p class="text-green-800">注册成功！正在跳转到登录页面...</p> </div> <form id="register-form" class="space-y-6"> <div> <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label> <input type="text" id="name" name="name" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="请输入姓名" required> </div> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label> <input type="email" id="email" name="email" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="请输入邮箱" required> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label> <input type="password" id="password" name="password" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="请输入密码" required> </div> <div> <label for="confirm-password" class="block text-sm font-medium text-gray-700 mb-1">确认密码</label> <input type="password" id="confirm-password" name="confirm-password" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="请确认密码" required> </div> <div> <button type="submit" class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
注册
</button> </div> <div class="text-center"> <p class="text-sm text-gray-700">
已有账号？ <a href="/login" class="text-blue-600 hover:text-blue-800">立即登录</a> </p> </div> </form> </div> ${renderScript($$result2, "D:/webjizhang/src/pages/register.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/webjizhang/src/pages/register.astro", void 0);

const $$file = "D:/webjizhang/src/pages/register.astro";
const $$url = "/register";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Register,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
