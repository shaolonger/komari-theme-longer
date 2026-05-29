import React from "react";
import { Link } from "react-router-dom";
import type { NodeBasicInfo } from "@/contexts/NodeListContext";
import type { Record } from "@/types/LiveData";
import { ModernCardStatic } from "./NodeModernCardStatic";
import { ModernCardDynamic } from "./NodeModernCardDynamic";
import "./NodeModernCard.css";

interface ModernCardProps {
  basic: NodeBasicInfo;
  live: Record | undefined;
  online: boolean;
  forceShowTrafficText?: boolean;
}

const ModernCardComponent: React.FC<ModernCardProps> = ({ basic, live, online, forceShowTrafficText = false }) => {

  return (
    <Link 
      to={`/instance/${basic.uuid}`} 
      className="modern-card-link h-full block"
      style={{
        contain: "layout style paint",
        contentVisibility: "auto",
        containIntrinsicSize: "auto 300px"
      }}
    >
      <ModernCardDynamic
        basic={basic}
        live={live}
        online={online}
        forceShowTrafficText={forceShowTrafficText}
      >
        <ModernCardStatic 
          basic={basic}
          online={online}
          errorMessage={live?.message}
        />
      </ModernCardDynamic>
    </Link>
  );
};

// ModernCard 现在使用了分离的静态和动态组件，各自有自己的 memo 优化
// 不需要额外的 memo 包装
export const ModernCard = ModernCardComponent;