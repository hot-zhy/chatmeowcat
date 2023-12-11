# zero-ai

> 仅测试于 vue3, 微信小程序. 其他平台可自行测试

## 一. 介绍

基于 uni-ai 打造属于自己的gpt,无需魔法,无需key。这是一个`纯净版`的页面模板插件,可自行设置,无需登录,无需广告,无需积分.
可供自己或团队内部,企业内部使用.

## 二. 大语言模型

依赖于uni-ai计费网关,目前支持**`付费`**使用国内大模型厂商minimax，以及微软与openai合作提供的基于azure的ChatGPT3.5（与openai的ChatGPT3.5一致）。

|服务商	|模型					|
|---	|---					|
|azure	|gpt-3.5-turbo（默认值）|
|minimax|abab5-chat				|

对话中可自己随意切换服务商

## 三. 使用前须知

此插件为`页面`模板项目,表示默认你已经有一个自己的项目了,往上增加一个 zero-ai 的对话聊天页面


## 四. 使用方法

1. 开通 `uni-ai` 计费网关  [如何开通](https://uniapp.dcloud.net.cn/uniCloud/uni-ai-buy.html)
2. 在项目的 `manifest.json` 文件中找到uniPush2.0并勾选开通. [如何开通](https://uniapp.dcloud.net.cn/unipush-v2.html#%E7%AC%AC%E4%B8%80%E6%AD%A5-%E5%BC%80%E9%80%9A)
3. 下载 zero-ai 插件
4. 部署插件中的云函数到服务空间
5. 运行项目
6. 在 uniCloud -> cloudfunctions -> common -> uni-config-center 中创建 `zero-ai` 配置文件, 具体方法在插件云函数中的readme中
7. 开始测试聊天




## 五. 关于普通授权版

导入运行后可能会有报错,这是因为文件加密后导致的,不影响使用

`源码版没有报错问题`


## 六. 关于源码授权版

下载源码授权版后请把 `package.json` 文件中的 `uni_modules` 对象中的 `encrypt` 数组内的加密项都删掉,以免影响部署使用

```
 "uni_modules": {
    "dependencies": [
		"uni-icons",
		"uni-popup",
		"uni-dateformat"
	],
    "encrypt": [
		// 这里的内容清空
	],
    "platforms": {
      "cloud": {
        "tcb": "y",
        "aliyun": "y"
      },
   ...
   }
```
## 添加作者wx交流学习: zerojs2022 ,请备注 "zero-ai"