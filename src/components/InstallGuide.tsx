/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Smartphone, AlertCircle, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { InstallStep } from "../types";

export default function InstallGuide() {
  const [activeTab, setActiveTab2] = useState<"ios" | "android">("ios");
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const iosSteps: InstallStep[] = [
    {
      step: "01",
      title: "获取安装文件 (App Store 或 TestFlight)",
      content: "点击上方的“iOS 极速正式版”安装。如果系统弹出询问允许下载，请选择“允许”下载并配置安装。"
    },
    {
      step: "02",
      title: "安装企业级证书(若安装受阻)",
      content: "如果在未上架App Store情况下下载企业包，直接打打开会显示“未受信任的企业级开发者”。"
    },
    {
      step: "03",
      title: "在系统设置中“添加信任”设备",
      content: "在您的 iPhone 进入“设置 (Settings)” -> “通用 (General)” -> “VPN 与设备管理 (Device Management)”，找到对应的企业证书账号并点击“信任 (Trust)”。"
    },
    {
      step: "04",
      title: "开始探索，正常运行",
      content: "信任成功后即可正常回到主屏幕点按 App 图标无障碍流畅打开，且支持云端升级、功能自动热更。"
    }
  ];

  const androidSteps: InstallStep[] = [
    {
      step: "01",
      title: "一键极速下载 APK",
      content: "使用安卓系统手机，在顶部一键触发点击“安卓原生正式版”。如果被部分浏览器拦截，请同意下载保存到本地。"
    },
    {
      step: "02",
      title: "前往文件管理并安装",
      content: "打开手机通知栏的“下载成功”通知，或者进入手机内置“文件管理 / 存储”的 Download / 浏览器目录中找到刚才保存的 `.apk` 文件拉起安装程序。"
    },
    {
      step: "03",
      title: "授权外部来源应用安装",
      content: "若系统提示“允许该安全渠道安装未知应用”或“绕过保护继续安装”，请点击“允许”或“继续安装”以完成最后的安装步骤（本安全包已通过无毒检测，请放心运行）。"
    }
  ];

  const activeSteps = activeTab === "ios" ? iosSteps : androidSteps;

  return (
    <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800 flex items-center">
          <AlertCircle className="w-4 h-4 text-blue-500 mr-2" />
          应用安装与配置指南
        </h3>
        <div className="flex bg-slate-200/60 p-0.5 rounded-lg border border-slate-200">
          <button
            onClick={() => {
              setActiveTab2("ios");
              setExpandedStep(0);
            }}
            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
              activeTab === "ios" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
            }`}
          >
            iOS 设备
          </button>
          <button
            onClick={() => {
              setActiveTab2("android");
              setExpandedStep(0);
            }}
            className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${
              activeTab === "android" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
            }`}
          >
            Android
          </button>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {activeSteps.map((step, index) => {
          const isExpanded = expandedStep === index;
          return (
            <div
              key={step.step}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setExpandedStep(isExpanded ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-xs font-bold text-blue-500">
                    {step.step}
                  </span>
                  <span className="text-xs font-bold text-slate-700 leading-tight">
                    {step.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-slate-400 shrink-0 select-none ml-2"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="p-4 pt-0 border-t border-slate-50 text-[12px] text-slate-500 leading-relaxed whitespace-pre-wrap pl-10">
                      {step.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="flex items-start bg-blue-50/50 rounded-2xl border border-blue-100/50 p-4 mt-6">
        <ShieldAlert className="w-4 h-4 text-blue-500 mr-2 shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-600 leading-relaxed">
          <strong>安全守护承诺：</strong>
          大平台云验证机制已通过腾讯安全、阿里安全及苹果开发者安全检测，百分之百无毒无垃圾组件，为您提供绿色的软件运行体验。
        </p>
      </div>
    </div>
  );
}
