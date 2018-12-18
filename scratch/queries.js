const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET Notes with search
notes.filter('cats', (err, list) => {
  if (err) {
    console.error(err);
  }
  console.log(list);
});

// GET Notes by ID
notes.find(1005, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

// PUT (Update) Notes by ID
const updateObj = {
  title: 'New Title',
  content: 'Blah blah blah'
};

notes.update(1005, updateObj, (err, item) => {
  if (err) {
    console.error(err);
  }
  if (item) {
    console.log(item);
  } else {
    console.log('not found');
  }
});

//CREATE
const updateObj2 = {
    title: 'absolute',
    content: 'flibber flabber'
  };

notes.create(updateObj2, (err, item) => {
    if (err) {
      console.error(err);
    }
    if (item) {
      console.log(item);
    } else {
      console.log('not found');
    }
  });

  //DELETE
  const toDelete = 1004;
  notes.delete(toDelete, (err, item) => {
    console.log('deleting item number' + toDelete);
    if (err) {
      console.error(err);
    }
    if (item) {
      console.log(item);
    } else {
      console.log('not found');
    }
  });

