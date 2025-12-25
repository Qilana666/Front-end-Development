283. 移动零

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

/\*\*

- @param {number[]} nums
- @return {void} Do not return anything, modify nums in-place instead.
  \*/

// left 指向下一个非零元素应放置的位置，right 遍历整个数组。
//遇到非零元素就交换
var moveZeroes = function(nums) {
let left = 0;
let right = 0;
const n = nums.length;

    while (right < n) {
        if (nums[right] !== 0) {
            // 交换元素
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
        }
        right++;
    }

};
