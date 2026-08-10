const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.json');
const SEED_PATH = path.join(__dirname, '../data/seedData.json');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure db.json exists, clone from seedData if not
if (!fs.existsSync(DB_PATH)) {
  if (fs.existsSync(SEED_PATH)) {
    fs.copyFileSync(SEED_PATH, DB_PATH);
  } else {
    fs.writeFileSync(DB_PATH, JSON.stringify({
      users: [],
      services: [],
      rooms: [],
      pets: [],
      bookings: [],
      reviews: []
    }, null, 2));
  }
}

class JsonDB {
  static read() {
    try {
      const content = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(content);
    } catch (err) {
      console.error('Error reading db.json:', err);
      return { users: [], services: [], rooms: [], pets: [], bookings: [], reviews: [] };
    }
  }

  static write(data) {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Error writing db.json:', err);
      return false;
    }
  }

  static getCollection(collectionName) {
    const db = this.read();
    return db[collectionName] || [];
  }

  static setCollection(collectionName, items) {
    const db = this.read();
    db[collectionName] = items;
    this.write(db);
    return items;
  }

  static find(collectionName, predicate) {
    const items = this.getCollection(collectionName);
    return items.filter(predicate);
  }

  static findOne(collectionName, predicate) {
    const items = this.getCollection(collectionName);
    return items.find(predicate);
  }

  static insert(collectionName, item) {
    const db = this.read();
    if (!db[collectionName]) db[collectionName] = [];
    db[collectionName].push(item);
    this.write(db);
    return item;
  }

  static update(collectionName, idOrPredicate, updateData) {
    const db = this.read();
    const list = db[collectionName] || [];
    const predicate = typeof idOrPredicate === 'function'
      ? idOrPredicate
      : item => item.id === idOrPredicate;
    const index = list.findIndex(predicate);
    if (index !== -1) {
      list[index] = { ...list[index], ...updateData };
      db[collectionName] = list;
      this.write(db);
      return list[index];
    }
    return null;
  }

  static delete(collectionName, idOrPredicate) {
    const db = this.read();
    const list = db[collectionName] || [];
    const predicate = typeof idOrPredicate === 'function'
      ? idOrPredicate
      : item => item.id === idOrPredicate;
    const initialLen = list.length;
    const filtered = list.filter(item => !predicate(item));
    if (filtered.length < initialLen) {
      db[collectionName] = filtered;
      this.write(db);
      return true;
    }
    return false;
  }
}

module.exports = JsonDB;
