/* empty css                               */
import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, l as renderScript } from '../chunks/astro/server_CxmVvn8Q.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_DojHdWFA.mjs';
export { renderers } from '../renderers.mjs';

const $$Reports = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl font-bold text-gray-800 mb-6">财务报表</h1>  <div class="bg-white rounded-lg shadow-md p-4 mb-6"> <div class="flex flex-wrap items-center gap-4"> <div> <label class="block text-sm font-medium text-gray-700 mb-1">时间范围</label> <select id="time-range" class="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"> <option>本月</option> <option>上月</option> <option>本季度</option> <option>本年</option> <option>自定义</option> </select> </div> <div class="flex items-end"> <button id="apply-filter" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
应用
</button> </div> </div> </div>  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-lg font-semibold text-gray-700 mb-4">收支趋势</h2> <div class="h-64 bg-gray-100 rounded-md flex items-center justify-center"> <p class="text-gray-500" id="income-expense-trend">收支趋势图表</p> </div> </div> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-lg font-semibold text-gray-700 mb-4">收支对比</h2> <div class="h-64 bg-gray-100 rounded-md flex items-center justify-center"> <p class="text-gray-500" id="income-expense-comparison">收支对比图表</p> </div> </div> </div>  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-lg font-semibold text-gray-700 mb-4">支出分类</h2> <div class="h-64 bg-gray-100 rounded-md flex items-center justify-center"> <p class="text-gray-500" id="expense-category-analysis">支出分类图表</p> </div> </div> <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-lg font-semibold text-gray-700 mb-4">收入来源</h2> <div class="h-64 bg-gray-100 rounded-md flex items-center justify-center"> <p class="text-gray-500" id="income-source-analysis">收入来源图表</p> </div> </div> </div>  <div class="bg-white rounded-lg shadow-md p-6 mb-6"> <h2 class="text-lg font-semibold text-gray-700 mb-4">支付方式分析</h2> <div class="h-64 bg-gray-100 rounded-md flex items-center justify-center"> <p class="text-gray-500" id="payment-method-analysis">支付方式分析图表</p> </div> </div>  <div class="bg-white rounded-lg shadow-md p-6"> <h2 class="text-lg font-semibold text-gray-700 mb-4">储蓄率变化</h2> <div class="h-64 bg-gray-100 rounded-md flex items-center justify-center"> <p class="text-gray-500" id="savings-rate-trend">储蓄率变化图表</p> </div> </div> ${renderScript($$result2, "D:/webjizhang/src/pages/reports.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "D:/webjizhang/src/pages/reports.astro", void 0);

const $$file = "D:/webjizhang/src/pages/reports.astro";
const $$url = "/reports";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Reports,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
