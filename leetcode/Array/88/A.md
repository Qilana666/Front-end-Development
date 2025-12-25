\*\*

- @param {number[]} nums1
- @param {number} m
- @param {number[]} nums2
- @param {number} n
- @return {void} Do not return anything, modify nums1 in-place instead.
  \*/
  var merge = function(nums1, m, nums2, n) {
  let idx = m + n - 1;
  let i = m - 1;
  let j = n - 1;

      // 从后往前合并
      while (i >= 0 && j >= 0) {
          if (nums1[i] >= nums2[j]) {
              nums1[idx--] = nums1[i--];
          } else {
              nums1[idx--] = nums2[j--];
          }
      }

      // 如果 nums2 还有剩余元素，复制到 nums1 开头
      //注意：如果 i >= 0 剩余，不需要处理，因为它们已在 nums1 正确位置
      // nums1就是从小往大排列的
      while (j >= 0) {
          nums1[idx--] = nums2[j--];
      }

  };
