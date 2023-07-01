import { Node } from './node.js';
import { prettyPrint } from './prettyprint.js';

//Tree

const Tree = () => {

    const getRoot = (arr) => {
        return arr[Math.floor(arr.length/2)];
    }

    const initializeTree = (arr) => {
      arr = Array.from(new Set(arr)).sort((a, b) => a - b);
      arr = arr.map(elem => Node(elem));
      return arr;
    }

    const buildTree = (arr) => {
        if(arr.length === 0) return;

        const leftChildren = arr.slice(0, arr.indexOf(getRoot(arr)))
        const rightChildren = arr.slice(arr.indexOf(getRoot(arr))+1,arr.length);
    
        getRoot(arr).left = getRoot(leftChildren);
        getRoot(arr).right = getRoot(rightChildren);

        // console.log(arr);

        // return buildTree(leftChildren.concat(rightChildren))
      }
      return { initializeTree, buildTree, getRoot };
}


// const myTree = Tree([1,7,4,23,8,9,4,3,5,7,9,67,6345,324]);
const treeArr = [1,2,3,4,5];
const myTree = Tree();
const initialize = myTree.initializeTree(treeArr);
myTree.buildTree(initialize);

prettyPrint(myTree.getRoot());



  //set the middle element of the array as root
  //recursively do the same for the left half and right half
     // * get the middle of the left half and make it the left child of the root created in step 1
    // * get the middle of the right half and make it the right child of the root
    // * created in step 1
  //print the preorder of the tree