# FS-Builder [![Build Status][ci-img]][ci]

Make creating and removing file system very easy. Try it!

[ci-img]:  https://travis-ci.org/Silvestr-b/fs-builder.svg
[ci]:      https://travis-ci.org/Silvestr-b/fs-builder


## Usage

```js
const fsBuilder = require('fs-builder');

const tree = {
  directory: {
    subDirectory: {
      'fileName.js': 'fileContent',
      'fileName.css': 'fileContent'
    }
  }
}

// Create file system by tree
fsBuilder.createFs(tree, 'directory/where/insert');

// Remove file system by tree
fsBuilder.removeFs(tree, 'directory/where/remove');
```

