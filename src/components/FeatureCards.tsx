/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Zap, Cpu, ShieldCheck, Smartphone, Layers, CheckCircle2 } from "lucide-react";
import { FeatureItem } from "../types";

export default function FeatureCards() {
  const features: FeatureItem[] = [
    {
      title: "AI 智能分析引擎",
      desc: "深度集成了新一代 Gemini 多模态推理加速引擎，响应速度提升 45%，助你全方位智能分析诊断。",
      iconName: "Cpu",
      colorClass: "text-blue-500 bg-blue-50"
    },
    {
      title: "弱网离线极速加载",
      desc: "内置高级元数据离线加载与多级极缓更新，即使在偏远地区、地下仓库等微弱信号环境也毫秒级响应。",
      iconName: "Zap",
      colorClass: "text-amber-500 bg-amber-50"
    },
    {
      title: "多端档案加密同步",
      desc: "拥有端到端多重安全传输协议，轻松一键跨设备同步业务数据、模拟咨询结果及高价值档案。",
      iconName: "ShieldCheck",
      colorClass: "text-emerald-500 bg-emerald-50"
    },
    {
      title: "全新原生适配动效",
      desc: "全面拥抱 Android 与 iOS 最新系统特性，深层适配超高刷新率折叠屏及画中画，指尖手感更软糯贴切。",
      iconName: "Smartphone",
      colorClass: "text-purple-500 bg-purple-50"
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-5 h-5" />;
      case "Smartphone":
        return <Smartphone className="w-5 h-5" />;
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {features.map((item, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-100 p-5 rounded-3xl shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.colorClass} shadow-sm`}>
              {getIcon(item.iconName)}
            </div>
            <h4 className="text-sm font-extrabold text-slate-800 leading-tight">
              {item.title}
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {item.desc}
            </p>
          </div>
          <div className="flex items-center text-[10px] text-slate-400 mt-4 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1" />
            全新特性持续自动跟进
          </div>
        </div>
      ))}
    </div>
  );
}
