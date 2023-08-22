module.exports = {
  root: true, // 标识当前配置文件为eslint的根配置文件，让其停止在父级目录中继续寻找。
  env: {
    browser: true, // 浏览器环境
    node: true,
    jquery: true
  },
  globals: {
    viewer: true,
    Cesium: true
  },
  extends: [
    'plugin:vue/essential', // 额外添加的规则可查看 https://vuejs.github.io/eslint-plugin-vue/rules/
    '@vue/standard' // https://github.com/standard/eslint-config-standard
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'no-irregular-whitespace': 'off',
    'eol-last': 0,
    quotes: [1, 'single'], // 引号类型 `` "" ''
    'space-before-function-paren': 0,
    'no-console': 'off',
    'no-debugger': 'off',
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 'camelcase': 2,
    'vue/camelcase': 2,
    'vue/comment-directive': 'off',
    // 在 jsx 中不允许使用未定义的变量
    'vue/jsx-uses-vars': 2,
    // 不允许在 `computed` 中使用异步方法，如果确实有需求，请使用此插件：https://github.com/foxbenjaminfox/vue-async-computed
    'vue/no-async-in-computed-properties': 2,

    // 在 `props`, `computed`, `methods` 中存在的 key 不允许重复
    'vue/no-dupe-keys': [
      2
      // 除了 Vue 支持的 `computed`, `methods` ...，还在哪些 key 下去搜索重复的 key
      // "groups": []
    ],

    // 避免重复定义属性，如：`<div foo="bar" :foo="baz"></div>`
    'vue/no-duplicate-attributes': [
      2,
      {
        // 允许 class 两种形式共存
        allowCoexistClass: true,
        // 允许 style 两种形式共存
        allowCoexistStyle: true
      }
    ],

    // 忽略解析 <template> 时的语法报错
    'vue/no-parsing-error': ['off'],

    // 不允许覆盖掉 Vue 内部的方法/属性，比如 `$el`, `$on`, `$nextTick` ...
    'vue/no-reserved-keys': [
      2
    ],

    // 不允许可共享的 `data` 字段，即 `data` 字段只能是函数，不能是对象
    'vue/no-shared-component-data': 2,

    // 不允许在 `computed` 中有无意义的修改，如：`this.foo = 'bar'; return baz`
    'vue/no-side-effects-in-computed-properties': 2,

    // 不允许在 `<template>` 标签上加 `key`，如：`<template key="foo">`，其他标签是可以的
    'vue/no-template-key': 2,

    // 不允许在 `<textarea>` 标签间使用 mustache 语法，如 `<textarea>{{ foo }}</textarea>`
    // 因为它会不生效，请使用 `v-model`，如：`<textarea v-model="foo"`></textarea>`
    'vue/no-textarea-mustache': 2,

    // 不允许未使用的 component
    'vue/no-unused-components': [
      2,
      {
        // 是否忽略使用 `<component is>` 形式定义的组件
        ignoreWhenBindingPresent: true
      }
    ],

    // 不允许未被定义的变量，主要是指在 <template> 中定义的项，如 `<div v-for="i in foo">{{ bar }}</div>`
    'vue/no-unused-vars': 2,

    // 不允许 `v-if` 和 `v-for` 在同一个标签上（如果在同一个标签，`v-for` 的优先级会更高一些）
    // 两个混用有两种情况：
    // 1. `<div v-if="item.show" v-for="item in list">`，if 判断基于每一个循环项
    // 2. `<div v-if="foo" v-for="item in list">`，if 判断基于其他变量，此种情况是要避免的，空耗循环
    'vue/no-use-v-if-with-v-for': [
      2,
      {
        // 如果 `v-if` 中使用了 `v-for` 循环后的变量，则允许
        allowUsingIterationVar: true
      }
    ],

    // 在 `<component>` 上要求有 `v-bind:is`
    'vue/require-component-is': 2,

    // 在 `props` 中的类型，应该是构建函数而不是字符串，如 `type: Number` 而不是 `type: 'Number'`
    'vue/require-prop-type-constructor': 2,

    // `render` 方法一定要有返回值
    'vue/require-render-return': 2,

    // 每个 `v-for` 元素都要绑定 key，如 `<div v-for="foo in bar" :key="for"></div>`
    // 不太理解这个细节和 "vue/valid-v-for" 的区别
    'vue/require-v-for-key': 2,

    // 校验 props 中指定的属性类型与默认值，
    // 且如果属性类型为 Array, Object，要求默认值是函数形式，保证数据不会共享，
    // 可参考 "vue/no-shared-component-data"
    'vue/require-valid-default-prop': 2,

    // 在 `computed` 中的每个 getter 都要有明确的返回值
    'vue/return-in-computed-property': [
      2,
      {
        // 不允许有隐式的 undefined 返回，即不能只写 `return;`，`return` 后一定要有值
        treatUndefinedAsUnspecified: true
      }
    ],

    // 如果组件已经绑定了一个包含修饰符的 `v-on`，则要求另一个使用 `exact` 修饰符
    'vue/use-v-on-exact': 2,

    // 检查在 `<template>` 下只有一个根元素
    // 要求：根元素只能是标签，不能为空，不能是纯文本，不能使用 `v-for`，不能是 `<template>` 或 `<slot>`
    // 额外的，支持使用 `v-if` 放多个元素在 `<template>`下，如：
    // ```
    // <template>
    //   <div v-if="foo"></div>
    //   <div v-else></div>
    // </template>
    // ```
    'vue/valid-template-root': 2,

    // 检查 `v-bind` 的正确性
    // 1. 不能有无效的修饰符，如：`<div v-bind.foo="bar"></div>`
    // 2. 值不能为空，如：`<div v-bind></div>`
    'vue/valid-v-bind': 2,

    // 检查 `v-clock` 的正确性
    // 1. 不能有参数，如：`<div v-cloak:foo></div>`
    // 2. 不能有修饰符，如：`<div v-cloak.foo></div>`
    // 3. 不能有值，如：`<div v-cloak="foo"></div>`
    'vue/valid-v-cloak': 2,

    // 检查 `v-else-if` 的正确性
    // 1. 不能有参数，如：`<div v-else-if:foo></div>`
    // 2. 不能有修饰符，如：`<div v-else-if.foo></div>`
    // 3. 值不能为空，如：`<div v-else-if></div>`
    // 4. 前边要有 `v-if` 或 `v-else`
    // 5. 不能和 `v-if` 或 `v-else` 在同一个标签上
    'vue/valid-v-else-if': 2,

    // 检查 `v-else` 的正确性
    // 1. 不能有参数，如：`<div v-else:foo></div>`
    // 2. 不能有修饰符，如：`<div v-else.foo></div>`
    // 3. 值不能为空，如：`<div v-else></div>`
    // 4. 前边要有 `v-if` 或 `v-else-if`
    // 5. 不能和 `v-if` 或 `v-else-if` 在同一个标签上
    'vue/valid-v-else': 2,

    // 检查 `v-for` 的正确性
    // 1. 不能有参数，如：`<div v-for:foo></div>`
    // 2. 不能有修饰符，如：`<div v-for.foo></div>`
    // 3. 值不能为空，如：`<div v-for></div>`
    // 4. 如果是自定义组件要有 `v-bind:key`，且 `v-bind:key` 只能使用在 `v-for` 中定义的变量（保证每个都不相同）
    'vue/valid-v-for': 2,

    // 检查 `v-html` 的正确性
    // 1. 不能有参数，如：`<div v-html:foo></div>`
    // 2. 不能有修饰符，如：`<div v-html.foo></div>`
    // 3. 值不能为空，如：`<div v-html></div>`
    'vue/valid-v-html': 2,

    // 检查 `v-if` 的正确性
    // 1. 不能有参数，如：`<div v-if:foo></div>`
    // 2. 不能有修饰符，如：`<div v-if.foo></div>`
    // 3. 值不能为空，如：`<div v-if></div>`
    // 4. 不能和 `v-else` 或 `v-else` 在同一个标签上
    'vue/valid-v-if': 2,

    // 检查 `v-model` 的正确性
    // 1. 不能有参数，如：`<input v-model:foo="bar">`
    // 2. 不能加无效的修饰符，如：`<input v-model.foo="bar">`
    // 3. 值不能为空，如：`<input v-model>`
    // 4. 值有无效的左表达式（LHS, left-hand side），如：`<input v-model="foo() + bar()">`
    // 5. 只能应用在表单元素上，如：`<div v-model="foo"></div>`
    // 6. 不能绑定在动态 type 的 input 元素上，如：`<input :type="type" v-model="foo">`
    // 7. 不能绑定在 type 为 file 的 input 元素上，如：`<input type="file" v-model="foo">`
    // 8. 值不能为迭代变量，如：`<div v-for="x in list"><input type="file" v-model="x"></div>`
    'vue/valid-v-model': 2,

    // 检查 `v-on` 的正确性
    // 1. 不能没有事件名（参数），如：`<div v-on="foo"></div>`
    // 2. 不能加无效的修饰符，如：`<div v-on:click.foo="bar"></div>`
    // 3. 值不能为空，且无修饰符，如：`<div v-on:click></div>`
    // 注意，是可以像这样使用的：`<div @click.prevent></div>`
    'vue/valid-v-on': [
      2,
      {
        // 允许的修饰符，以字符串形式放在数组中，如 `["foo"]` 则表示可以使用 `@click.foo`
        modifiers: []
      }
    ],

    // 检查 `v-once` 的正确性
    // 1. 不能有参数，如：`<div v-once:foo></div>`
    // 2. 不能有修饰符，如：`<div v-once.foo></div>`
    // 3. 不能有值，如：`<div v-once="foo"></div>`
    'vue/valid-v-once': 2,

    // 检查 `v-pre` 的正确性
    // 1. 不能有参数，如：`<div v-pre:foo></div>`
    // 2. 不能有修饰符，如：`<div v-pre.foo></div>`
    // 3. 不能有值，如：`<div v-pre="foo"></div>`
    'vue/valid-v-pre': 2,

    // 检查 `v-show` 的正确性
    // 1. 不能有参数，如：`<div v-show:foo></div>`
    // 2. 不能有修饰符，如：`<div v-show.foo></div>`
    // 3. 值不能为空，如：`<div v-show></div>`
    'vue/valid-v-show': 2,

    // 检查 `v-text` 的正确性
    // 1. 不能有参数，如：`<div v-text:foo></div>`
    // 2. 不能有修饰符，如：`<div v-text.foo></div>`
    // 3. 值不能为空，如：`<div v-text></div>`
    'vue/valid-v-text': 2,

    // 模板属性使用连字符（减号），还是使用小驼峰形式
    'vue/attribute-hyphenation': [
      2,
      // always: 使用连字符，并统一使用小写
      // never: 使用小驼峰形式
      'always',
      {
        // 需要忽略检测的属性
        ignore: []
      }
    ],

    // HTML 标签的闭合尖括号是否要展示在新行
    'vue/html-closing-bracket-newline': [
      2,
      // never: 不要新起一行
      // always: 总是新起一行
      {
        // 单行的 html 标签闭合括号是否要新起一行
        singleline: 'never',
        // 多行的 html 标签闭合括号是否要新起一行
        multiline: 'always'
      }
    ],

    // HTML 标签的尖括号与标签内容之间是否要空格
    'vue/html-closing-bracket-spacing': [
      2,
      // never: 不要加空格
      // always: 要加空格
      {
        // 针对开始标签的规则
        startTag: 'never',
        // 针对结束标签的规则
        endTag: 'never',
        // 针对自闭合标签的规则，在 `/>` 前是否要加空格
        selfClosingTag: 'never'
      }
    ],

    // 校验结束标签：对于自闭合标签不允许使用结束标签，其他标签要求必须有结束标签
    // NOTE: 此规则与 vue/html-self-closing 略有重叠，暂关闭检测
    'vue/html-end-tags': 0,

    // 检查 HTML 元素的缩进
    'vue/html-indent': [
      2,
      // 数字：每个缩进的空格数
      // "tab"：使用 Tab 缩进
      2,
      {
        // 多个属性是否要垂直对齐
        alignAttributesVertically: false,
        // 属性的缩进
        attribute: 1,
        // 基础缩进
        baseIndent: 1,
        // 结束符的缩进
        closeBracket: 0,
        // 要忽略的节点
        ignores: []
      }
    ],

    // 校验 HTML 属性值的引号
    'vue/html-quotes': [
      2,
      // double: 双引号
      // single: 单引号
      'double'
    ],

    // 标签的自闭合
    // 自闭合指的 `<br />`，一定要有后边的 `/` 才算
    'vue/html-self-closing': [
      2,
      // never: 不自闭合
      // always: 总是自闭合
      // any: 都可以
      {
        // HTML 标签
        html: {
          // 标准的 HTML 标签
          normal: 'never',
          // 空白标签（标准的自闭合标签，如 `<br>`）
          void: 'never',
          // 自定义组件
          component: 'never'
        },
        // SVG 标签
        svg: 'always',
        // MathML 标签
        math: 'always'
      }
    ],

    // 一行最多多少个属性
    'vue/max-attributes-per-line': [
      2,
      {
        // 针对单行标签，最多支持多少个属性，再多要换行
        singleline: 5,
        // 针对多行标签
        multiline: {
          // 多行标签最多每行多少个属性
          max: 1
          // 与属性名同行的标签是否独立算一行
          // allowFirstLine: false
        }
      }
    ],

    // 针对多行元素，是否要求子元素折行。可参考 singleline-html-element-content-newline 规则
    // 多行元素，是指标签占据了多行，如某些属性另起一行、内容另起一行、内容包含多行、结束标签另起一行等
    // 因为行内元素可能会有属性换行，但不希望内容换行的情况，所以暂关闭此检测
    'vue/multiline-html-element-content-newline': [
      0,
      {
        // 忽略无子元素的标签
        ignoreWhenEmpty: true,
        // 要忽略的标签
        ignores: ['pre', 'textarea']
      }
    ],

    // 在 mustache 中定义值与括号间是否要空格
    'vue/mustache-interpolation-spacing': [
      2,
      // always: 在大括号内部左右各加一个空格
      // never: 在大括号内部左右不加空格
      'always'
    ],

    // 组件 `name` 值的风格
    // 'vue/name-property-casing': ['error', 'PascalCase' | 'kebab-case'],

    // 检查标签中是否有多余的空格
    'vue/no-multi-spaces': [
      2,
      {
        // 是否忽略对象属性中的空格（属性名与冒号之间）
        ignoreProperties: false
      }
    ],

    // 在模板中，属性的等号左右不应有空格
    'vue/no-spaces-around-equal-signs-in-attribute': 2,

    // 不允许在模板嵌套环境中使用同名变量，如： `<div v-for="i in 5"><span v-for="i in 10" /></div>`
    // 同时也会检测在模板中定义了 data/props 上的变量，如： `<template><div v-for="i in 5"></div></template><script>export default { props: ['i'] }</script>`
    'vue/no-template-shadow': 2,

    // Prop 名大小写，这里指的是在 <script> 中的情形
    // 参考：https://vuejs.org/v2/style-guide/#Prop-name-casing-strongly-recommended
    'vue/prop-name-casing': [
      2,
      // 可以使用 `camelCase` 或 `snake_case`
      'camelCase'
    ],

    // 要求每个 props 要有默认值
    'vue/require-default-prop': 2,

    // 要求每个 props 要有类型
    'vue/require-prop-types': 2,

    // 针对单行元素，是否要求子元素折行。可参考 multiline-html-element-content-newline 规则
    // 单行元素，是指标签起始、属性、内容、结束标签都在同一行
    'vue/singleline-html-element-content-newline': [
      0,
      {
        // 忽略无子元素的标签
        ignoreWhenEmpty: true,
        // 忽略无属性的标签
        ignoreWhenNoAttributes: true,
        // 要忽略的标签
        ignores: ['pre', 'textarea']
      }
    ],

    // 针对 `v-bind` 建议使用的方案
    'vue/v-bind-style': [
      2,
      // shorthand: 缩短方案，如：`<div :foo="bar"></div>`
      // longform: 详细方案，如：`<div v-bind:foo="bar"></div>`
      'shorthand'
    ],

    // 针对 `v-on` 建议使用的方案
    'vue/v-on-style': [
      2,
      // shorthand: 缩短方案，如：`<div @foo="bar"></div>`
      // longform: 详细方案，如：`<div v-on:foo="bar"></div>`
      'shorthand'
    ],

    // HTML 中属性的顺序
    // 参考：https://vuejs.org/v2/style-guide/#Element-attribute-order-recommended
    'vue/attributes-order': [
      2,
      {
        // 定义具体的顺序
        order: [
          // 定义 (提供组件的选项)，如 `is`
          'DEFINITION',
          // 列表渲染 (创建多个变化的相同元素)，如 `v-for`
          'LIST_RENDERING',
          // 条件渲染 (元素是否渲染/显示)，如 `v-if`, `v-else-if`, `v-else`, `v-show`, `v-cloak`
          'CONDITIONALS',
          // 渲染方式 (改变元素的渲染方式)，如 `v-once`, `v-pre`
          'RENDER_MODIFIERS',
          // 全局感知 (跨组件的感知属性)，如 `id`
          'GLOBAL',
          // 唯一特性 (需要唯一值的特性)，如 `ref`, `key`, `slot`, `slot-scope`
          'UNIQUE',
          // 双向绑定 (把绑定和事件结合起来)，如 `v-model`
          'TWO_WAY_BINDING',
          // 其他用户的绑定，如 `v-custom-directive`
          'OTHER_DIRECTIVES',
          // 其它特性 (所有普通的绑定或未绑定的特性)
          'OTHER_ATTR',
          // 事件 (组件事件监听器)，如 `v-on`
          'EVENTS',
          // 内容 (复写元素的内容)，如 `v-html`, `v-text`
          'CONTENT'
        ]
      }
    ],

    // 不允许使用 `v-html`，因为这可能会带来 XSS 漏洞
    'vue/no-v-html': 1,

    // 在组件中针对每个 key （如 data, computed ...）排序
    'vue/order-in-components': [
      0,
      {
        // 每个 key 的排序
        order: [
          // 数组表示这几个 key 的权重是相同的
          ['name', 'delimiters', 'functional', 'model'],
          ['components', 'directives', 'filters'],
          ['parent', 'mixins', 'extends', 'provide', 'inject'],
          'el',
          'template',
          'props',
          'propsData',
          'data',
          'computed',
          'watch',
          'LIFECYCLE_HOOKS',
          'methods',
          'render',
          'renderError'
        ]
      }
    ],

    // 在 <template> 中不允许使用 `this`，默认环境就已经是 this 了
    'vue/this-in-template': [
      2,
      // always: 总是给模板变量加 this 前缀
      // never: 从不在模板变量前加 this
      'never'
    ],

    // 检查数组中括号前后是否要加空格
    // 此配置与 ESLint 的 array-bracket-spacing 规则一致，但它会检查 `<template>` 中的代码
    'vue/array-bracket-spacing': [2, 'never'],

    // 箭头函数的箭头前后是否要有空格
    // 此配置与 ESLint 的 array-spacing 规则一致，但它会检查 `<template>` 中的代码
    'vue/arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],

    // 代码块前后是否要有空格
    // 此配置与 ESLint 的 block-spacing 规则一致，但它会检查 `<template>` 中的代码
    'vue/block-spacing': [2, 'always'],

    // 大括号的风格
    // 此配置与 ESLint 的 brace-style 规则一致，但它会检查 `<template>` 中的代码
    'vue/brace-style': [
      2,
      'stroustrup',
      {
        allowSingleLine: true
      }
    ],

    // 使用驼峰形式表示变量时，一些细节配置
    // 此配置与 ESLint 的 camelcase 规则一致，但它会检查 `<template>` 中的代码
    // 'vue/camelcase': [
    //   2,
    //   {
    //     properties: 'always',
    //     ignoreDestructuring: true
    //   }
    // ],

    // 对象和数组最后一个 value 后是否加逗号
    // 此配置与 ESLint 的 comma-dangle 规则一致，但它会检查 `<template>` 中的代码
    'vue/comma-dangle': [2, 'always-multiline'],

    // 自定义组件标签名使用的风格，如 `<my-component />` 还是 `<MyComponent />`
    'vue/component-name-in-template-casing': [
      2,
      // PascalCase: 大驼峰
      // kebab-case: 连字符形式
      'kebab-case',
      {
        // 只检查在 components 中注册的组件
        registeredComponentsOnly: true,
        // 要忽略的标签名
        ignores: []
      }
    ],

    // 使用 `===`
    // 此配置与 ESLint 的 eqeqeq 规则一致，但它会检查 `<template>` 中的代码
    'vue/eqeqeq': [2, 'smart'],

    // 在对象的冒号前后是否要有空格
    // 此配置与 ESLint 的 key-spacing 规则一致，但它会检查 `<template>` 中的代码
    'vue/key-spacing': [
      2,
      {
        // mode 定义空格风格，strict 为仅允许一个空格， minimum 为可因为对齐的原因多加几个空格，但对齐后，不能再多空格
        mode: 'strict',
        // 在冒号前后是否要空格
        beforeColon: false,
        afterColon: true
      }
    ],

    // 检查组件在代码中定义的名称，是否与文件名一致
    // 'vue/match-component-file-name': [
    //   1,
    //   {
    //     // 可忽略的文件扩展名
    //     extensions: ['js', 'vue', 'jsx'],
    //     // 是否要求匹配大小写
    //     shouldMatchCase: false
    //   }
    // ],

    // 对于布尔型的属性，要求默认值必须为 false，因为默认不传时 undefined 为 falsy 值
    'vue/no-boolean-default': [
      2,
      // "no-default": 不允许添加 default
      // "default-false": 可以添加 default 字段，但必须为 false
      'no-default'
    ],

    // 不允许某些特殊语法，可以使用字符串表示限制的表达式，也可以使用对象自定义限制出错信息
    // 此配置与 ESLint 的 no-restricted-syntax 规则一致，但它会检查 `<template>` 中的代码
    // 'vue/no-restricted-syntax': [
    //   2,
    //   'WithStatement',
    //   // 额外支持 Vue 的 AST，详细见 https://github.com/mysticatea/vue-eslint-parser/blob/master/docs/ast.md
    //   // 如，不允许在 mustache 中嵌入方法调用：
    //   'VElement > VExpressionContainer CallExpression'
    // ],

    // 当整个对象在一行时，大括号前后是否要加空格
    // 此配置与 ESLint 的 object-curly-spacing 规则一致，但它会检查 `<template>` 中的代码
    'vue/object-curly-spacing': [2, 'always'],

    // 检查 `<script>` 中的组件是直接 export 出去的，而不是多绕一层
    'vue/require-direct-export': 0,

    // 在 .vue 文件中的 `<script>` 标签内的缩进配置，可以参考 stylistic-issues 中的 indent 规则
    'vue/script-indent': [
      2,
      // 此参数可为数字，表示缩进的空格数，或者使用 `tab` 表示使用 tab 来缩进
      2,
      {
        // 在 `<script>` 标签内的内容，初始为几个缩进
        baseIndent: 0,
        // switch 中的 case, default 的缩进，感觉与 stylistic-issues/indent 规则有重合
        switchCase: 1,
        // 要忽略的 AST node selector，同样可参考 stylistic-issues/indent 中的 ignoredNodes 规则
        ignores: []
      }
    ],

    // 在中缀（二元、三元）操作符前后是否要有空格，如 +, -, *, /, >, <, =, ?:
    // 此配置与 ESLint 的 space-infix-ops 规则一致，但它会检查 `<template>` 中的代码
    'vue/space-infix-ops': [
      2,
      {
        int32Hint: true
      }
    ],

    // 一元操作符前后是否允许加空格
    // 此配置与 ESLint 的 space-unary-ops 规则一致，但它会检查 `<template>` 中的代码
    'vue/space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],

    // 在 `v-on` 后跟的方法名后，是否要加 `()`（Vue 会自动做调用，当无参数传递时不需要加括号）
    'vue/v-on-function-call': [
      2,
      // always: 总要跟括号
      // never: 除了需要参数，否则不允许放空的 `()`
      'never'
    ]
  },
  // plugins: ['html'],
  /**
   * 解析器配置项
   * http://eslint.cn/docs/user-guide/configuring#specifying-parser-options
   * 【】这里设置的配置项将会传递到解析器中，被解析器获取到，进行一定的处理。具体被利用到，要看解析器的源码有没有对其进行利用。这里仅仅做了参数定义，做了规定，告诉解析器的开发者可能有这些参数
   * 【】配置项目有：
   * "sourceType": "module",  // 指定JS代码来源的类型，script(script标签引入？) | module（es6的module模块），默认为script。为什么vue的会使用script呢？因为vue是通过babel-loader编译的，而babel编译后的代码就是script方式
   * "ecmaVersion": 6,     // 支持的ES语法版本，默认为5。注意只是语法，不包括ES的全局变量。全局变量需要在env选项中进行定义
   * "ecmaFeatures": {     // Features是特征的意思，这里用于指定要使用其他那些语言对象
    "experimentalObjectRestSpread": true, //启用对对象的扩展
    "jsx": true,              //启用jsx语法
    "globalReturn":true,          //允许return在全局使用
    "impliedStrict":true          //启用严格校验模式
   }
   */
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false
  }
  // overrides: [{
  //     files: ['**/__tests__/*.{j,t}s?(x)'],
  //     env: {
  //       mocha: true
  //     }
  //   },
  //   {
  //     files: ['**/public/static/air-map-v1.0/*.{j,t}s'],
  //     plugins: ['es5'],
  //     rules: {
  //       'es5/no-arrow-functions': 'error'
  //     }
  //   }
  // ]
}
