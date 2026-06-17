/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ArrowUpRight, Compass, Share2, Smartphone } from "lucide-react";

interface WeChatGuideProps {
  isOpen: boolean;
  onClose: () => void;
  isIOS: boolean;
}

export default function WeChatGuide({ isOpen, onClose, isIOS }: WeChatGuideProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-start touch-none select-none text-white font-sans"
      onClick={onClose}
    >
      {/* Upper Right Curved Arrrow Guide */}
      <div className="absolute top-4 right-6 flex flex-col items-end z-50">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="flex flex-col items-end space-y-1"
        >
          <div className="flex items-center space-x-2 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-blue-400">
            <span>点击这里</span>
            <ArrowUpRight className="w-4 h-4 animate-pulse" />
          </div>
          <svg
            className="w-16 h-16 text-blue-500 mr-4"
            fill="none"
            viewBox="0 0 64 64"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M50 48 C 50 25, 30 14, 12 18" />
            <path d="M14 10 L 10 18 L 18 22" />
          </svg>
        </motion.div>
      </div>

      <div className="p-8 mt-24 max-w-sm mx-auto space-y-8 w-full">
        <header className="space-y-2 text-center">
          <motion.div
            initial={{ scale: 0.9, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto text-blue-400 mb-2"
          >
            <Compass className="w-8 h-8 animate-spin-slow" />
          </motion.div>
          <h3 className="text-xl font-black tracking-wide text-blue-400">
            微信浏览受限，需在外部打开
          </h3>
          <p className="text-slate-400 text-xs">
            由于微信内置浏览器限制，暂不支持直接下载 app 文件或跳转苹果商店。
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex items-start space-x-4 bg-slate-800/40 border border-slate-700/20 p-4 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold shrink-0 text-sm">
              1
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-200 flex items-center">
                点击右上角菜单
              </h4>
              <p className="text-xs text-slate-400">
                点击微信顶部右上角的 <span className="font-bold text-white px-1.5 py-0.5 bg-slate-800 rounded">···</span> 或{" "}
                <span className="font-bold text-white px-2 py-0.5 bg-slate-800 rounded">
                  <Share2 className="w-3.5 h-3.5 inline mb-0.5" />
                </span>{" "}
                图标。
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 bg-slate-800/40 border border-slate-700/20 p-4 rounded-2xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shrink-0 text-sm">
              2
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-200">
                {isIOS ? "选择 “在 Safari 中打开”" : "选择 “在浏览器中打开”"}
              </h4>
              <p className="text-xs text-slate-400">
                {isIOS ? (
                  <>
                    在菜单中选择 <span className="text-emerald-400 font-bold">“在 Safari 中打开”</span> 即可顺畅安装 iOS 版本。
                  </>
                ) : (
                  <>
                    在菜单中选择 <span className="text-emerald-400 font-bold">“在浏览器中打开”</span> 回复正常极速自动下载安装。
                  </>
                )}
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full border border-slate-600 hover:border-white text-xs text-slate-400 hover:text-white transition-all bg-white/5 active:scale-95"
          >
            我知道了，继续浏览
          </button>
        </footer>
      </div>
    </motion.div>
  );
}
