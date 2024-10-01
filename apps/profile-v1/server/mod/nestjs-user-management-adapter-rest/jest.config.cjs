module.exports = {
  rootDir: ".",
  testEnvironment: "node",
  testRegex: ".test.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/dist/$1",
  },
};
