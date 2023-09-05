"use client";
import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import AddProductModal from "./../modal/AddProductModal";
import Link from "next/link";

function Product() {
  const [pastries, setPastries] = useState(null);
  const [coffee, setCoffee] = useState(null);
  const [alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(!show);

  const updateProduct = async (id) => {
    await updateDoc(doc(db, "coffees", id), {
      id: id,
      itemData,
    });
  };

  useEffect(() => {
    const coffee = onSnapshot(collection(db, "coffees"), (snapshot) =>
      setCoffee(snapshot.docs.map((e) => e.data()))
    );
    return () => {
      coffee();
    };
  }, []);

  useEffect(() => {
    const pastries = onSnapshot(collection(db, "pastries"), (snapshot) =>
      setPastries(snapshot.docs.map((e) => e.data()))
    );
    return () => {
      pastries();
    };
  }, []);

  const delData = async (id) => {
    const resultPastries = await deleteDoc(doc(db, "pastries", id));
    const resultCoffee = await deleteDoc(doc(db, "coffees", id));
    setAlert(!alert);
  };

  return (
    <div className="product-container">
      {alert && (
        <Alert onClose={() => setShow(false)} variant="primary" dismissible>
          Delete Item Successfully
        </Alert>
      )}
      <div className="product-nav">
        <h3>Products</h3>
        <Button variant="secondary" onClick={handleShow}>
          Add Product
        </Button>
      </div>
      <AddProductModal show={show} setShow={setShow} handleShow={handleShow} />
      {coffee && pastries && (
        <Table bordered hover striped="columns" responsive variant="dark">
          <thead>
            <tr>
              <th>Product name</th>
              <th>Description</th>
              <th>Image</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {coffee.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    style={{
                      maxHeight: "50px",
                      maxWidth: "50px",
                      borderRadius: "100%",
                    }}
                    src={item.imageUrl}
                  ></img>
                </td>
                <td>{item.price}</td>
                <td>{item.rating}</td>
                <td>
                  <BsTrash onClick={() => delData(item.id)} />
                </td>
                <td>
                  <Link href={`/product/${item.id}`}>
                    <AiOutlineEdit />
                  </Link>
                </td>
              </tr>
            ))}
            {pastries.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    style={{
                      maxHeight: "50px",
                      maxWidth: "50px",
                      borderRadius: "100%",
                    }}
                    src={item.imageUrl}
                  ></img>
                </td>
                <td>{item.price}</td>
                <td>{item.rating}</td>
                <td>
                  <BsTrash onClick={() => delData(item.id)} />
                </td>
                <td>
                  <Link href={`/product/${item.id}`}>
                    <AiOutlineEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Product;
