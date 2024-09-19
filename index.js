const axios = require("axios");

async function getBooks() {
  const response = await axios.get("https://api.potterdb.com/v1/books");
  return response.data.data; // return first book from response
}

async function getChapters(bookId) {
  const response = await axios.get(
    `https://api.potterdb.com/v1/books/${bookId}/chapters`
  );
  return response.data.data;
}

getBooks() // fetching book
  .then((book) => {
    return book[0].id; // passing id of first book to next promise
  })
  .then((bookId) => {
    return getChapters(bookId); // getting all the chapters for first book
  })
  .then((chapters) => {
    // received all the chapters for that book
    console.log(
      "Summary of last chapter\n\n",
      chapters[chapters.length - 1].attributes.summary
    );
  })
  .catch((err) => {
    console.log(err);
  });
