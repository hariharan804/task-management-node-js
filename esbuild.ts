import { context, BuildOptions } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import glob from "tiny-glob";
import chokidar from "chokidar"; // For efficient server restarts
import { env } from "./src/config";

async function runEsbuild() {
  const entryPoints = await glob("src/**/*.ts");
  const isWatchMode = env.NODE_ENV !== "production";
  const outdir = "dist";

  console.log(
    "🚀 ~ Starting esbuild in",
    isWatchMode ? "watch" : "build",
    "mode"
  );

  const buildOptions: BuildOptions = {
    // entryPoints: ['src/app.ts'], // Adjust this to your main entry point
    entryPoints,
    logLevel: "info",
    outdir,
    bundle: true,
    platform: "node",
    format: "cjs",
    sourcemap: isWatchMode,
    minify: !isWatchMode,
    external: [
      "@fastify/swagger-ui",
      "better-sqlite3",
      "mysql2",
      "mysql",
      "tedious",
      "sqlite3",
      "pg",
      "oracledb",
      "pg-query-stream",
    ],
    plugins: [esbuildPluginPino({ transports: ["pino-pretty"] })],
  };

  const ctx = await context(buildOptions);

  let serverProcess;
  let restartTimeout;
   // Restart the server on changes
  const restartServer = () => {
    clearTimeout(restartTimeout); // Clear any existing timeout
    restartTimeout = setTimeout(() => {
      if (serverProcess) {
        serverProcess.kill(); // Kill the existing process
        console.log("🏃‍➡️  restarting Server...")
      }
      serverProcess = require('child_process').spawn('node', [`${outdir}/app.js`], {
        stdio: 'inherit',
      });
    }, 500); // Wait 500ms before restarting to debounce rapid changes
  };

  if (isWatchMode) {
    console.log("🔄 Watching for changes...");
    await ctx.watch();
    chokidar.watch(outdir).on("all", restartServer);
    restartServer(); // Start server initially
  } else {
    console.log("📦 Building project...");
    await ctx.rebuild();
    await ctx.dispose(); // Clean up resources after build
  }
}

runEsbuild()
  .then(() => console.log("✅ Build completed!"))
  .catch((err) => {
    console.error("❌ Build failed:", err);
    process.exit(1);
  });
