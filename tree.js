import createNode from './node.js';
import prettyPrint from './prettyprint.js';

const Tree = (arr) => {;

  const initializeTree = () => {
    const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);
    const nodeArr = sortedArr.map(elem => createNode(elem));
    return nodeArr;
  };

  const buildTree = (arr) => {
    if (arr.length === 0) return null;

    const rootIndex = Math.floor(arr.length / 2);
    const currentNode = arr[rootIndex];

    const leftSubArr = arr.slice(0, rootIndex);
    const rightSubArr = arr.slice(rootIndex + 1);

    currentNode.left = buildTree(leftSubArr);
    currentNode.right = buildTree(rightSubArr);

    return currentNode;
  };

  const insertNode = (val) => {
    console.log(val);
  }

  const deleteNode = (val) => {
    console.log(val);
  }

  return { buildTree, initializeTree, insertNode, deleteNode };
};

const myTree = Tree([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);
const initializeTree = myTree.initializeTree();
const builtTree = prettyPrint(myTree.buildTree(initializeTree));

