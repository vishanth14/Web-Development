const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'posts.json');

function readData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return raw.trim() ? JSON.parse(raw) : [];
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.writeFileSync(DATA_FILE, '[]');
      return [];
    }
    throw err;
  }
}

function writeData(posts) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

function getNextId(posts) {
  if (posts.length === 0) return 1;
  return Math.max(...posts.map((p) => p.id)) + 1;
}

module.exports = {
  getAll() {
    return readData();
  },

  getById(id) {
    return readData().find((p) => p.id === id);
  },

  create({ title, content, author }) {
    const posts = readData();
    const newPost = {
      id: getNextId(posts),
      title,
      content,
      author: author || 'Anonymous',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    posts.push(newPost);
    writeData(posts);
    return newPost;
  },

  update(id, { title, content, author }) {
    const posts = readData();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return null;

    posts[index] = {
      ...posts[index],
      title: title ?? posts[index].title,
      content: content ?? posts[index].content,
      author: author ?? posts[index].author,
      updatedAt: new Date().toISOString()
    };

    writeData(posts);
    return posts[index];
  },

  remove(id) {
    const posts = readData();
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return false;

    posts.splice(index, 1);
    writeData(posts);
    return true;
  }
};
