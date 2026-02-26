// Browser/Server 架构 Web程序
//  C/S 架构 Client/Server 通信
// mcp 协议 通信协议 
// mcp client cursor
// mcp server my-mcp-server.mjs
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
// 标准输入输出流 通信
import {StdioServerTransport} from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod';
// tool 数据服务
const database = {
    users: {
        "001": { id: "001", name: "张三", email: "zhangsan@example.com", role: "admin" },
        "002": { id: "002", name: "李四", email: "lisi@example.com", role: "user" },
        "003": { id: "003", name: "王五", email: "wangwu@example.com", role: "user" },
    }
}

const server = new McpServer({
    name: 'my-mcp-server',
    version: '1.0.0',
});

server.registerTool('query-user', {
    description: '查询数据库中的用户信息。输入用户ID, 返回该用户的详细信息（姓名、邮箱、角色）。',
  inputSchema: {
      // userId: z.string().description("用户 ID, 例如：001, 002, 003")
        userId: z.string().describe("用户 ID, 例如：001, 002, 003")
    }
}, async ({ userId }) => {
    const user = database.users[userId];
    if (!user) {
        return {
            content: [
                {
                    type: 'text',
                    text: `用户ID ${userId} 不存在。可用的ID: 001, 002, 003`
                }
            ]
        }
    } else {
        return {
            content: [
                {
                    type: 'text',
                    text: `用户信息：\n- ID: ${user.id}\n- 姓名: ${user.name}\n- 邮箱: ${user.email}\n- 角色: ${user.role}`
                }
            ]
        }
    }
})
// 链接方式 标准输入输出流  本地进程调用
const transport = new StdioServerTransport();
await server.connect(transport);
