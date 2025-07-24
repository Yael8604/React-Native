// mobile/src/config/apiConfig.ts

const isExpo = typeof navigator !== "undefined" && navigator.product === "ReactNative";

// שימי כאן את כתובת ה־IP של המחשב שלך
const localIp = "http:// 192.168.56.1:3001";

export const API_BASE_URL = isExpo
  ? localIp
  : "http://localhost:3001";
