const fs = require('fs')

const lines = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

const searchNested = (name, parent) => {
  return parent.children.find(child => child.name === name)
}

const createFile = (name, size, root) => {
  return {
    type: "file",
    name,
    size: Number(size),
    parent: root
  };
};

const createDir = (name, root) => {
  return {
    type: "dir",
    name,
    totalSize: 0,
    children: [],
    parent: root
  };
};

const traverseUntilRoot = (node) => {
  let totalSize = node.size || 0;
  let current = node.parent;
  while (current) {
    current.totalSize += totalSize;
    current = current.parent;
  }

  return totalSize;
};

const cd = (currentDir, dirName, root) => {
  if (dirName === "..") {
    return currentDir.parent
  } else if (dirName === "/") {
    return root;
  } else {
    return searchNested(dirName, currentDir);
  }
}

const touch = (file, currentDir) => {
  file.parent = currentDir;
  currentDir.children.push(file)
  traverseUntilRoot(file);
}

const buildFileSystemTree = (lines) => {
  const root = createDir("/", null);

  let currentDir = root;

  lines.forEach(line => {
    if (line.startsWith("$")) {
      const [_, command, dirName] = line.split(" ");
      if (command === "ls") return;

      currentDir = cd(currentDir, dirName, root);
    } else {
      const [size, name] = line.split(" ");
      if (size === "dir") {
        touch(createDir(name, currentDir), currentDir)
      } else {
        touch(createFile(name, size, currentDir), currentDir)
      }
    }

  })

  return root;
}


const root = buildFileSystemTree(lines);

const MAX_SIZE = 100_000;
const TOTAL_SPACE_AVAILABLE = 70_000_000;
const UNUSED_SPACE = 30_000_000;
const MAX_USED = TOTAL_SPACE_AVAILABLE - UNUSED_SPACE;
const FS_TOTAL_SIZE = root.totalSize;
const SPACE_TO_FREE = FS_TOTAL_SIZE - MAX_USED;

const prettyPrint = (root, depth = 0) => {
  const indent = " ".repeat(depth * 2);
  console.log(`${indent}${root.name} (${root.type} ${root.totalSize})`);
  if (root.type === "dir") {
    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i];
      if (child.type === "dir") {
        prettyPrint(child, depth + 1);
      } else {
        console.log(`${indent}  ${child.name} (${child.type} ${child.size})`);
      }
    }
  }
}

prettyPrint(root);

const getDirectories = (root, directories = []) => {
  for (let i = 0; i < root.children.length; ++i) {
    const child = root.children[i];
    if (child.type === "dir") {
      directories.push(child);
      getDirectories(child, directories);
    }
  }

  return directories;
}

console.log({
  part1: getDirectories(root)
    .filter(dir => dir.totalSize <= MAX_SIZE)
    .reduce((acc, curr) => acc + curr.totalSize, 0),

  part2: getDirectories(root)
    .filter(dir => dir.totalSize >= SPACE_TO_FREE)
    .sort((a, b) => a.totalSize - b.totalSize)[0]
    .totalSize
});
