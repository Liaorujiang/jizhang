/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_CxmVvn8Q.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DojHdWFA.mjs';
export { renderers } from '../renderers.mjs';

const $$Settings = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-bold text-gray-800 mb-6">设置</h1> <div class="grid grid-cols-1 md:grid-cols-3 gap-6"> <!-- 左侧导航 --> <div class="bg-white rounded-lg shadow-md p-4"> <nav> <ul class="space-y-2"> <li> <a href="#personal" class="block px-4 py-2 rounded-md bg-blue-50 text-blue-600 font-medium">个人信息</a> </li> <li> <a href="#categories" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">分类管理</a> </li> <li> <a href="#payment" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">支付方式管理</a> </li> <li> <a href="#backup" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">数据备份与恢复</a> </li> <li> <a href="#about" class="block px-4 py-2 rounded-md hover:bg-gray-100 transition-colors">关于应用</a> </li> </ul> </nav> </div> <!-- 右侧内容 --> <div class="md:col-span-2 space-y-6"> <!-- 个人信息 --> <div id="personal" class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-xl font-semibold text-gray-800 mb-4">个人信息</h2> <form id="personal-form" class="space-y-4"> <div> <label for="name" class="block text-sm font-medium text-gray-700 mb-1">姓名</label> <input type="text" id="name" name="name" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"> </div> <div> <label for="email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label> <input type="email" id="email" name="email" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" disabled> </div> <div> <label for="password" class="block text-sm font-medium text-gray-700 mb-1">修改密码</label> <input type="password" id="password" name="password" placeholder="输入新密码" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"> </div> <div class="flex justify-end"> <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
保存修改
</button> </div> </form> </div> <!-- 分类管理 --> <div id="categories" class="bg-white rounded-lg shadow-md p-6"> <div class="flex justify-between items-center mb-4"> <h2 class="text-xl font-semibold text-gray-800">分类管理</h2> <button id="add-category" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
+ 添加分类
</button> </div> <div class="overflow-x-auto"> <table class="w-full"> <thead> <tr class="border-b border-gray-200"> <th class="text-left py-3 px-4 font-medium text-gray-500">名称</th> <th class="text-left py-3 px-4 font-medium text-gray-500">类型</th> <th class="text-left py-3 px-4 font-medium text-gray-500">父分类</th> <th class="text-right py-3 px-4 font-medium text-gray-500">操作</th> </tr> </thead> <tbody id="category-list"> <!-- 分类列表将通过JavaScript动态生成 --> </tbody> </table> </div> </div> <!-- 支付方式管理 --> <div id="payment" class="bg-white rounded-lg shadow-md p-6"> <div class="flex justify-between items-center mb-4"> <h2 class="text-xl font-semibold text-gray-800">支付方式管理</h2> <button id="add-payment" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
+ 添加支付方式
</button> </div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4" id="payment-list"> <!-- 支付方式列表将通过JavaScript动态生成 --> </div> </div> <!-- 数据备份与恢复 --> <div id="backup" class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-xl font-semibold text-gray-800 mb-4">数据备份与恢复</h2> <div class="space-y-4"> <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-md"> <p class="text-yellow-800">定期备份您的数据，以防数据丢失。</p> </div> <div class="flex flex-col sm:flex-row gap-4"> <button id="export-data" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
导出数据
</button> <button id="import-data" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
导入数据
</button> <button id="clear-data" class="flex-1 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
清空数据
</button> </div> </div> </div> <!-- 关于应用 --> <div id="about" class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-xl font-semibold text-gray-800 mb-4">关于应用</h2> <div class="space-y-2"> <p class="text-gray-700">个人记账 v1.0.0</p> <p class="text-gray-500">一个简单易用的个人财务管理工具</p> <p class="text-gray-500 mt-4">© 2026 个人记账 - 保留所有权利</p> </div> </div> </div> </div>  <div id="category-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"> <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"> <h3 class="text-xl font-bold text-gray-800 mb-4">编辑分类</h3> <form id="category-form" class="space-y-4"> <input type="hidden" id="category-id"> <div> <label for="category-name" class="block text-sm font-medium text-gray-700 mb-1">名称</label> <input type="text" id="category-name" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required> </div> <div> <label for="category-type" class="block text-sm font-medium text-gray-700 mb-1">类型</label> <select id="category-type" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required> <option value="income">收入</option> <option value="expense">支出</option> </select> </div> <div> <label for="category-parent" class="block text-sm font-medium text-gray-700 mb-1">父分类</label> <select id="category-parent" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"> <option value="">无</option> </select> </div> <div class="flex justify-end space-x-4"> <button type="button" id="cancel-category" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
取消
</button> <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
保存
</button> </div> </form> </div> </div>  <div id="payment-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden"> <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full"> <h3 class="text-xl font-bold text-gray-800 mb-4">编辑支付方式</h3> <form id="payment-form" class="space-y-4"> <input type="hidden" id="payment-id"> <div> <label for="payment-name" class="block text-sm font-medium text-gray-700 mb-1">名称</label> <input type="text" id="payment-name" class="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" required> </div> <div class="flex justify-end space-x-4"> <button type="button" id="cancel-payment" class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
取消
</button> <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
保存
</button> </div> </form> </div> </div> ${renderScript($$result2, "D:/webjizhang/src/pages/settings.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/webjizhang/src/pages/settings.astro", void 0);

const $$file = "D:/webjizhang/src/pages/settings.astro";
const $$url = "/settings";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Settings,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
