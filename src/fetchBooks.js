import APIKey from './apikey.js';

const googleBooksURL = 'https://www.googleapis.com/books/v1/volumes';

const buildQueryURL = (queryParams, page, maxResults) => {
  const startIndex = Math.max(0, (page - 1) * maxResults);
  const params = [
    'key=' + APIKey,
    'maxResults=' + maxResults,
    'startIndex=' + startIndex
  ];
  if (typeof queryParams.q === 'string') {
    const alphanumericQ = queryParams.q.replace(/[^0-9a-zA-Z ]/g, '');
    const noSpacesQ = alphanumericQ.replace(/\s/g, '');
    if (noSpacesQ.length > 0) params.push('q=' + alphanumericQ);
    else throw new Error('Empty query');
  }
  if (typeof queryParams.bookType === 'string') {
    if (queryParams.bookType !== 'all')
      params.push('filter=' + queryParams.bookType);
  }
  if (typeof queryParams.printType === 'string') {
    if (queryParams.printType !== 'all')
      params.push('printType=' + queryParams.printType);
  }
  const query = params.join('&');
  return googleBooksURL + '?' + query;
};

const formatBook = book => {
  let link = null;
  let title = 'Untitled';
  const authors = [];
  let price = null;
  let saleability = null;
  let imageLink = null;
  let yearPublished = null;
  let description = null;
  if (book.volumeInfo) {
    if (typeof book.volumeInfo.canonicalVolumeLink === 'string')
      link = book.volumeInfo.canonicalVolumeLink;
    if (typeof book.volumeInfo.title === 'string')
      title = book.volumeInfo.title;
    if (typeof book.volumeInfo.subtitle === 'string')
      title += `: ${book.volumeInfo.subtitle}`;
    if (Array.isArray(book.volumeInfo.authors))
      authors.push(...book.volumeInfo.authors);
    if (book.volumeInfo.imageLinks) {
      if (typeof book.volumeInfo.imageLinks.thumbnail === 'string')
        imageLink = book.volumeInfo.imageLinks.thumbnail;
      else if (typeof book.volumeInfo.imageLinks.smallThumbnail === 'string')
        imageLink = book.volumeInfo.imageLinks.smallThumbnail;
    }
    if (typeof book.volumeInfo.publishedDate === 'string')
      yearPublished = book.volumeInfo.publishedDate.slice(0, 4);
    if (typeof book.volumeInfo.description === 'string')
      description = book.volumeInfo.description;
  }
  if (book.saleInfo) {
    if (book.saleInfo.listPrice) {
      if (!isNaN(Number(book.saleInfo.listPrice.amount)))
        price = book.saleInfo.listPrice.amount;
    }
    if (Number(price) <= 0) saleability = 'Free';
    else {
      if (typeof book.saleInfo.saleability === 'string') {
        if (book.saleInfo.saleability === 'FREE') saleability = 'Free';
        else if (book.saleInfo.saleability === 'FOR_SALE')
          saleability = 'For Sale';
      }
    }
  }
  const formattedBook = {
    link,
    title,
    authors,
    price,
    saleability,
    imageLink,
    yearPublished,
    description
  };
  return formattedBook;
};

export default async (queryParams, page, maxResults) => {
  const URL = buildQueryURL(queryParams, page, maxResults);
  const response = await fetch(URL);
  if (!response.ok) throw new Error(response);
  const responseJSON = await response.json();
  let totalBooks = null;
  if (typeof responseJSON.totalItems === 'number') {
    totalBooks = responseJSON.totalItems;
  }
  let books = [];
  if (Array.isArray(responseJSON.items))
    books = responseJSON.items.map(book => formatBook(book));
  return { totalBooks, books };
};
