import fs from "node:fs";
import Parser from "rss-parser";

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "mcp-cn-hotspots-cli/1.0" },
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
  const sources = new Set(group.map(x => x.source));
  const sourceScore = sources.size * 20;

  const newest = Math.max(...group.map(x => x.publishedAt || 0));
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
      console.error("抓取失败:", f.name, e.message);
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
      sources: [...new Set(group.map(x => x.source))],
      links: group.slice(0, 3).map(x => x.link),
    });
  }

  return list.sort((a, b) => b.score - a.score).slice(0, topN);
}

// ===== 程序入口 =====
const hotspots = await buildHotspots(24, 10);

console.log("\n📌 中文新闻热点 Top 10\n");
hotspots.forEach((h, i) => {
  console.log(
    `${i + 1}. ${h.title}\n   分数: ${h.score}\n   来源: ${h.sources.join(
      ", "
    )}\n`
  );
});
