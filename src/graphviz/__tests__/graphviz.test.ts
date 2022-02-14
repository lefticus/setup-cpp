import { setupGraphviz } from "../graphviz"
import { cleanupTmpDir, setupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { InstallationInfo } from "../../utils/setup/setupBin"
import { getVersion } from "../../default_versions"

jest.setTimeout(300000)
describe("setup-graphviz", () => {
  let directory: string
  beforeAll(async () => {
    directory = await setupTmpDir("graphviz")
  })

  it("should setup graphviz", async () => {
    const installInfo = await setupGraphviz(getVersion("graphviz", undefined), directory, process.arch)

    await testBin("dot", ["-V"], (installInfo as InstallationInfo | undefined)?.binDir)
  })

  afterAll(async () => {
    await cleanupTmpDir("graphviz")
  }, 100000)
})
