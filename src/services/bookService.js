import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/books"; // Update as needed

export const getAllBooks = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const getPaginatedBooks = async (page, limit) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/books?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch books:", error.message);
    throw new Error("Could not fetch books. Please try again later.");
  }
};

export const searchBooks = async (query, page, limit) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/books/search?query=${query}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to search books:", error.message);
    throw new Error("Could not perform search. Please try again later.");
  }
};

// // src/services/bookService.js
// export const filterBooksByGenre = async (genre) => {
//   try {
//     const response = await axios.get(
//       `http://localhost:5000/api/books/filter?genre=${genre}`
//     );
//     console.log("Filtered books:", response.data); // Log the response data
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching filtered books:", error); // Log the error
//     throw error;
//   }
// };

export const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const addBook = async (bookData) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/v1/books/create-book",
      bookData
    );
    if (response.status === 201) {
      console.log("Book added successfully");
      return response.data;
    }
  } catch (error) {
    console.error(
      "Failed to add book:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};

export const updateBook = async (id, bookData) => {
  const response = await axios.put(`/api/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await axios.delete(`/api/books/${id}`);
  return response.data;
};
