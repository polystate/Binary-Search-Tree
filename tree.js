import createNode from './node.js';
import prettyPrint from './prettyprint.js';

const Tree = (arr) => {
  let currentRoot;

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

    //Set root node before returning object properties
    currentRoot = arr[Math.floor(arr.length/2)];
    
    return currentNode;
  };
  
  const traverse = (node, visited) => {
    //Check if duplicate
    if(node.data === visited.data) return;

    let direction;
    (node.data < visited.data) ? direction = 'left' : direction = 'right';

    if(visited[direction] === null){
      visited[direction] = node;
      prettyPrint(currentRoot);
      return;
    }

    traverse(node, visited[direction]);
  }

  const insertNode = (val) => {
    if(isNaN(val)) return;

    const newNode = createNode(val);
    traverse(newNode, currentRoot);
  }

  return { buildTree, initializeTree, insertNode };
};

const myTree = Tree([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);
const initializeTree = myTree.initializeTree();
prettyPrint(myTree.buildTree(initializeTree));
myTree.insertNode(6);
myTree.insertNode(29);
myTree.insertNode(4.4);
myTree.insertNode(9378);
myTree.insertNode(30);
myTree.insertNode(28);
myTree.insertNode(29.5);
myTree.insertNode(25);
myTree.insertNode(0.5);
myTree.insertNode(29);
myTree.insertNode(30);
myTree.insertNode(30.5);
myTree.insertNode(6);
myTree.insertNode(0.25);
myTree.insertNode(0.75);
myTree.insertNode('sdfg');