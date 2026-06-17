/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AppVersionInfo {
  version: string;
  size: string;
  updateDate: string;
  packageName: string;
  bundleId: string;
  downloadCount: string;
  changelog: string[];
}

export interface FeatureItem {
  title: string;
  desc: string;
  iconName: string;
  colorClass: string;
}

export interface InstallStep {
  step: string;
  title: string;
  content: string;
}

export interface AppVerItem {
  type: number;
  version_code: string;
  store_url: string;
  url: string;
}

export interface AppVerRes {
  code: number;
  msg: string;
  data: AppVerItem[];
}
