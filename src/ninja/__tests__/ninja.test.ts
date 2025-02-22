import { setupNinja } from "../ninja"
import { setupTmpDir, cleanupTmpDir, testBin } from "../../utils/tests/test-helpers"
import { isGitHubCI } from "../../utils/env/isci"

jest.setTimeout(300000)
async function testNinja(directory: string) {
  const { binDir } = await setupNinja("1.10.2", directory, process.arch)
  await testBin("ninja", ["--version"], binDir)
  return binDir
}

describe("setup-ninja", () => {
  let directory: string
  beforeEach(async () => {
    directory = await setupTmpDir("ninja")
  })

  it("should setup Ninja", async () => {
    await testNinja(directory)
  })

  it("should find Ninja in the cache", async () => {
    const binDir = await testNinja(directory)
    if (isGitHubCI()) {
      expect(binDir).toMatch(process.env.RUNNER_TOOL_CACHE ?? "hostedtoolcache")
    }
  })

  afterEach(async () => {
    await cleanupTmpDir("ninja")
  }, 100000)
})
