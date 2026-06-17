/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import WeChatGuide from "./components/WeChatGuide";
import { getAppVer } from "./api/version";
import type { AppVerItem } from "./types";
import logoUrl from "./assets/images/app-logo.png";
import mockupUrl from "./assets/images/app-screenshot.jpg";

export default function App() {
  const [isWeChat, setIsWeChat] = useState(false);
  const [showWeChatGuide, setShowWeChatGuide] = useState(false);
  const [targetIOS, setTargetIOS] = useState(false);
  const [androidVer, setAndroidVer] = useState<AppVerItem | null>(null);
  const [iosVer, setIosVer] = useState<AppVerItem | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.navigator) {
      const ua = window.navigator.userAgent.toLowerCase();
      setIsWeChat(ua.indexOf("micromessenger") !== -1);
    }
    getAppVer()
      .then(({ android, ios }) => {
        if (android) setAndroidVer(android);
        if (ios) setIosVer(ios);
      })
      .catch(() => {});
  }, []);

  const handleDownload = (isApple: boolean) => {
    if (isWeChat) {
      setTargetIOS(isApple);
      setShowWeChatGuide(true);
      return;
    }

    if (isApple) {
      if (iosVer?.store_url) {
        window.location.href = iosVer.store_url;
      }
      return;
    }

    const apkUrl = androidVer?.url || androidVer?.store_url;
    if (apkUrl) {
      const a = document.createElement("a");
      a.href = apkUrl;
      a.download = "yinqing.apk";
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center relative font-sans antialiased text-slate-900 overflow-x-hidden p-0 sm:py-6 selection:bg-blue-105">
      
      <div className="absolute top-0 left-0 w-full h-full opacity-25 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-[#e0e5ff] to-[#dbe2ff] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-gradient-to-tr from-[#e8efff] to-white rounded-full blur-3xl"></div>
      </div>

      <main className="w-full max-w-md mx-auto bg-white min-h-screen sm:min-h-[812px] sm:h-[840px] sm:rounded-[40px] sm:border-[10px] sm:border-slate-900 shadow-2xl flex flex-col justify-between relative overflow-hidden z-10 transition-all font-sans">
        
        <div className="absolute top-0 left-0 right-0 h-[480px] bg-gradient-to-b from-[#e3e8ff] via-[#f0f3ff] to-[#f8f9ff] rounded-b-[48px] z-0 pointer-events-none">
          <div className="absolute inset-0 opacity-15">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,80 50,55 T100,60" fill="none" stroke="#4f46e5" strokeWidth="0.5" />
              <path d="M0,70 Q35,40 70,85 T100,60" fill="none" stroke="#4f46e5" strokeWidth="0.5" />
            </svg>
          </div>
        </div>

        {/* WeChat Guide Instruction tooltip */}
        {isWeChat && (
        <div className="absolute top-4 right-4 z-40 max-w-[170px] pointer-events-none">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="bg-white/95 backdrop-blur-sm border border-blue-400 p-2.5 rounded-xl shadow-xl text-center relative flex flex-col items-center justify-center"
          >
            <div className="absolute -top-1.5 right-6 w-3 h-3 bg-white border-t border-l border-blue-400 rotate-45"></div>
            <p className="text-[11px] font-bold text-blue-900 leading-normal">
              请点击右上角选择
            </p>
            <p className="text-[11px] font-extrabold text-blue-600 leading-normal">
              “浏览器中打开”
            </p>
          </motion.div>
        </div>
        )}

        <div className="flex-1 flex flex-col justify-between px-6 pt-8 relative z-20 pb-4">
          
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3 pt-2">
              <div className="relative w-12 h-12 shrink-0 shadow-[0_4px_16px_rgba(49,93,250,0.12)] rounded-2xl overflow-hidden bg-white border border-white">
                <img
                  src={logoUrl}
                  alt="隐擎AI Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-[25px] font-black text-slate-900 tracking-wider">
                隐擎
              </h3>
            </div>

            <div className="text-center pt-2 px-6 space-y-2">
              <h2 className="text-[21px] font-black tracking-tight text-slate-800 leading-tight">
                AI健康助手
              </h2>
              <div className="inline-block bg-indigo-50/70 border border-indigo-100/50 px-4 py-1.5 rounded-full shadow-[0_2px_8px_rgba(79,70,229,0.04)]">
                <p className="text-[13px] font-bold text-indigo-600/90 tracking-wider">
                  赋能药店效率提升
                </p>
              </div>
            </div>
          </div>

          <div className="relative w-full h-[390px] flex items-center justify-center mt-3 select-none">
            <div className="absolute left-[2%] top-[10%] w-[58%] h-[310px] opacity-40 transform rotate-[-8deg] skew-y-[-1deg] scale-95 origin-center pointer-events-none">
              <div className="w-full h-full rounded-[28px] overflow-hidden border-[5px] border-white shadow-lg bg-white/30 backdrop-blur-md">
                <img
                  src={mockupUrl}
                  alt="Background Mockup Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="absolute right-[5%] top-0 w-[70%] h-[370px] z-20">
              <div className="w-full h-full rounded-[32px] overflow-hidden border-[6px] border-white shadow-2xl bg-white">
                <img
                  src={mockupUrl}
                  alt="Foreground Premium Mockup Interface"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full pt-4 mt-auto">
            <button
              onClick={() => handleDownload(true)}
              className="flex items-center justify-center space-x-2 bg-[#315dfa] hover:bg-[#254bda] text-white h-13 rounded-2xl active:scale-[0.98] transition-all shadow-md font-bold text-xs tracking-wide select-none"
            >
              <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.35-6.15-3.57-2.85-7.44-7.48-11.62-13.9-9.11-13.79-15.69-30.82-19.74-51.09-2.46-12.24-3.7-23.77-3.7-34.61 0-16.14 2.85-29.62 8.55-40.42 5.71-10.81 13.88-16.38 24.51-16.71 5.13-.13 10.42 1.34 15.89 4.39 5.47 3.06 9.38 4.59 11.73 4.59 2.01 0 5.64-1.34 10.89-4.02 5.25-2.68 10.11-3.96 14.6-3.85 11.96.22 21.6 4.41 28.93 12.57 6.26 7.04 10.37 15.53 12.33 25.46-14.08 6.81-22.18 16.54-24.31 29.17-2.13 12.63 2.13 24.16 12.74 34.61 6.16 6.04 13.06 9.49 20.73 10.34-2.69 7.42-6.57 15.22-11.63 23.41zM119.22 34.61c0-11.28 4.02-21.45 12.06-29.5 8.04-8.04 17.65-12.18 28.83-12.4 1.12 12.18-2.91 22.8-12.06 31.85-9.16 9.05-18.99 13.29-29.5 12.72.67-1.11.67-1.56.67-2.67z" />
              </svg>
              <span>iPhone 下载</span>
            </button>

            <button
              onClick={() => handleDownload(false)}
              className="flex items-center justify-center space-x-2 bg-[#050b24] hover:bg-slate-900 text-white h-13 rounded-2xl active:scale-[0.98] transition-all shadow-md font-bold text-xs tracking-wide select-none"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M16.607 6.03l1.833-3.174a.539.539 0 0 0-.197-.735.539.539 0 0 0-.735.197L15.65 5.53a11.5 11.5 0 0 0-7.3 0L6.49 2.318A.538.538 0 1 0 5.556 2.87l1.834 3.174C3.882 8.358 1.488 12.115 1 16.5h22c-.488-4.385-2.882-8.142-6.393-10.47zM9 11.75a.75.75 0 1 1-.75-.75.75.75 0 0 1 .75.75zm6.5 0a.75.75 0 1 1-.75-.75.75.75 0 0 1 .75.75z" />
              </svg>
              <span>Android 下载</span>
            </button>
          </div>

        </div>

        <div className="bg-transparent py-4 shrink-0 flex flex-col justify-end">
          <div className="hidden sm:flex h-4 justify-center items-end pb-0.5">
            <div className="w-24 h-1 bg-slate-200 rounded-full"></div>
          </div>
        </div>

      </main>

      <div className="hidden md:block text-center mt-6 z-10 pointer-events-none">
        <p className="text-slate-400 text-xs tracking-widest uppercase mb-0.5 font-bold">
          隐擎AI科技有限公司
        </p>
        <p className="text-slate-300 text-[10px]">
          Copyright © 2026-2027 All Rights Reserved
        </p>
      </div>

      <AnimatePresence>
        {showWeChatGuide && (
          <WeChatGuide
            isOpen={showWeChatGuide}
            onClose={() => setShowWeChatGuide(false)}
            isIOS={targetIOS}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
