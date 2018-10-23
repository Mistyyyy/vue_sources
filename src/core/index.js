import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'


// 这个Vue上已经有了很多实例属性和方法 这些是在 instance/index.js 进行挂载的
// 接下来的方法是在Vue构造函数上直接添加必要的工具方法
initGlobalAPI(Vue)

// 添加只读属性 $isServer
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
})

// 添加只读属性 $ssrContext
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
})
// 添加普通属性 FunctionalRenderContext
// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
})

Vue.version = '__VERSION__'

export default Vue
