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
    if(visited.left === null && visited.right === null){
      //we've reached a leaf node
      //working. but check if there's a repeat value. maybe we can call initializeTree() again to reset duplicates?
      (node.data > visited.data) ? visited.right = node : visited.left = node;
      console.log(visited);
      prettyPrint(currentRoot);
      return;
    }

    if(node.data < visited.data){
      visited = visited.left;
      traverse(node, visited)
    } else {
      visited = visited.right;
      traverse(node, visited);
    }
  }

  const insertNode = (val) => {
    //step 1 is to make sure that it's not a duplicate value, meaning
    //we have to traverse the entire tree
  
    if(isNaN(val) || val === currentRoot.data) return;

    //create new node
    const newNode = createNode(val);
    traverse(newNode, currentRoot);

    // let visitedNode = rootNode;
    //think about it in terms of currentRoot
    // let currentRoot;
    
    // if(newNode.data > currentRoot.data){
    //   console.log('greater than. move to right subtree.');
    //   currentRoot = currentRoot.right;
    // } else {
    //   console.log('less than. move to left subtree.');
    //   currentRoot = currentRoot.left;
      
    //   // insertNode(visitedNode.data);
    // }
    //we have to keep chaining .left and .right after rootNode
    //to traverse the tree recursively. at the point that both it's .left
    //and .right are null, we know that we've reached a leaf, and we can
    //append the value to the right or left of that leaf on the tree.


    //base case
    //have we reached a leaf node? does the visited node's .left and .right properties both equal null?
    //if so, we have reached the base case and the recursion should stop.

    //recursive call
    //we call insertNode, which should take a node (not a value.) we check the node.data for its value.
    // is the rootNode.data greater than or less than rootNode.data? if less than, we get the next node to the lft of the root
    //and call InsertNode again and pass the new node into INsertData recursively. we do this for both greater than
    //and less than, and the function uses recursion for both. the function keeps calling itself
    //until the node that passes in is a leaf node which will be the base case and the first check at the top.
    //also, if there's a duplicate the funciton should also terminate.
  }

  return { buildTree, initializeTree, insertNode };
};

const myTree = Tree([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);
const initializeTree = myTree.initializeTree();
prettyPrint(myTree.buildTree(initializeTree));
myTree.insertNode(69);
myTree.insertNode(4.2)
myTree.insertNode(92);


//Steps to Insert


//To insert into the tree it must become a leaf of the tree.


//1. Compare value to the root. Is it less than or greater than. If less, continue
//recursing down the left subtree is it less than that value, if so is there anything to the left of it, 
//if not it becomes the leaf.
