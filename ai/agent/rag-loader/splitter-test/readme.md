# Splitter 理解

- loader 加载的大Document 来自@langchain/community
  PDF doc 不是一个类型 它们的loader不一样
- RecursiveCharaterTextSplitter
  限定text类型
- splitter
  按照 character 按这个切 符合语义
  是个数组["。","?","!",","]
  优先级 。最优先
  chunk_size的靠近 递归的尝试 ？！,
  保持语义不被破坏
  切断没关系 overlap 重叠的部分 牺牲一定的空间（chunk_size 10%） 重复

  先character 切 再 chunkSize 最后Overlap

- RAG 问题
  - 流程
  - loader
  - splitter 细节 三个参数 -》 chunkSize切割大小 chunkOverlap重叠 separators分隔符
  - splitter 面向对象体系和关系（UML）
    父类 TextSplitter 切割的是文本 MP3 mp4不适合
    一系列的子类 CharacterTextSplitter 按字符切割
    TokenTextSplitter 按token数量切割
    RecursiveTextSplitter 语义的完整性特别好
    特殊 MarkdownTextSplitter 按markdown语法切割 为什么属于RecursiveTextSplitter子类
    通用 RecursiveTextSplitter 递归的切割
