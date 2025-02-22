const DefaultVersions: Record<string, string> = {
  llvm: "13.0.0",
  clangtidy: "13.0.0",
  clangformat: "13.0.0",
  ninja: "1.10.2",
  cmake: "3.22.1",
  gcovr: "5.0",
  conan: "1.44.1",
  meson: "0.61.1",
  python: "3.8.10",
  kcov: "v39",
  task: "3.10.0",
  doxygen: process.platform === "win32" ? "1.9.3.20220106" : "1.9.3",
  gcc: process.platform === "win32" ? "11.2.0.07112021" : "11",
}

/** Get the default version if passed true or undefined, otherwise return the version itself */
export function getVersion(name: string, version: string | undefined) {
  if (version === "true" || (version === undefined && name in DefaultVersions)) {
    return DefaultVersions[name]
  } else {
    return version ?? ""
  }
}
