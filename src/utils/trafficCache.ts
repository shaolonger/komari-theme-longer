/**
 * 流量计算缓存工具
 * 优化流量相关的重复计算
 */

import { getTrafficPercentage as originalGetTrafficPercentage, getTrafficUsage as originalGetTrafficUsage } from './formatHelper';

// 创建一个简单的缓存key生成函数
function createTrafficKey(
  totalUp: number,
  totalDown: number,
  limit: number | undefined,
  type: string | undefined
): string {
  return `${totalUp}_${totalDown}_${limit || 0}_${type || 'none'}`;
}

// 流量计算结果缓存
const trafficCache = new Map<string, { percentage: number; usage: number }>();
const MAX_CACHE_SIZE = 500;

/**
 * 带缓存的流量计算函数
 * 同时返回百分比和使用量，减少重复计算
 */
export function getTrafficStats(
  totalUp: number,
  totalDown: number,
  limit?: number,
  type?: "max" | "min" | "sum" | "up" | "down"
): { percentage: number; usage: number } {
  // 如果没有限制，直接返回0
  if (!limit || limit <= 0 || !type) {
    return { percentage: 0, usage: 0 };
  }

  const key = createTrafficKey(totalUp, totalDown, limit, type);
  
  // 检查缓存
  let result = trafficCache.get(key);
  if (result) {
    return result;
  }
  
  // 计算新值
  const percentage = originalGetTrafficPercentage(totalUp, totalDown, limit, type);
  const usage = originalGetTrafficUsage(totalUp, totalDown, type);
  
  result = { percentage, usage };
  
  // 维护缓存大小
  if (trafficCache.size >= MAX_CACHE_SIZE) {
    // 删除最旧的条目（Map保持插入顺序）
    const firstKey = trafficCache.keys().next().value;
    if (firstKey) {
      trafficCache.delete(firstKey);
    }
  }
  
  trafficCache.set(key, result);
  return result;
}

/**
 * 清除流量计算缓存
 */
export function clearTrafficCache(): void {
  trafficCache.clear();
}

/**
 * 导出原始函数以保持兼容性
 */
export { getTrafficPercentage, getTrafficUsage } from './formatHelper';