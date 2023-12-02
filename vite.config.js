import { defineConfig, loadEnv } from "vite";
import copy from "rollup-plugin-copy";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import external from "./external";

// 解决node-fs读取文件夹效率低问题
const fg = require("fast-glob");

const outDir = resolve(__dirname, "build");

const rollupOptions = {
  input: {},
  // 确保外部化处理那些你不想打包进库的依赖
  external: Object.keys(external),
};

const genEntries = async () => {
  const entries = fg.sync(`packages/**/*.*`, {
    onlyFiles: false,
    deep: Infinity,
  });

  entries.forEach((entry) => {
    const FILE_TYPE_SUFFIX_REG = /\.[t|j]s?$/g;
    const TEST_FILE_REG = /__tests__/g;

    if (FILE_TYPE_SUFFIX_REG.test(entry) && !TEST_FILE_REG.test(entry)) {
      const fileOutDir = entry.replace(FILE_TYPE_SUFFIX_REG, "");
      rollupOptions.input = {
        ...rollupOptions.input,
        [fileOutDir]: entry,
      };
    }
  });
};

genEntries();
// https://vitejs.dev/config/
export default ({mode}) => {

  const env = loadEnv(mode, resolve(process.cwd(), "env"), "PROJECT_");

  return defineConfig({
    envDir: "env",
    envPrefix: "PROJECT_",
    build: {
      outDir,
      lib: {
        // 入口文件将包含可以由你的包的用户导入的导出：
        entry: env.PROJECT_BUILD_TYPE === 'umd' ? resolve(__dirname, "packages/index.ts"):"",
        name: env.PROJECT_BUILD_TYPE === 'umd' ? 'bestLib' : null,
        fileName: (format) => `${format}/[name].js`,
        formats: env.PROJECT_BUILD_TYPE === 'umd' ? ["umd"] : ["cjs", "es"],
      },
      rollupOptions: env.PROJECT_BUILD_TYPE === 'umd' ? {
        external: Object.keys(external),
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: external
        }
      }: rollupOptions
    },
    plugins: [
      visualizer(),
      env.PROJECT_BUILD_TYPE !== 'umd' && dts({
        entryRoot: "./packages",
        outputDir: ["./build/es", "./build/cjs"],
        //指定使用的tsconfig.json为我们整个项目根目录下,如果不配置,你也可以在components下新建tsconfig.json
        tsConfigFilePath: "./tsconfig.json",
      }),
      compression({
        filter: /\.(js|mjs|ts|css|html)$/i,
        // deleteOriginFile: true,
        algorithm: "gzip",
        ext: ".gz",
      }),
      copy({
        targets: [
          { src: "package.json", dest: "build" },
          { src: "tsconfig.json", dest: "build" },
          { src: "README.md", dest: "build" },
        ],
        hook: "writeBundle",
      }),
    ],
  });
};
