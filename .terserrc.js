const terserConfig = require("terser-config-atomic")

const compress =
  typeof terserConfig.compress !== "boolean"
    ? {
        ...terserConfig.compress,
        global_defs: {
          ...terserConfig.compress.global_defs,
          "process.env.NODE_DEBUG": false,
          "process.env.RUNNER_DEBUG": "0",
          "@core.debug": "() => {}",
          "@core.isDebug": "() => false",
        },
      }
    : terserConfig.compress

module.exports = {
  ...terserConfig,
  compress,
}
