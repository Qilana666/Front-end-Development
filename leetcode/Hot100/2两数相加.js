/**
 * 两数相加（链表版）
 * 题目描述：给定两个非空链表，分别表示两个非负整数。数字以逆序存储（个位在前，十位在后...），
 * 每个节点包含一个数字。计算两个数的和，并以相同形式返回一个表示和的链表。
 * 
 * @param {ListNode} l1 - 第一个链表
 * @param {ListNode} l2 - 第二个链表
 * @return {ListNode} - 表示两数之和的链表
 */
var addTwoNumbers = function(l1, l2) {
    // 初始化结果链表的头节点和尾节点，初始都为 null
    let head = null, tail = null;
    
    // 进位值，初始为 0
    let carry = 0;
    
    // 当 l1 或 l2 还有节点时，继续遍历
    while (l1 || l2) {
        // 获取当前节点的值，如果链表已经遍历完，则值为 0
        const n1 = l1 ? l1.val : 0;
        const n2 = l2 ? l2.val : 0;
        
        // 计算当前位的和（包括进位）
        const sum = n1 + n2 + carry;
        
        // 创建新节点，值为 sum 对 10 取余（即当前位的数字）
        if (!head) {
            // 如果是第一个节点，head 和 tail 都指向它
            head = tail = new ListNode(sum % 10);
        } else {
            // 否则，将新节点连接到 tail 后面，并更新 tail
            tail.next = new ListNode(sum % 10);
            tail = tail.next;
        }
        
        // 更新进位值（sum 除以 10 的整数部分）
        carry = Math.floor(sum / 10);
        
        // 移动到下一个节点（如果存在）
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
    }
    
    // 如果最后还有进位，需要创建一个新节点
    if (carry > 0) {
        tail.next = new ListNode(carry);
    }
    
    // 返回结果链表的头节点
    return head;
};