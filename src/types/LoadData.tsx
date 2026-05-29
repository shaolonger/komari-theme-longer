export interface LoadRecord {
  client: string;
  time: string;
  cpu: number;
  gpu: number;
  ram: number;
  ram_total: number;
  swap: number;
  swap_total: number;
  load: number;
  temp: number;
  disk: number;
  disk_total: number;
  net_in: number;
  net_out: number;
  net_total_up: number;
  net_total_down: number;
  process: number;
  connections: number;
  connections_udp: number;
}

export interface LoadDataResponse {
  status: string;
  message: string;
  data: {
    count: number;
    records: LoadRecord[];
  };
}

export type MetricType = 
  | "cpu"
  | "gpu"
  | "ram"
  | "swap"
  | "load"
  | "temp"
  | "disk"
  | "net_in"
  | "net_out"
  | "net_total_up"
  | "net_total_down"
  | "net_total"
  | "net_bandwidth"
  | "traffic_limit"
  | "process"
  | "connections"
  | "tcp"
  | "udp";

export interface MetricConfig {
  key: MetricType;
  label: string;
  unit: string;
  formatter?: (value: number) => string;
  color?: string;
  max?: number;
  category: "system" | "network" | "storage" | "process";
}

export const METRIC_CONFIGS: Record<MetricType, MetricConfig> = {
  cpu: {
    key: "cpu",
    label: "CPU",
    unit: "%",
    color: "#3B82F6",
    max: 100,
    category: "system"
  },
  gpu: {
    key: "gpu",
    label: "GPU",
    unit: "%",
    color: "#8B5CF6",
    max: 100,
    category: "system"
  },
  ram: {
    key: "ram",
    label: "RAM",
    unit: "%",
    color: "#10B981",
    max: 100,
    category: "system"
  },
  swap: {
    key: "swap",
    label: "Swap",
    unit: "%",
    color: "#14B8A6",
    max: 100,
    category: "system"
  },
  load: {
    key: "load",
    label: "Load",
    unit: "",
    color: "#F59E0B",
    category: "system"
  },
  temp: {
    key: "temp",
    label: "Temperature",
    unit: "°C",
    color: "#EF4444",
    category: "system"
  },
  disk: {
    key: "disk",
    label: "Disk",
    unit: "%",
    color: "#6366F1",
    max: 100,
    category: "storage"
  },
  net_in: {
    key: "net_in",
    label: "Download Speed",
    unit: "B/s",
    color: "#06B6D4",
    category: "network"
  },
  net_out: {
    key: "net_out",
    label: "Upload Speed",
    unit: "B/s",
    color: "#0EA5E9",
    category: "network"
  },
  net_total_up: {
    key: "net_total_up",
    label: "Upload Bandwidth",
    unit: "B",
    color: "#0284C7",
    category: "network"
  },
  net_total_down: {
    key: "net_total_down",
    label: "Download Bandwidth",
    unit: "B",
    color: "#0891B2",
    category: "network"
  },
  process: {
    key: "process",
    label: "Processes",
    unit: "",
    color: "#EC4899",
    category: "process"
  },
  connections: {
    key: "connections",
    label: "Connections",
    unit: "",
    color: "#F97316",
    category: "process"
  },
  tcp: {
    key: "tcp",
    label: "TCP Connections",
    unit: "",
    color: "#F97316",
    category: "process"
  },
  udp: {
    key: "udp",
    label: "UDP Connections",
    unit: "",
    color: "#FB923C",
    category: "process"
  },
  net_total: {
    key: "net_total",
    label: "Total Speed",
    unit: "B/s",
    color: "#22C55E",
    category: "network"
  },
  net_bandwidth: {
    key: "net_bandwidth",
    label: "Total Bandwidth",
    unit: "B",
    color: "#84CC16",
    category: "network"
  },
  traffic_limit: {
    key: "traffic_limit",
    label: "Traffic Limit",
    unit: "%",
    color: "#F59E0B",
    max: 100,
    category: "network"
  }
};

// Network presets - allow multiple selection
export const NETWORK_METRICS = ["net_in", "net_out", "net_total", "net_total_up", "net_total_down", "net_bandwidth"] as const;

// Check if a metric is a network metric
export function isNetworkMetric(metric: MetricType): boolean {
  return NETWORK_METRICS.includes(metric as any);
}