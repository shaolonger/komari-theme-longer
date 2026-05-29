/**
 * 格式化工具函数
 */

/**
 * 格式化字节数，支持简短格式
 * @param bytes 字节数
 * @param compact 是否使用紧凑格式
 * @param decimals 小数位数（仅对非紧凑格式有效）
 * @returns 格式化后的字符串
 */
export function formatBytes(bytes: number, compact = false, decimals = 2): string {
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const compactUnits = ["B", "K", "M", "G", "T", "P"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  if (compact) {
    // 紧凑格式：小于 10 显示一位小数，否则不显示小数
    const formatted = size < 10 ? size.toFixed(1) : Math.round(size).toString();
    return `${formatted}${compactUnits[unitIndex]}`;
  }

  return `${size.toFixed(decimals)} ${units[unitIndex]}`;
}

/**
 * 格式化时间（秒）为可读格式
 * @param seconds 秒数
 * @param t 翻译函数
 * @returns 格式化后的时间字符串
 */
export function formatUptime(seconds: number, t: any): string {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) {
    return t("nodeCard.uptime_days", {
      days,
      hours,
      defaultValue: `${days}d ${hours}h`,
    });
  } else if (hours > 0) {
    return t("nodeCard.uptime_hours", {
      hours,
      minutes,
      defaultValue: `${hours}h ${minutes}m`,
    });
  } else {
    return t("nodeCard.uptime_minutes", {
      minutes,
      defaultValue: `${minutes}m`,
    });
  }
}

/**
 * 计算流量使用百分比
 * @param totalUp 上传总量（字节）
 * @param totalDown 下载总量（字节）
 * @param limit 流量限制（字节）
 * @param type 限制类型
 * @returns 使用百分比（0-100）
 */
export function getTrafficPercentage(
  totalUp: number,
  totalDown: number,
  limit?: number,
  type?: "max" | "min" | "sum" | "up" | "down"
): number {
  if (!limit || limit <= 0 || !type) return 0;
  
  // 确保数值有效
  const up = totalUp || 0;
  const down = totalDown || 0;
  
  switch (type) {
    case "max":
      return (Math.max(up, down) / limit) * 100;
    case "min":
      return (Math.min(up, down) / limit) * 100;
    case "sum":
      return ((up + down) / limit) * 100;
    case "up":
      return (up / limit) * 100;
    case "down":
      return (down / limit) * 100;
    default:
      return 0;
  }
}

/**
 * 获取流量使用的实际值
 * @param totalUp 上传总量（字节）
 * @param totalDown 下载总量（字节）
 * @param type 限制类型
 * @returns 实际使用量（字节）
 */
export function getTrafficUsage(
  totalUp: number,
  totalDown: number,
  type?: "max" | "min" | "sum" | "up" | "down"
): number {
  // 确保数值有效
  const up = totalUp || 0;
  const down = totalDown || 0;
  
  switch (type) {
    case "max":
      return Math.max(up, down);
    case "min":
      return Math.min(up, down);
    case "sum":
      return up + down;
    case "up":
      return up;
    case "down":
      return down;
    default:
      return up + down;
  }
}