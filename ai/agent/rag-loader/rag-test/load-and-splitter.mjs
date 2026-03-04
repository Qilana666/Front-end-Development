import "dotenv/config";
import "cheerio";// 后端，使用css选择器 像操作前端一样查找DOM节点
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";

const cheerioLoader = new CheerioWebBaseLoader(
    "https://juejin.cn/post/7233327509919547452?searchId=20260302193603120AE3328025B138C1FB",
    {
        selector: '.main-area p'
    }
)

const documents = await cheerioLoader.load();
// console.log(documents);
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400, // 大小
    chunkOverlap: 50, // 重叠 语意的连贯性
    separators: ['。', '，', '！', '？'] // 分割符
})

const splitDocuments = await textSplitter.splitDocuments(documents);
console.log(splitDocuments);
console.log(`文档分割完成，共${splitDocuments.length}个片段`);

const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.MODEL_NAME,
    configuration: { baseURL: process.env.OPENAI_BASE_URL },
});

// 向量存储需要 embeddings 模型把文本转成向量，必须传入
const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.EMBEDDING_MODEL_NAME,
    configuration: { baseURL: process.env.OPENAI_BASE_URL },
});

console.log("正在创建向量存储...");
const vectorStore = await MemoryVectorStore.fromDocuments(
    splitDocuments, 
    embeddings
);
console.log("向量存储创建完成");

const retriever = await vectorStore.asRetriever({ k: 2});

const questions = [ "父亲的去世对作者的人生态度产生了怎样的根本性逆转?" ];

for (const question of questions) {
    console.log("=".repeat(80));
    console.log(`[问题]：${question}`);
    console.log("=".repeat(80));

    const retrievedDocs = await retriever.invoke(question);
    const scoreResults = await vectorStore.similaritySearchWithScore(question, 2);
    console.log(scoreResults)
    console.log("\n [检索到的文档及相识度评分]");
    retrievedDocs.forEach((doc, i) => {
        const scoreResult = scoreResults.find(
            ([scoredDoc]) => scoredDoc.pageContent === doc.pageContent
        );
        const score = scoreResult ? scoreResult[1] : null;
        const similarity = score ? (1 - score).toFixed(2) : "N/A";

        console.log(`\n 文档 ${i+1} 相似度：${similarity}`);
        console.log(`内容：${doc.pageContent}`);
        if (doc.metadata && Object.keys(doc.metadata).length > 0) {
            console.log(`元数据：${JSON.stringify(doc.metadata)}`);
        }
    });

    const content = retrievedDocs
        .map((doc,i) => `[片段${i+1}]\n ${doc.pageContent}`)
        .join("\n\n----\n\n");

    const prompt = `你是一个文章辅助阅读助手，根据文章内容来解答：
    文章内容：
    ${content}

    问题：
    ${question}
    回答：
    `
    console.log("\n [AI 回答]");
    const response = await model.invoke(prompt);
    console.log(response.content);
}