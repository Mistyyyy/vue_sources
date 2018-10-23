import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue) // 是否通过new 来创建实例化vue
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
// 这些方法在Vue文件被导入到本地IDE中就会被执行 而 构造函数会在被调用时才会执行初始化
// 为什么会这么做呢 ？ 因为Vue在实例化之前会做很多的工作 如：在构造函数的原型上添加实例方法和属性 给构造函数添加工具方法和属性
// 试想一下 你在写一个构造函数的时候 在该构造函数被实例化之前 也会进行添加实例方法和工具方法
// 举个例子
/**
 * function Bar(options) {
 *  this.options = options
 * }
 * Bar.prototype.m = 'aaa'
 * Bar.prototype.find = function() {
 *  console.log(this.options)
 * }
 * Bar.VERSION = '1.1.1'
*/
initMixin(Vue)  //给Vue.prototype添加 _init()实例方法
stateMixin(Vue)  //给Vue.prototype添加 $data $props $set() $delete() $watch()实例属性 其中 $data 和 $props和示例的_data 和 _props建立响应式关系
eventsMixin(Vue) //给Vue.prototype添加 $on() $once() $emit() $off()的实例方法
lifecycleMixin(Vue) //给Vue.prototype添加 _update() $forceUpdate() $destory()的实例方法
renderMixin(Vue) //给Vue.prototype添加 $nextTick() _render()的实例方法

export default Vue
