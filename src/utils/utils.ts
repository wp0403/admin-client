/*
 * @Descripttion:
 * @version:
 * @Author: WangPeng
 * @Date: 2024-01-10 18:58:59
 * @LastEditors: WangPeng
 * @LastEditTime: 2024-01-12 15:40:05
 */

export function isMobileDevice() {
  // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //   navigator.userAgent
  // );
  return window.innerWidth < 760;
}
