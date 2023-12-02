best-libs工具函数库开发文档
关于开发

### 安装依赖
```
npm install 或 yarn
```

### package.json相关脚本
```
npm run start:dev
```

### 项目结构
```
 - packages
   - http  // 接口请求方法
   - utils  // 放置其他新建方法
   - index.ts  // 导出文件
 - scripts
 - src
   - components   // 组件存放
   - sotries   // 输出文档
   - index.ts   // 导出组件
 - storybook-static
 - .gitignore
 - CHANGELOG.md
 - README.md
 - external.js // 放置不需要打包的依赖
 - global.d.ts
 - package-lock.json
 - package.json
 - stats.html
 - tsconfig.json
 - typedoc.json
 - vite.config.ts
 ```

### package.json相关脚本
```
 "scripts": {
    "build": "vite build",        // 打包
    "preview": "vite preview",   //
    "doc": "typedoc --options typedoc.json",   // 生成文档
    "start:dev": "vite --mode dev",   // 启动
    "release": "node scripts/index.cjs"   // 发布
  }
```


### 开发步骤
```
1、packages/utils下新建文件/文件夹；
2、在新建的文件中写入函数方法：

3、单元测试 （安排中）
4、在packages/index.ts中导出相关方法：

5、构建
npm run build

打包结果如下：

6、发布
npm run release    // 会自动升级版本号自动上传生成tag

关于查看文档
1.执行脚本npm run doc，可以看到根目录下生成docs文件夹：

2.IDE(如Vs Code)安装插件Live Server，打开docs文件夹下的index.html，右键并选择 Open with Live Server(若安装了插件右键不显示此选项，可考虑重启IDE);

3.文档自动在浏览器打开，可查看各个函数工具的相关文档：

（后期输出线上实时更新的文档）
```
关于使用
### 安装
```
npm install @best/libs
```

### 用法
```
1.在项目中引入包中需要的方法，如debounce：
import { debounce } from "@best/libs"

2.根据相关文档，传入必要参数：
debounce(() => console.log('5秒后打印')}, 5e3)
```

关于开发规范
#### 命名和风格
1、使用小驼峰命名法；
2、保持一致的2缩进和代码风格，以增强可读性。
3、使用有意义的变量和函数名，避免使用过于简短或难以理解的命名。

#### 注释和文档
1、在代码中使用清晰明了的注释，解释代码的功能、意图和关键步骤，如下：
    /**
     * @description xxx
     * @param {function} xxx
     * @param {number} xxx
     */
2、为工具函数提供文档，包括用途、参数说明、返回值说明和示例用法。
3、使用 typeDoc工具生成 API 文档。

#### 错误处理和异常处理
1、使用适当的异常处理机制，如抛出错误对象、返回错误码或使用回调函数传递错误信息。
2、在文档中说明工具函数的预期行为和错误处理方式。

#### 单元测试
1、使用测试框架编写单元测试来验证工具函数的功能和正确性。
2、覆盖各种输入情况和边界条件，包括正常输入、异常输入和边缘情况。
3、自动化测试运行，确保在代码修改后运行测试套件。

#### 依赖管理
1、在 package.json 文件中明确定义工具函数的依赖项。
2、使用适当的版本范围来管理依赖项的更新和兼容性。

#### 代码质量和格式化
1、使用代码质量工具（如 ESLint、Prettier 等）来确保代码质量和一致的代码风格。
2、配置合适的代码质量规则集或自定义规则，以检查和格式化代码。

#### 发布版本
1、单元测试通过后，打包发布，自动生成版本号。
