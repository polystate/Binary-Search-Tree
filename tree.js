import createNode from './node.js';
import prettyPrint from './prettyprint.js';

const Tree = (arr) => {
  let currentRoot;

  const initializeTree = () => {
    const sortedArr = Array.from(new Set(arr)).sort((a, b) => a - b);
    const nodeArr = sortedArr.map(elem => createNode(elem));
    return nodeArr;
  };

  const buildTree = (arr, nodeParent = null) => {
    if (arr.length === 0) return null;

    const rootIndex = Math.floor(arr.length / 2);
    const currentNode = arr[rootIndex];

    const leftSubArr = arr.slice(0, rootIndex);
    const rightSubArr = arr.slice(rootIndex + 1);

    currentNode.left = buildTree(leftSubArr, currentNode);
    currentNode.right = buildTree(rightSubArr, currentNode);
    currentNode.parent = nodeParent;
    
    //Set root node before returning object properties
    currentRoot = arr[Math.floor(arr.length / 2)];
    
    return currentNode;
  };

  const isDuplicate = (data, visited) => {
    return data === visited.data;
  }
  
  const traverse = (data, visited) => {
    let direction;
    (data < visited.data) ? direction = 'left' : direction = 'right';

    return direction;
  }

  const inputTraverse = (node, visited) => {
    if(isDuplicate(node.data, visited)) return;

    const currentDirection = traverse(node.data, visited);

    //Finding the leaf
    if(visited[currentDirection] === null){
      visited[currentDirection] = node;
      node.parent = visited;
      prettyPrint(currentRoot);
      return;
    }

    inputTraverse(node, visited[currentDirection]);
  }

  const deleteTraverse = (data, visited) => {
    if(isDuplicate(data, visited)){
      const parent = visited.parent;
      (parent.right.data === data) ? parent.right = null : parent.left = null;
      prettyPrint(currentRoot);
      return;
    }
   
    const currentDirection = traverse(data, visited);

    deleteTraverse(data, visited[currentDirection]);  
  }

  const insertNode = (data) => {
    try {
    if(isNaN(data)) throw new Error('Invalid value. Expected a number.');
    const newNode = createNode(data);
    inputTraverse(newNode, currentRoot);
    } catch(error) {
      console.error(error.message);
    }
  }

  const deleteNode = (data) => {
    console.log(data);
    deleteTraverse(data, currentRoot);
    //Deleting Nodes
    //1. If it's a leaf, you just remove it. Simple.
    //2. If the targeted node only has one child, you simply change its parents pointer
    //to the child. this automatically deletes the targeted node.
    //3. If removing a node that has two children. Here, we find the thing in the tree
    //that is the next biggest, by looking in the right subtree. We find the
    //node that is the next biggest in its right subtree, we take that node and
    //replace our targeted node with that next biggest node. that's it. first you delete
    //that next biggest node (usually it's a leaf, sometimes not) and then replace it
    //with the original targeted node.
    //so in summary, we look for the smallest thing in its right subtree and we recursively
    //remove the smallest thing in its right subtree, take the key in that node
    //and replace that key with the original thing we were trying to remove.
  }

  return { buildTree, initializeTree, insertNode, deleteNode };
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
myTree.insertNode(19);
myTree.deleteNode(6);





