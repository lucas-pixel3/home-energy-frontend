// src/filters/index.js
export default {
  // 货币格式化
  currency(value) {
    if (typeof value === 'number') {
      return `$${value.toFixed(2)}`;
    }
    return value;
  },
  // 转大写
  uppercase(value) {
    if (typeof value === 'string') {
      return value.toUpperCase();
    }
    return value;
  }
};
