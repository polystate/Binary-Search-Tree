import { Node } from './node.js';
import { prettyPrint } from './prettyprint.js';



const Tree = (arr) => { 
    let rootNode; 

    const initialize = () => {
      arr = Array.from(new Set(arr)).sort((a, b) => a - b);
      arr = arr.map(elem => Node(elem));
      return arr;
    }

    const buildTree = (arr) => {
      //each lower layer is suppose to return its root to the layer above
      //every layer of recursion returns its root. the last branch returns itself. 
      //the top layer returns the root.

      //our problem is that after the recursion takes place
      //our original node is still pointing to the leaf, and not the second
      //root node like it's suppose to, while our second root node is properly pointing to the leaf
      //look at the call stack in recursion and see what's going on.
      
      if(arr.length === 0) return null;
    
      //current root node
      rootNode = arr[Math.floor(arr.length/2)];

      
      // rootNode.left = buildTree(arr.slice(0, arr.indexOf(rootNode)));
      // rootNode.right = buildTree(arr.slice(arr.indexOf(rootNode)+1,arr.length));
      let leftSubArr = arr.slice(0,arr.indexOf(rootNode));
      let leftChild = leftSubArr[Math.floor(leftSubArr.length/2)];
      rootNode.left = leftChild || null;

      let rightSubArr = arr.slice(arr.indexOf(rootNode)+1,arr.length);
      let rightChild = rightSubArr[Math.floor(rightSubArr.length/2)]
      rootNode.right = rightChild || null;
      
      // prettyPrint(rootNode)
      console.log(rootNode);
      const result = buildTree(leftSubArr) + buildTree(rightSubArr);
      
      return result;
      //this buildTree should return the level-0 root node
    }

    
    return { buildTree, initialize };
}


const myTree = Tree([1,2,3]);
const initializeTree = myTree.initialize();
myTree.buildTree(initializeTree);






//given a sorted array, write a function that creates a balanced binary search tree using array elements

// arr[] = [1,2,3]
//output: a balanced binary search tree
//     1  <---  2  ----> 3
//all elements less than 2 (the origin root node) are on the left side of 2. 
//and all of the elements greater than 2 are on the right side.


//input arr[] = [1,2,3,4]
//output a balanced binary search tree

//  ROOT NODE: 3
// LEFT: 2        RIGHT : 4
// LEAF NODE : 1



//the idea is to find the middle element of the array and make it to the root of the
//tree, then perform the same operation on the left subarray for the [**root's left child**]
//and the same operation on the right subarray for the root's right child.