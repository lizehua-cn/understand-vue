# 理解 vue-core

`git rm -r -f 'xxx'`

<!-- TODO 如何清除线上历史记录 -->

当文件被误提交时, 使用此命令可以删除本地以及线上的记录

1. vue 响应式
   vue 响应式是由 es6 中 proxy 和 Reflect 配合实现的
   用户在获取响应式属性时触发 `track` 方法收集依赖(维护一个 weakMap 的对象, 把响应式属性的每一个 effect 都存到 set 中)
   当设置值时触发 `trigger` 方法执行 set 中所有 `effect.run`
2. 计算属性
   计算属性默认创建一个 effect,把 getter 传入,当用户获取值时执行 effect.run (也就是执行 getter 方法)返回 getter 执行结果,当设置值时,触发 effect 调度函数,将缓存清空,下次 getter 可以获取新值
3. watch
   watch 也是一个 effect, 默认先执行 run 获取原始值(oldVal), 当值变更时触发依赖(也就是触发 watch 的第二个参数,并传入新值,老值)
