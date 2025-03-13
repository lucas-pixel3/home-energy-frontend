// src/directives.js
export default {
  // 焦点指令：给元素添加焦点
  focus: {
    mounted(el) {
      el.focus();
    }
  },
  // 大写转换指令：将元素文本转为大写
  capitalize: {
    beforeMount(el) {
      if (el && el.innerText) {
        el.innerText = el.innerText.toUpperCase();
      }
    }
  }
};
