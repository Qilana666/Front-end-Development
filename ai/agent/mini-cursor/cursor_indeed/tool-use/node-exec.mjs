// exec 执行命令的tool
import {
  spawn
  // node 内置模块
  // 高级 创建一个子进程
  // 进程 process 分配资源的最小单位
  // 线程 thread  执行的最小单位 
  // 主进程 node node-exec.mjs
  // 执行 npm i npm run dev npm init vite
  // cmd 本身就是进程 不能阻塞主进程
  // node 是多进程的架构
  // 父mini-cursor 启动 子 进程
  // 父进程：是你启动的那个 Node.js 程序，它负责发号施令和管理。
  // 子进程：子进程是父进程创建的“分身”，负责执行任务并返回结果后结束。
} from 'node:child_process';

// bash 命令
// windows 终端下不能直接 没luinx环境  可以在git bash下执行
const command = 'ls -la'; //了解目录中所有文件（含隐藏文件）的详细信息
// 新建一个子进程
const [cmd, ...args] = command.split(' ');
const cwd = process.cwd();
console.log(`当前工作目录：${cwd}`)
// 并发
const child = spawn(cmd, args, {
  cwd,
  // 继承父进程的输入输出流 stdin stdout
  stdio: 'inherit',
  shell: true,
})

let errorMsg = '';
// 进程中的通信？基于事件
child.on('error', (err) => {
  errorMsg = err.message;
})
child.on('close', (code) => {
  if (code === 0) {
    // 成功退出
    console.log('命令执行成功，子进程退出');
    process.exit(0);
  } else {
    if (errorMsg) {
      console.error(`错误：${errorMsg}`)
    }
    process.exit(code || 1);
  }
})
