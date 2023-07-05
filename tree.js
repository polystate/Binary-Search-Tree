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
      return;
    }

    inputTraverse(node, visited[currentDirection]);
  }

  const deleteTraverse = (data, visited) => {
    if (isDuplicate(data, visited)) {
      const parent = visited.parent;
  
      if (!visited.left && !visited.right) {
        // Case 1: visited is a leaf
        if (parent && parent.left === visited) {
          parent.left = null;
        } else if (parent && parent.right === visited) {
          parent.right = null;
        } else if (!parent) {
          currentRoot = null; // Update currentRoot if visited is the root node
        }
      } else if (visited.left && visited.right) {
        // Case 2: visited has two children
        let rightSubTreeRoot = visited.right; 
        while (rightSubTreeRoot.left) {
          rightSubTreeRoot = rightSubTreeRoot.left;
        }
        if (rightSubTreeRoot.parent.left === rightSubTreeRoot) {
          rightSubTreeRoot.parent.left = null;
        } else if (rightSubTreeRoot.parent.right === rightSubTreeRoot) {
          rightSubTreeRoot.parent.right = null;
        }
        visited.data = rightSubTreeRoot.data; 
      } else {
        // Case 3: visited has one child
        const branch = visited.right || visited.left;
        if (parent && parent.left === visited) {
          parent.left = branch;
        } else if (parent && parent.right === visited) {
          parent.right = branch;
        } else if (!parent) {
          currentRoot = branch; // Update currentRoot if visited is the root node
        }
        if (branch) {
          branch.parent = parent;
        }
      }
      return;
    }
  
    const currentDirection = traverse(data, visited);
    deleteTraverse(data, visited[currentDirection]);
  };
  

  const insertNode = (data) => {
    try {
    if(isNaN(data)) throw new Error('Invalid value. Expected a number.');
    const newNode = createNode(data);
    inputTraverse(newNode, currentRoot);
    prettyPrint(currentRoot);
    } catch(error) {
      console.error(error.message);
    }
  }

  const deleteNode = (data) => {
    try {
      if(isNaN(data)) throw new Error('Invalid value. Expected a number.');
      deleteTraverse(data, currentRoot);
      prettyPrint(currentRoot);
      } catch(error) {
        console.error(error.message);
      }
    
  }

  const findNode = (data, visited = currentRoot) => {
    if(isDuplicate(data, visited)){
      return visited;
    }
    const currentDirection = traverse(data, visited);
    if(!visited[currentDirection]){
      console.error('Node of ' + data + ' was not found.');
      return;
    }
    return findNode(data, visited[currentDirection]);
  }

  //breadth-first approach

  const levelOrder = (func) => {
    const queue = [currentRoot];
    while(queue.length){
      let dequeued = queue.shift();
      (func) ? func(dequeued) : console.log(dequeued);
      dequeued.left && queue.push(dequeued.left);
      dequeued.right && queue.push(dequeued.right);
    }
  }

  //depth-first approach

  const depthFirst = (method, func, current = currentRoot) => {
    if(!current){
      return;
    }

    switch(method){
      case "inorder":
        depthFirst(method, func, current.left);
        (func) ? func(current) : console.log(current.data);
        depthFirst(method, func, current.right);
        break;
      case "preorder":
        (func) ? func(current) : console.log(current.data);
        depthFirst(method, func, current.left);
        depthFirst(method, func, current.right);
        break;
      case "postorder":
        depthFirst(method, func, current.left);
        depthFirst(method, func, current.right);
        (func) ? func(current) : console.log(current.data);
        break;
      default:
        console.log("Method not recognized.");
    }
  }

  const getHeight = (data) => {
    const findHeight = (node) => {
      if (!node) {
        return 0;
      }
      const leftHeight = findHeight(node.left);
      const rightHeight = findHeight(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
    };
  
    const node = findNode(data);
    if (!node) {
      console.error('Node not found');
      return;
    }
    const height = findHeight(node) - 1; 
    console.log('Height:', height);
  };

  const getDepth = (data) => {
    let node = findNode(data);
    let parentCount = 0;
    while(node.parent){
      node = node.parent;
      parentCount++;
    }
    console.log('Depth of: ' + parentCount);
    return parentCount;
  }

  return { buildTree, initializeTree, insertNode, deleteNode, findNode, levelOrder, depthFirst, getHeight, getDepth };
};

const myTree = Tree([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);
const initialized = myTree.initializeTree();
prettyPrint(myTree.buildTree(initialized));
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
myTree.deleteNode(9);
myTree.deleteNode(28);
myTree.deleteNode(7);
myTree.deleteNode(8);
myTree.findNode(4.2);
myTree.findNode(29);
myTree.findNode(19);
myTree.findNode(9378);
// myTree.levelOrder(prettyPrint);
// myTree.depthFirst("inorder");
// myTree.depthFirst("preorder");
// myTree.depthFirst("postorder");
myTree.getHeight(19);
myTree.getHeight(67);
myTree.getHeight(0.25);
myTree.getDepth(0.5);
myTree.getDepth(29.5);
myTree.getDepth(19);
myTree.getDepth(23);




