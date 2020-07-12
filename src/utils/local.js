/**
 * created by KeMull on 2020/07/11
 * 封装本地存储功能
 */

export default {
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
