import "dotenv/config";
import { 
    ChatOpenAI,
    OpenAIEmbeddings
} from "@langchain/openai";
// 知识库中一段知识的抽象概念
import {
    Document
} from "@langchain/core/documents";
// 内存向量数据库 
import {
    MemoryVectorStore
} from "@langchain/classic/vectorstores/memory";

const model = new ChatOpenAI({
    modelName: process.env.MODEL_NAME,
    apiKey: process.env.OPENAI_API_KEY,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL
    },
    temperature: 0,
});

const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model:  process.env.EMBEDDING_MODEL_NAME,
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL
    },
});
// 知识库中的文档
const documents = [
    new Document({
        pageContent: `光光是一个活泼开朗的小男孩，他有一双明亮的大眼睛，总是带着灿烂的笑容。光光最喜欢的事情就是和朋友们一起玩耍，他特别擅长踢足球，每次在球场上奔跑时，就像一道阳光一样充满活力。`,
        metadata: { 
          chapter: 1, 
          character: "光光", 
          type: "角色介绍", 
          mood: "活泼"
        },
      }),
    new Document({
        pageContent: `东东是光光最好的朋友，他是一个安静而聪明的男孩。东东喜欢读书和画画，他的画总是充满了想象力。虽然性格不同，但东东和光光从幼儿园就认识了，他们一起度过了无数个快乐的时光。`,
        metadata: { 
          chapter: 2, 
          character: "东东", 
          type: "角色介绍", 
          mood: "温馨"
        },
      }),
    new Document({
        pageContent: `有一天，学校要举办一场足球比赛，光光非常兴奋，他邀请东东一起参加。但是东东从来没有踢过足球，他担心自己会拖累光光。光光看出了东东的担忧，他拍着东东的肩膀说："没关系，我们一起练习，我相信你一定能行的！"`,
        metadata: {
          chapter: 3,
          character: "光光和东东",
          type: "友情情节",
          mood: "鼓励",
        },
      }),
    new Document({
        pageContent: `接下来的日子里，光光每天放学后都会教东东踢足球。光光耐心地教东东如何控球、传球和射门，而东东虽然一开始总是踢不好，但他从不放弃。东东也用自己的方式回报光光，他画了一幅画送给光光，画上是两个小男孩在球场上一起踢球的场景。`,
        metadata: {
          chapter: 4,
          character: "光光和东东",
          type: "友情情节",
          mood: "互助",
        },
      }),
    new Document({
        pageContent: `比赛那天终于到了，光光和东东一起站在球场上。虽然东东的技术还不够熟练，但他非常努力，而且他用自己的观察力帮助光光找到了对手的弱点。在关键时刻，东东传出了一个漂亮的球，光光接球后射门得分！他们赢得了比赛，更重要的是，他们的友谊变得更加深厚了。`,
        metadata: {
          chapter: 5,
          character: "光光和东东",
          type: "高潮转折",
          mood: "激动",
        },
      }),
    new Document({
        pageContent: `从那以后，光光和东东成为了学校里最要好的朋友。光光教东东运动，东东教光光画画，他们互相学习，共同成长。每当有人问起他们的友谊，他们总是笑着说："真正的朋友就是互相帮助，一起变得更好的人！"`,
        metadata: {
          chapter: 6,
          character: "光光和东东",
          type: "结局",
          mood: "欢乐",
        },
      }),
    new Document({
        pageContent: `多年后，光光成为了一名职业足球运动员，而东东成为了一名优秀的插画师。虽然他们走上了不同的道路，但他们的友谊从未改变。东东为光光设计了球衣上的图案，光光在每场比赛后都会给东东打电话分享喜悦。他们证明了，真正的友情可以跨越时间和距离，永远闪闪发光。`,
        metadata: {
          chapter: 7,
          character: "光光和东东",
          type: "尾声",
          mood: "温馨",
        },
      }),
];
// 内存数据库
const vectorStore = await MemoryVectorStore.fromDocuments(
    documents,
    embeddings
)
// 构建“检索器” (Retriever)
// k 返回多少段文档
// 拿着用户的问题，去向量数据库里找最相关的 k (这里是 3) 段文字。
// 把问题也变成向量 -> 计算它与库中所有文档向量的余弦相似度 (Cosine Similarity) -> 取出得分最高的 3 个。
const retriever = vectorStore.asRetriever({ k: 3});

const questions = [ "光光和东东各自擅长什么？" ];

for (const question of questions) {
    console.log("=".repeat(80));
    console.log(`问题: ${question}`);
  console.log("=".repeat(80));
  
    // 先将question 转换为向量
    // 再通过向量搜索，cosine 找到最相似的文档
    // 核心检索（Retrieval）
    const retrievedDocs = await retriever.invoke(question);
  console.log(retrievedDocs);
    // 获取具体分数（Scoring）
    const scoreResults = await vectorStore.similaritySearchWithScore(question, 3);
    console.log(scoreResults);
    console.log("\n [检索到的文档及相识度评分]");
    retrievedDocs.forEach((doc, i) => {
        const scoreResult = scoreResults.find(
            ([scoredDoc]) => scoredDoc.pageContent === doc.pageContent
        );
      const score = scoreResult ? scoreResult[1] : null;
      // 如果是余弦距离，范围通常在 0 到 2 之间（或者归一化后）。
      // 这里用 1 - score 是为了将其转换为直观的 相似度 (Similarity)，数值越接近 1 表示越相似。
        const similarity = score ? (1 - score).toFixed(2) : "N/A";
        console.log(`\n 文档 ${i+1} 相似度：${similarity}`);
        console.log(`内容：${doc.pageContent}`);
        console.log(`元数据：${JSON.stringify(doc.metadata)}`);
    })
    // 构建上下文 (Context)
    const context = retrievedDocs
        .map((doc,i) => `[片段${i+1}]\n ${doc.pageContent}`)
        .join("\n\n----\n\n");
    // 构造 Prompt (提示词工程)
    const prompt = `
    你是一个讲友情故事的老师。
    基于以下故事片段回答问题，用温暖生动的语言。
    如果故事中没有提及，就说“这个故事里没有提到这个细节”

    故事片段：
    ${context}


    问题：
    ${question}

    老师的回答：
    `;

    console.log("\n [AI 回答]");
    // 调用模型
    //模型读取 Prompt，结合上下文，生成温暖生动的回答。
    const response = await model.invoke(prompt);
    console.log(response.content);
    console.log("\n");

}