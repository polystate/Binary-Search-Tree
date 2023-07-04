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
    if(isDuplicate(data, visited)){
      const parent = visited.parent;
      //Case 1, visited is a leaf
      if(!visited.left && !visited.right){
      (parent.right.data === data) ? parent.right = null : parent.left = null;
      } else if((visited.left) && (visited.right)) {
        //Case 2, it has two children
        let rightSubTreeRoot = visited.right;
        while(rightSubTreeRoot.left){
          rightSubTreeRoot = rightSubTreeRoot.left;
        }
        rightSubTreeRoot.parent.left = null;
        currentRoot.data = rightSubTreeRoot.data;
      } else {
        //Case 3, it has one child
        const branch = visited.right || visited.left;
        if(parent.left.data === visited.data){
          parent.left = branch;
        } else if (parent.right.data === visited.data){
          parent.right = branch;
        }
        branch.parent = parent;
      }
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
    console.log('Step: ' + visited.data);
    if(isDuplicate(data, visited)){
      console.log('Node was found!');
      return visited;
    }
    const currentDirection = traverse(data, visited);
    if(!visited[currentDirection]){
      console.log('Node of ' + data + ' not found.');
      return;
    }
    findNode(data, visited[currentDirection]);
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
  
  // const inorder = (current = currentRoot) => {
  //   if(!current){
  //     return;
  //   }
  //   inorder(current.left);
  //   console.log(current.data);
  //   inorder(current.right);
  // }

  // const preorder = (current = currentRoot) => {
  //   if(!current){
  //     return;
  //   }
  //   console.log(current.data);
  //   preorder(current.left);
  //   preorder(current.right);
  // }

  // const postorder = (current = currentRoot) => {
  //   if(!current){
  //     return;
  //   }
  //   postorder(current.left);
  //   postorder(current.right);
  //   console.log(current.data);
  // }

  return { buildTree, initializeTree, insertNode, deleteNode, findNode, levelOrder, depthFirst };
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
myTree.levelOrder(prettyPrint);
myTree.depthFirst("inorder");
myTree.depthFirst("preorder");
myTree.depthFirst("postorder");




