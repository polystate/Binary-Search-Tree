# Balanced Binary Tree

This project provides a JavaScript implementation of a balanced binary tree data structure. It includes functionalities to build a balanced tree, insert nodes, delete nodes, find nodes, perform tree traversals, calculate the height and depth of nodes, and check if the tree is balanced.

## Installation

Clone the repository and navigate to the project directory:

```bash
git clone <repository_url>
cd balanced-binary-tree
```

## Usage

1. Import the `Tree` module into your JavaScript file:

   ```javascript
   import Tree from './tree.js';
   ```

2. Create a new instance of the `Tree`:

   ```javascript
   const myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
   ```

   You can pass an array of values to initialize the tree.

3. Perform operations on the tree:

   ```javascript
   myTree.insertNode(6);
   myTree.deleteNode(9);
   myTree.findNode(4.2);
   myTree.getHeight(19);
   myTree.isBalanced();
   // ...
   ```

   Use the provided methods to interact with the tree.

4. Customize the functionality:

   The `Tree` object provides various methods that can be used to manipulate and analyze the tree. You can modify the code or extend the functionality to suit your specific requirements.

## Examples

Here are some examples of how to use the methods provided by the `Tree` object:

```javascript
const myTree = Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// Insert a node
myTree.insertNode(6);

// Delete a node
myTree.deleteNode(9);

// Find a node
const node = myTree.findNode(4.2);
if (node) {
  console.log('Node found:', node.data);
} else {
  console.log('Node not found.');
}

// Calculate height
myTree.getHeight(19);

// Check if the tree is balanced
const balanced = myTree.isBalanced();
console.log('Is the tree balanced?', balanced);
```

## Contributing

Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- This project is inspired by the concept of balanced binary trees and their various operations.
- The implementation is based on standard binary tree algorithms and data structures.