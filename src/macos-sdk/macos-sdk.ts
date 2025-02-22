import { getExecOutput } from "@actions/exec"
import { addEnv } from "../utils/env/addEnv"
import { error } from "../utils/io/io"

export async function setupMacOSSDK() {
  if (process.platform === "darwin") {
    try {
      const xcrun = await getExecOutput("xcrun --sdk macosx --show-sdk-path")
      const sdkroot = xcrun.stdout || xcrun.stderr
      if (sdkroot) {
        addEnv("SDKROOT", sdkroot.trim())
      } else {
        error(`SDKROOT not set`)
      }
    } catch (e) {
      error(e as Error | string)
    }
  }
}
