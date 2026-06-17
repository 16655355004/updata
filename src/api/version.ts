import type { AppVerRes } from "../types";

const VER_API = "https://fast-guoyao-api.kc87.com/website/app/version";

export async function getAppVer() {
  const res = await fetch(VER_API);
  const json: AppVerRes = await res.json();
  if (json.code !== 1000 || !json.data?.length) {
    throw new Error(json.msg || "获取版本失败");
  }
  return {
    android: json.data.find((i) => i.type === 1),
    ios: json.data.find((i) => i.type === 2),
  };
}
