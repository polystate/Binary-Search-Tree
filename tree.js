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
      if(visited.left === null && visited.right === null){
      console.log('its a leaf');
      (parent.right.data === data) ? parent.right = null : parent.left = null;
      } else if(visited.left !== null && visited.right !== null) {
        //Case 2, it has two children
        console.log('it has two children');
        
        let rightSubTreeRoot = visited.right;
        while(rightSubTreeRoot.left){
          rightSubTreeRoot = rightSubTreeRoot.left;
        }
        
        rightSubTreeRoot.parent.left = null;
        currentRoot.data = rightSubTreeRoot.data;
      } else {
        //Case 3, it has one child
        if(parent.left.data === visited.data){
          //parent is to the right of the child
          (visited.right) ? parent.left = visited.right : parent.left = visited.left;
          //set visited.right or visited.left's parent to parent,
          //as it is still set to the deleted node
          if(visited.right){
            parent.left = visited.right;
            visited.right.parent = parent;
          } else {
            parent.left = visited.left;
            visited.left.parent = parent;
          }
        } else if(parent.right.data === visited.data) {
          //parent is to the left of the child
          (visited.right) ? parent.right = visited.right : parent.right = visited.left;
        }
        //set child parent to null to avoid bug
        // visited.parent = null;
        // visited.right.parent = null;
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
    console.log(data);
    deleteTraverse(data, currentRoot);
    prettyPrint(currentRoot);
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
    
    //so basically, the algorithm for two children is. go to your right child. then recursively keep 
    //calling .left child over and over until you reach null. that node before null is next biggest,
    //you delete that node and replace it with your starting point. but make sure that in that subtree that 
    //its right child (if it has one) is properly being pointed to by its parent in that subtree.
  
    //Bug - the bug is that when 9 gets deleted, it only gets deleted
    //as the parent's child, but the child still contains reference
    //to the parent
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
myTree.deleteNode(9);
myTree.deleteNode(28);
myTree.deleteNode(7);
myTree.deleteNode(8);





