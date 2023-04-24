const xss = require("xss");
const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += `order by createtime desc;`;

  return exec(sql);
};

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then((rows) => {
    return rows[0];
  });
};

const newBlog = (blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);
  const author = blogData.author;
  const createTime = Date.now();

  const sql = `
      insert into blogs (title, content, createtime, author)
      values ('${title}', '${content}', ${createTime}, '${author}');
  `;

  return exec(sql).then((insertData) => {
    // console.log('insertData is ', insertData)
    return {
      id: insertData.insertId,
    };
  });
};

const updateBlog = (id, blogData = {}) => {
  const title = xss(blogData.title);
  const content = xss(blogData.content);

  const sql = `
      update blogs set title='${title}', content='${content}' where id=${id}
  `;

  return exec(sql).then((updateData) => {
    return updateData.affectedRows > 0;
  });
};

const delBlog = (id, blogData = {}) => {
  // 暫時不考慮軟刪除
  const sql = `delete from blogs where id='${id}' and author='${author}';`;

  return exec(sql).then((delData) => {
    return delData.affectedRows > 0;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
};
