## 在 common 中的 uni-config-center 中新建 `zero-ai` 文件夹

## 创建 `config.json` 文件 填入以下代码

```
{
	"spentScore": 0,
	"assignRole": "",
	"assignRoleErrorTips": "",
	"llm": {
		"provider": "azure"
	},
	"chatCompletionOptions": {
		"tokensToGenerate": 512
	}
}
```
自定义项:

	- "spentScore" : 每次对话需要消耗的积分
	- "assignRole" : 指定用户角色才能使用ai对话功能
	- "assignRoleErrorTips" : 开启了指定用户角色后,非指定角色访问时的提示信息
	
