import * as core from "@actions/core"
import { addPath } from "../utils/path/addPath"
import { setupAptPack } from "../utils/setup/setupAptPack"
import { setupBrewPack } from "../utils/setup/setupBrewPack"
import { setupChocoPack } from "../utils/setup/setupChocoPack"
import { isGitHubCI } from "../utils/env/isci"

export function setupPython(version: string, setupDir: string, arch: string) {
  if (!isGitHubCI() || process.platform === "win32") {
    // TODO parse version
    return setupPythonViaSystem(version, setupDir, arch)
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { setupActionsPython } = require("./actions_python") as typeof import("./actions_python")
    return setupActionsPython(version, setupDir, arch)
  } catch (err) {
    return setupPythonViaSystem(version, setupDir, arch)
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function setupPythonViaSystem(version: string, setupDir: string, _arch: string) {
  switch (process.platform) {
    case "win32": {
      setupChocoPack("python3", version, setupDir ? [`/InstallDir:${setupDir}`] : [])
      // Adding the bin dir to the path
      /** The directory which the tool is installed to */
      activateWinPython(setupDir)
      return { installDir: setupDir, binDir: setupDir }
    }
    case "darwin": {
      return setupBrewPack("python3", version)
    }
    case "linux": {
      const installInfo = await setupAptPack("python3", version)
      await setupAptPack("python3-pip")
      return installInfo
    }
    default: {
      throw new Error(`Unsupported platform`)
    }
  }
}

function activateWinPython(binDir: string) {
  core.info(`Add ${binDir} to PATH`)
  addPath(binDir)
}
