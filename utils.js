const rebalance = (tree) => {
    const nodes = [];
  
    // Perform an in-order traversal to collect all nodes
    const inOrderTraversal = (node) => {
      if (!node) return;
      inOrderTraversal(node.left);
      nodes.push(node.data);
      inOrderTraversal(node.right);
    };
  
    inOrderTraversal(tree.currentRoot);
  
    // Rebuild the tree with the sorted nodes array
    const rebuildTree = (arr, start, end) => {
      if (start > end) return null;
  
      const mid = Math.floor((start + end) / 2);
      const node = createNode(arr[mid]);
  
      node.left = rebuildTree(arr, start, mid - 1);
      node.right = rebuildTree(arr, mid + 1, end);
  
      return node;
    };
  
    const newRoot = rebuildTree(nodes, 0, nodes.length - 1);
    tree.currentRoot = newRoot;
  
    return tree;
  };
  
export default rebalance;