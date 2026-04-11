import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const viteBin = path.join(rootDir, "node_modules", "vite", "bin", "vite.js");
const mode = process.argv[2] === "--mode" ? process.argv[3] : undefined;

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`Command failed with exit code ${code}: ${command} ${args.join(" ")}`));
    });
  });

const main = async () => {
  const node = process.execPath;
  const buildArgs = ["build"];
  const ssrArgs = ["build", "--ssr", "src/entry-server.tsx", "--outDir", ".prerender"];

  if (mode) {
    buildArgs.push("--mode", mode);
    ssrArgs.push("--mode", mode);
  }

  await run(node, ["scripts/generate-sitemap.mjs"]);
  await run(node, [viteBin, ...buildArgs]);
  await run(node, [viteBin, ...ssrArgs]);
  await run(node, ["scripts/prerender.mjs"]);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
