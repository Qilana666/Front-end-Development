import fs from "node:fs";
import Parser from "rss-parser";
import { z } from "zod";

// ✅ 注意：这里用 McpServer，而不是 Server
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "mcp-cn-hotspots/1.0" },
});

function loadFeeds() {
  return JSON.parse(fs.readFileSync("./feeds.json", "utf-8"));
}

function normalizeTitle(title = "") {
  return title
    .replace(/\s+/g, " ")
    .replace(/[【】\[\]（）()]/g, "")
    .replace(/第\d+|最新|突发|快讯|关注/g, "")
    .trim()
    .toLowerCase();
}

function groupByTitle(items) {
  const map = new Map();
  for (const it of items) {
    const key = normalizeTitle(it.title);
    if (!key) continue;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(it);
  }
  return map;
}

function scoreGroup(group) {
  const sources = new Set(group.map((x) => x.source));
  const sourceScore = sources.size * 20;

  const newest = Math.max(...group.map((x) => x.publishedAt || 0));
  const hoursAgo = (Date.now() - newest) / 3600000;
  const freshness = Math.max(0, 10 - hoursAgo);

  return sourceScore + freshness;
}

async function collectNews(hours = 24) {
  const feeds = loadFeeds();
  const cutoff = Date.now() - hours * 3600000;
  const all = [];

  for (const f of feeds) {
    try {
      const feed = await parser.parseURL(f.url);
      for (const it of (feed.items || []).slice(0, 30)) {
        const t = new Date(it.isoDate || it.pubDate || Date.now()).getTime();
        if (t < cutoff) continue;
        all.push({
          title: it.title || "",
          link: it.link || "",
          source: f.name,
          publishedAt: t,
        });
      }
    } catch (e) {
      // 某个源失败不影响整体
    }
  }
  return all;
}

async function buildHotspots(hours = 24, topN = 10) {
  const items = await collectNews(hours);
  const groups = groupByTitle(items);

  const list = [];
  for (const group of groups.values()) {
    const score = scoreGroup(group);
    group.sort((a, b) => b.publishedAt - a.publishedAt);
    list.push({
      title: group[0].title,
      score,
      sources: [...new Set(group.map((x) => x.source))],
      links: group.slice(0, 3).map((x) => x.link),
    });
  }

  return list.sort((a, b) => b.score - a.score).slice(0, topN);
}

// ✅ 用 McpServer 创建服务器
const server = new McpServer({
  name: "cn-hotspots",
  version: "1.0.0",
});

// ✅ 用 zod 定义参数 schema，然后注册 tool
server.tool(
  "get_cn_hotspots",
  {
    hours: z.number().default(24),
    topN: z.number().default(10),
  },
  async ({ hours, topN }) => {
    const result = await buildHotspots(hours, topN);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  }
);

// ✅ stdio 方式启动
const transport = new StdioServerTransport();
await server.connect(transport);
