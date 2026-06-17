/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  AppWindow, 
  Download, 
  Smartphone, 
  RefreshCw, 
  CheckCircle, 
  Info, 
  ArrowUpRight, 
  ShieldCheck, 
  Check, 
  ChevronRight,
  TrendingUp,
  Cpu
} from "lucide-react";
import { AppVersionInfo } from "../types";

interface DownloaderSectionProps {
  versionInfo: AppVersionInfo;
  onWeChatDownloadAttempt: (isIOS: boolean) => void;
  isInsideWeChat: boolean;
}

export default function DownloaderSection({ versionInfo, onWeChatDownloadAttempt, isInsideWeChat }: DownloaderSectionProps) {
  const [androidDownloadState, setAndroidDownloadState] = useState<"idle" | "preparing" | "downloading" | "completed">("idle");
  const [downloadProgress, setAndroidDownloadProgress] = useState(0);
  const [downloadSpeed, setAndroidDownloadSpeed] = useState("0 KB/s");
  const [downloadedMb, setAndroidDownloadedMb] = useState(0);

  const [iosState, setIosState] = useState<"idle" | "redirecting" | "completed">("idle");

  const totalSizeDecimal = parseFloat(versionInfo.size);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (androidDownloadState === "downloading") {
      interval = setInterval(() => {
        setAndroidDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval!);
            setAndroidDownloadState("completed");
            return 100;
          }
          const progressStep = Math.floor(Math.random() * 8) + 3;
          const nextVal = Math.min(prev + progressStep, 100);
          const currentDownloaded = parseFloat(((nextVal / 100) * totalSizeDecimal).toFixed(1));
          setAndroidDownloadedMb(currentDownloaded);
          // random speed between 2.5MB/s and 8.9MB/s
          const randomSpeed = (Math.random() * 6 + 2.5).toFixed(1);
          setAndroidDownloadSpeed(`${randomSpeed} MB/s`);
          return nextVal;
        });
      }, 300);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [androidDownloadState, totalSizeDecimal]);

  const handleAndroidClick = () => {
    if (isInsideWeChat) {
      onWeChatDownloadAttempt(false);
      return;
    }
    if (androidDownloadState === "downloading" || androidDownloadState === "completed") return;
    
    setAndroidDownloadState("preparing");
    setTimeout(() => {
      setAndroidDownloadState("downloading");
    }, 800);
  };

  const handleIosClick = () => {
    if (isInsideWeChat) {
      onWeChatDownloadAttempt(true);
      return;
    }
    setIosState("redirecting");
    setTimeout(() => {
      // simulate redirecting, then complete
      setIosState("completed");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* iOS Download Card */}
        <div className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[11px] font-extrabold text-blue-500 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full w-max">
              <Smartphone className="w-3.5 h-3.5" />
              <span>iOS 苹果系统</span>
            </div>
            <h4 className="text-xl font-black text-slate-800 leading-tight">
              智医健康 极速版
            </h4>
            <p className="text-[11px] text-slate-400">
              适用于 iPhone, iPad 所有主流系列设备
            </p>
          </div>

          <div className="pt-2">
            {iosState === "idle" && (
              <button
                onClick={handleIosClick}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl flex items-center justify-center space-x-2 font-bold text-xs shadow-md transition-all active:scale-[0.98] select-none"
              >
                <Smartphone className="w-4 h-4" strokeWidth={2.5} />
                <span>App Store 极速正式版</span>
              </button>
            )}

            {iosState === "redirecting" && (
              <div className="w-full h-12 bg-slate-100 text-slate-650 rounded-2xl flex items-center justify-center space-x-2 font-bold text-xs select-none">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <span>正在建立苹果信任通道...</span>
              </div>
            )}

            {iosState === "completed" && (
              <div className="space-y-2">
                <button
                  onClick={() => setIosState("idle")}
                  className="w-full h-12 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl flex items-center justify-center space-x-2 font-bold text-xs select-none shadow-sm"
                >
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                  <span>已拉起苹果快捷安装</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center font-medium">
                  若由于网络稍有网络延迟，请下拉页面点按“重试”
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Android Download Card */}
        <div className="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[11px] font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2.5 py-1 rounded-full w-max">
              <AppWindow className="w-3.5 h-3.5" />
              <span>Android 安卓系统</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <h4 className="text-xl font-black text-slate-800 leading-tight">
                智医健康 官方版
              </h4>
              <span className="text-[9px] font-extrabold px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-md">APK</span>
            </div>
            <p className="text-[11px] text-slate-400">
              推荐华为、小米、OPPO、维沃及各类安卓手机
            </p>
          </div>

          <div className="pt-2">
            {androidDownloadState === "idle" && (
              <button
                onClick={handleAndroidClick}
                className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl flex items-center justify-center space-x-2 font-bold text-xs shadow-md transition-all active:scale-[0.98] select-none"
              >
                <Download className="w-4 h-4" />
                <span>安卓原生正式版 一键下载</span>
              </button>
            )}

            {androidDownloadState === "preparing" && (
              <div className="w-full h-12 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center space-x-2 font-bold text-xs select-none">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" />
                <span>安全通道链接准备中...</span>
              </div>
            )}

            {androidDownloadState === "downloading" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 px-1">
                  <span className="flex items-center space-x-1">
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
                    <span>高速安全下载中...</span>
                  </span>
                  <span className="font-mono text-emerald-600">{downloadProgress}%</span>
                </div>
                {/* Simulated Progress bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50">
                  <motion.div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${downloadProgress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold px-1">
                  <span>速度: {downloadSpeed}</span>
                  <span className="font-mono">{downloadedMb} MB / {versionInfo.size}</span>
                </div>
              </div>
            )}

            {androidDownloadState === "completed" && (
              <div className="space-y-2">
                <button
                  onClick={() => setAndroidDownloadState("idle")}
                  className="w-full h-12 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl flex items-center justify-center space-x-2 font-bold text-xs select-none shadow-sm"
                >
                  <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
                  <span>下载成功 (已拉起安全安装)</span>
                </button>
                <p className="text-[10px] text-slate-400 text-center font-medium">
                  如系统未自动弹出，请在文件下载管理器点按进行安装
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Package Specifics & Meta Grid */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-sm text-xs font-semibold">
        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          <div className="flex items-center justify-between border-b border-slate-200/40 pb-2">
            <span className="text-slate-400 font-medium">最新版本</span>
            <span className="text-slate-800 font-bold">{versionInfo.version}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200/40 pb-2">
            <span className="text-slate-400 font-medium">总包大小</span>
            <span className="text-slate-800 font-bold tabular-nums">{versionInfo.size}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200/40 pb-2 sm:border-b-0 sm:pb-0">
            <span className="text-slate-400 font-medium">更新时间</span>
            <span className="text-slate-800 font-bold">{versionInfo.updateDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">累计加载</span>
            <span className="text-slate-800 font-bold tabular-nums">{versionInfo.downloadCount} 次</span>
          </div>
        </div>
      </div>

      {/* Changelog Section */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-2">
        <h5 className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center">
          <TrendingUp className="w-3.5 h-3.5 text-blue-500 mr-1.5" />
          最新特性与迭代记录 ({versionInfo.version})
        </h5>
        <div className="space-y-1.5 pl-1.5">
          {versionInfo.changelog.map((log, index) => (
            <p key={index} className="text-[11px] text-slate-600 leading-relaxed">
              {log}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
