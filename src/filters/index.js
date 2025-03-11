// 格式化时间
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (!date) return ''
    date = new Date(date)
    
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      'S': date.getMilliseconds()
    }
    
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    
    return fmt
  }
  
  // 格式化货币
  export function formatCurrency(value) {
    if (!value) return '0.00'
    return '¥' + parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
  
  // 截断文本
  export function truncateText(text, length = 30) {
    if (!text) return ''
    if (text.length <= length) return text
    return text.substring(0, length) + '...'
  }
  
  const filters = {
    formatDate,
    formatCurrency,
    truncateText
  }
  
  export default {
    install(Vue) {
      Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
      })
    }
  }