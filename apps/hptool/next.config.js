module.exports = {
  reactStrictMode: false,
  env: {
    REACT_APP_FIREBASE_APIKEY: "AIzaSyANUKyqRHsTfxUmXgtiziPxdQ3Xd4g7BhM",
    REACT_APP_FIREBASE_AUTHDOMAIN: "hptool.firebaseapp.com",
    REACT_APP_FIREBASE_PROJECTID: "hptool",
    REACT_APP_FIREBASE_STORAGEBUCKET: "hptool.appspot.com",
    REACT_APP_FIREBASE_MESSAGINGSENDERID: "772127041164",
    REACT_APP_FIREBASE_APPID: "1:772127041164:web:a1a14e247b9d07af433da9",
    REACT_APP_FIREBASE_MEASUREMENTID: "G-VMPFMXNFKZ",
  },
  webpack(config) {
    config.resolve.extensions.push(".ts", ".tsx", ".js", ".jsx");
    return config;
  },
};
