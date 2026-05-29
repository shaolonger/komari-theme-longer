/**
 * 格式化缓存工具 - 优化频繁调用的格式化函数
 */

import { formatBytes as originalFormatBytes } from './formatHelper';

// 简单的 LRU 缓存实现
class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // 移动到末尾（最近使用）
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // 如果已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    // 如果达到最大容量，删除最旧的
    else if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}

// 创建格式化缓存
const bytesCache = new LRUCache<string, string>(200);
const bytesCompactCache = new LRUCache<string, string>(200);
const bytesCustomCache = new LRUCache<string, string>(200);

/**
 * 带缓存的 formatBytes 函数
 * 对于相同的输入，返回缓存的结果
 */
export function formatBytes(bytes: number, compact = false, decimals = 2): string {
  // 根据参数选择不同的缓存
  let cache: LRUCache<string, string>;
  let key: string;
  
  if (compact) {
    cache = bytesCompactCache;
    key = bytes.toString();
  } else if (decimals !== 2) {
    cache = bytesCustomCache;
    key = `${bytes}_${decimals}`;
  } else {
    cache = bytesCache;
    key = bytes.toString();
  }
  
  let result = cache.get(key);
  if (result === undefined) {
    result = originalFormatBytes(bytes, compact, decimals);
    cache.set(key, result);
  }
  
  return result;
}

/**
 * 清除格式化缓存
 * 在某些场景下可能需要清除缓存
 */
export function clearFormatCache(): void {
  bytesCache.clear();
  bytesCompactCache.clear();
  bytesCustomCache.clear();
}

/**
 * 批量格式化 - 减少函数调用开销
 */
export function batchFormatBytes(values: number[], compact = false): string[] {
  return values.map(v => formatBytes(v, compact));
}