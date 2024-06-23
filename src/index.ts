import { normalize } from "./normalize";

export function test() {
  return "works!";
}

export interface DownloadOptions {
  /**
   * Callback function
   * 下载完成后调用的回调函数
   */
  cb?: Function;
  /**
   * Path to git binary; defaults to `git`.
   * git 二进制文件的路径，默认为 `git`
   */
  git?: string;
  /**
   * When `true`, clone with depth 1.
   * 是否使用浅克隆
   */
  shallow?: boolean;
  /**
   * Revision/branch/tag to check out.
   * 要检出的版本/分支/标签
   */
  checkout?: string;
  /**
   * Additional array of arguments to pass to `git clone`.
   * 额外的参数
   */
  args?: string[];
}

export function download(
  repo: string,
  dest: string,
  opts: DownloadOptions,
  fn?: () => void
) {
  return normalize("");
}