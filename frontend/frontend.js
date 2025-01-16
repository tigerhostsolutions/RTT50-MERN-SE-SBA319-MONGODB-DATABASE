const SEED = document.querySelector('#seed');
const GET_ORIELLY = document.querySelector('#get_oreilly');
const POST_ORIELLY = document.querySelector('#post_oreilly');
const DELETE = document.querySelector('#delete_oreilly');

const bookData = {
  title: document.querySelector('#oreilly_book_title').value,
  author: document.querySelector('#oreilly_author').value,
  isbn: document.querySelector('#oreilly_isbn').value,
  subject: document.querySelector('#oreilly_subject').value,
  edition: document.querySelector('#oreilly_edition').value,
  year: document.querySelector('#oreilly_year').value,
};

POST_ORIELLY.addEventListener('click', async (e) => {
  e.preventDefault(); // Prevents form from refreshing the page

  try {
    const response = await fetch('/http://localhost:5000/mymedialibrary/books/oreilly', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });
    const data = await response.json();
    console.log(data);
  }
  catch (error) {
    console.error('Error: ', error);
  }
});

GET_ORIELLY.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    alert('Button Clicked')
    const response = await fetch('http://localhost:5000/mymedialibrary/books/oreilly', { method: 'GET' });

    if (!response.ok) {
      console.error(`Backend Error: ${response.status} (${response.statusText})`);
      return;
    }

    const books = await response.json();
    console.log(books); // Display books in console or UI
  }
  catch (error) {
    console.error(error);
  }
});