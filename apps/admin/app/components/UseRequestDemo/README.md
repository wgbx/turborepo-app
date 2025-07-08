# useRequest 演示

本演示展示了 ahooks 的 `useRequest` Hook 的各种功能和使用方法。

## 功能特性

### 1. 基础用法 (BasicDemo)

- **自动请求**: 组件挂载时自动执行请求函数
- **手动请求**: 设置 `manual: true`，通过 `run` 方法手动触发
- **加载状态**: `loading` 状态自动管理，无需手动维护
- **错误处理**: `error` 状态自动捕获和处理
- **数据缓存**: 相同请求会自动使用缓存数据
- **刷新功能**: `refresh` 方法可以强制重新请求

### 2. 高级用法 (AdvancedDemo)

- **参数传递**: 通过 `run` 方法传递参数，支持动态参数更新
- **依赖更新**: 使用 `refreshDeps` 监听依赖变化自动重新请求
- **错误处理**: 通过 `onError` 回调处理特定错误逻辑
- **成功回调**: 通过 `onSuccess` 回调处理请求成功后的逻辑
- **取消请求**: 使用 `cancel` 方法取消正在进行的请求
- **请求去重**: 相同请求会自动去重，避免重复请求

### 3. 轮询请求 (PollingDemo)

- **轮询间隔**: 通过 `pollingInterval` 设置轮询间隔时间（毫秒）
- **页面隐藏控制**: `pollingWhenHidden` 控制页面隐藏时是否继续轮询
- **手动控制**: 通过 `run` 和 `cancel` 方法手动控制轮询的开始和停止
- **条件轮询**: 使用 `ready` 选项控制何时开始轮询
- **错误处理**: 轮询过程中的错误会自动处理，不会中断轮询
- **性能优化**: 合理设置轮询间隔，避免过于频繁的请求

### 4. 防抖请求 (DebounceDemo)

- **防抖延迟**: 通过 `debounceWait` 设置防抖延迟时间（毫秒）
- **自动触发**: 用户停止输入指定时间后自动触发请求
- **取消请求**: 在防抖期间的新请求会取消之前的请求
- **性能优化**: 减少不必要的网络请求，提升用户体验
- **适用场景**: 搜索建议、表单验证、实时过滤等
- **延迟设置**: 根据业务需求合理设置防抖延迟时间

### 5. 重试机制 (RetryDemo)

- **重试次数**: 通过 `retryCount` 设置最大重试次数
- **重试延迟**: `retryDelay` 设置首次重试的延迟时间
- **重试间隔**: `retryInterval` 设置后续重试的间隔时间
- **指数退避**: 支持指数退避算法，避免频繁重试
- **取消重试**: 通过 `cancel` 方法可以取消正在进行的重试
- **错误处理**: 重试失败后可以通过 `onError` 回调处理

### 6. 缓存管理 (CacheDemo)

- **缓存键**: 通过 `cacheKey` 设置缓存标识，相同键的数据会共享缓存
- **过期时间**: `staleTime` 设置数据过期时间，过期后仍可使用但会标记为过期
- **垃圾回收**: `cacheTime` 设置数据完全清除时间，超过时间后数据被删除
- **缓存共享**: 相同 `cacheKey` 的请求会共享缓存数据
- **缓存失效**: 通过 `refresh` 方法可以强制刷新缓存
- **性能优化**: 合理使用缓存可以减少网络请求，提升用户体验

## 使用示例

### 基础用法

```typescript
const { data, loading, error, run } = useRequest(fetchData, {
  manual: true,
  onSuccess: (data) => {
    console.log('请求成功:', data)
  },
  onError: (error) => {
    console.log('请求失败:', error)
  },
})
```

### 轮询请求

```typescript
const { data, loading, error } = useRequest(fetchStatus, {
  pollingInterval: 3000,
  pollingWhenHidden: false,
})
```

### 防抖请求

```typescript
const { data, loading, error, run } = useRequest(searchData, {
  manual: true,
  debounceWait: 500,
})
```

### 重试机制

```typescript
const { data, loading, error, run } = useRequest(uploadFile, {
  manual: true,
  retryCount: 3,
})
```

### 缓存管理

```typescript
const { data, loading, error, refresh } = useRequest(fetchUsers, {
  cacheKey: 'users',
  staleTime: 5000,
  cacheTime: 10000,
})
```

## 最佳实践

1. **合理使用缓存**: 对于不经常变化的数据，使用缓存可以减少网络请求
2. **设置合适的轮询间隔**: 避免过于频繁的请求，影响性能
3. **使用防抖**: 对于用户输入相关的请求，使用防抖可以提升用户体验
4. **错误处理**: 始终处理请求错误，提供友好的用户反馈
5. **取消请求**: 在组件卸载或用户操作时，及时取消不必要的请求
6. **重试策略**: 根据业务需求设置合适的重试次数和间隔

## 注意事项

- `useRequest` 会自动管理请求的生命周期，包括组件卸载时的清理
- 缓存数据会在内存中保存，注意内存使用
- 轮询请求会持续进行，注意在适当的时候停止
- 防抖和节流功能可以有效减少不必要的请求
- 重试机制应该根据具体的错误类型来决定是否重试
