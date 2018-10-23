/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  // 只读属性config
  Object.defineProperty(Vue, 'config', configDef)
  // Vue.config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
 // optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  //silent: false,

  /**
   * Show production mode tip message on boot?
   */
  //productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  //devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  //performance: false,

  /**
   * Error handler for watcher errors
   */
  //errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  //warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  //ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  //keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  //isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  //isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  //isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  //getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  //parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  //mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  //async: true,

  /**
   * Exposed for legacy reasons
   */
  _//lifecycleHooks: LIFECYCLE_HOOKS
//}

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 添加全局属性 util 所以以下四个方法不作为公共api暴露在外面
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  // 添加工具方法 set delete nextTick options

  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  Vue.options = Object.create(null)
  /**
     * ASSET_TYPES = [
      'component',
      'directive',
      'filter'
    ]
  */
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue
  // 继承的方法 使得builtInComponents属性复制一份到Vue.options.components上
  extend(Vue.options.components, builtInComponents)

  initUse(Vue) // 使的vue可以集成第三方插件来使用 即添加工具方法Vue.use()
  initMixin(Vue) // 给Vue添加mixin的工具方法
  initExtend(Vue) // 给Vue添加cid属性和extend工具方法
  initAssetRegisters(Vue) //给Vue添加component directive filter工具方法
}
