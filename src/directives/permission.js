import store from '@/store'

export default {
  inserted(el, binding) {
    const { value } = binding
    const roles = store.getters && store.getters.roles

    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => permissionRoles.includes(role))

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('需要角色! 例如: v-permission="[\'admin\',\'editor\']"')
    }
  }
}