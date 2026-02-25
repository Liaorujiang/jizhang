/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_CxmVvn8Q.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DojHdWFA.mjs';
export { renderers } from '../renderers.mjs';

const $$Add = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6"> <h1 class="text-2xl font-bold text-gray-800 mb-6">添加记账记录</h1> <!-- 登录提示 --> <div id="login提示" class="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-6 hidden"> <p class="text-yellow-800">请先 <a href="/login" class="text-blue-600 hover:underline">登录</a> 后再添加记账记录</p> </div> <form id="transaction-form" class="space-y-6"> <!-- 交易类型 --> <div> <label class="block text-sm font-medium text-gray-700 mb-1">交易类型</label> <div class="flex space-x-4"> <label class="flex items-center"> <input type="radio" name="type" value="income" class="h-4 w-4 text-blue-600" checked> <span class="ml-2 text-green-600 font-medium">收入</span> </label> <label class="flex items-center"> <input type="radio" name="type" value="expense" class="h-4 w-4 text-blue-600"> <span class="ml-2 text-red-600 font-medium">支出</span> </label> <label class="flex items-center"> <input type="radio" name="type" value="transfer" class="h-4 w-4 text-blue-600"> <span class="ml-2 text-blue-600 font-medium">转账</span> </label> </div> </div> <!-- 金额 --> <div> <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">金额</label> <div class="relative"> <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">¥</span> <input type="number" id="amount" name="amount" step="0.01" min="0" class="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="0.00" required> </div> </div> <!-- 分类 --> <div> <label for="category" class="block text-sm font-medium text-gray-700 mb-1">分类</label> <select id="category" name="category" class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required> <option value="">请选择分类</option> <!-- 分类选项将通过JavaScript动态生成 --> </select> </div> <!-- 支付方式 --> <div> <label for="payment" class="block text-sm font-medium text-gray-700 mb-1">支付方式</label> <select id="payment" name="payment" class="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required> <option value="">请选择支付方式</option> <!-- 支付方式选项将通过JavaScript动态生成 --> </select> </div> <!-- 日期和时间 --> <div class="grid grid-cols-2 gap-4"> <div> <label for="date" class="block text-sm font-medium text-gray-700 mb-1">日期</label> <input type="date" id="date" name="date" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required> </div> <div> <label for="time" class="block text-sm font-medium text-gray-700 mb-1">时间</label> <input type="time" id="time" name="time" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required> </div> </div> <!-- 备注 --> <div> <label for="note" class="block text-sm font-medium text-gray-700 mb-1">备注</label> <textarea id="note" name="note" rows="3" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="添加备注（可选）"></textarea> </div> <!-- 提交按钮 --> <div class="flex justify-end space-x-4"> <a href="/" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
取消
</a> <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
保存
</button> </div> </form> </div> ${renderScript($$result2, "D:/webjizhang/src/pages/add.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/webjizhang/src/pages/add.astro", void 0);

const $$file = "D:/webjizhang/src/pages/add.astro";
const $$url = "/add";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Add,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
