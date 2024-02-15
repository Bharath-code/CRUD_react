import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books" + bookId);
        console.log(res.data);
        setBook((prevBook) => ({ ...prevBook, ...res.data[0] }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchBook();
  }, []);
  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="form">
      <h1>Update the Book</h1>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
        value={book.title}
      />
      <input
        type="text"
        placeholder="desc"
        name="desc"
        onChange={handleChange}
        value={book.desc}
      />
      <input
        type="number"
        placeholder="price"
        name="price"
        onChange={handleChange}
        value={book.price}
      />
      <input
        type="text"
        placeholder="cover"
        name="cover"
        onChange={handleChange}
        value={book.cover}
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};
