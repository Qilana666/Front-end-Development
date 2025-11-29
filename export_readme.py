import os

# -------------------------- 核心配置：改这里就行 --------------------------
# 1. 只遍历你要的文件夹（之前的设置保留，不变）
MY_FOLDERS = [ "ai"]  # 替换成你的知识点文件夹

# 2. 排除你不想看的内容（填文件夹名、路径关键词，支持模糊匹配）
# 例子：排除 node_modules、test文件夹、dist文件夹、.git文件夹
EXCLUDE_LIST = ["node_modules", ".git",  "临时文件"]
# ------------------------------------------------------------------------

summary_file = "我的知识点汇总.md"
# 初始化汇总文件
with open(summary_file, "w", encoding="utf-8") as f:
    f.write("# 我的知识点汇总\n\n")

# 只遍历你指定的文件夹
for folder in MY_FOLDERS:
    if not os.path.exists(folder):
        print(f"文件夹 {folder} 不存在，跳过")
        continue
    for root, dirs, files in os.walk(folder):
        for file in files:
            if file.lower() == "readme.md":
                file_path = os.path.join(root, file)
                with open(summary_file, "a", encoding="utf-8") as f:
                    f.write(f"## {file_path}\n")
                with open(file_path, "r", encoding="utf-8") as f_read:
                    content = f_read.read()
                    with open(summary_file, "a", encoding="utf-8") as f_write:
                        f_write.write(content + "\n\n---\n\n")

print(f"✅ 汇总完成！已生成文件：{summary_file}")