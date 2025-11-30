# DeepSeek

- thinking
    推理 reasoning
- modelscope
    魔搭是阿里云推出的模型开放平台，提供海量机器学习和深度学习模型（开源），
    覆盖语音、视觉、nlp等。下载开源模型，微调或部署模型，致力于降低AI应用门槛，推动模型即服务

- .ipynb
    - python 天生适合计算和机器学习
    - 可以逐条，随意运行，特别适合实验一个算法，推理一个公式，一个大模型的表现
    JupyterNotebook 文件格式，支持交互式编程与数据科学工作流。

## 模块化
<!-- modelscope 预装了 -->
<!-- OpenAI sdk 是绝大多数大模型的api 接口事实标准 只用把base url改了 -->
<!-- es6反过来 -->
<!-- 模块化的好处是 分离关注点（一个模块一个文件干一件事），提高代码的可维护性和可扩展性 -->
- from openai import OpenAI  OpenAI大写，是个类

## chat.completions
- 多轮对话
    - 更好的上下文
- role
    - system 多轮聊天中，只在最初设置一次，例如身份和约定
    - user 用户输入
    - assistan

## 大模型的训练
Deepseek 基于**预训练数据**中的文本模型进行推理和回答的
- 新闻，股市等实时性信息是不知道的

## 大模型调用工具
- 教LLM去使用上网调用接口的工具？
