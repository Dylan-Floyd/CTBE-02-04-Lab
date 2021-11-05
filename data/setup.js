const fs = require('fs').promises;

module.exports = (pool) => {
  return fs
    .readFile(`${__dirname}/../sql/setup.sql`, { encoding: 'utf-8' })
    .then((sql) => pool.query(sql))
    .catch(e => {
      console.log('Error during sql setup: ');  
      console.error(e);
    });
};
