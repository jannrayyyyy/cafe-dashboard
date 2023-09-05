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
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function AddProductModal({ show, setShow, handleShow }) {
  const [itemData, setItemData] = useState({
    name: "NA",
    price: 1,
    description: "NA",
    imageUrl: "NA",
    rating: 1,
    isPopular: false,
    isExclusive: false,
  });

  const addCoffee = async () => {
    const collectionRef = collection(db, "coffees");

    const docRef = await addDoc(collectionRef, itemData);

    await updateDoc(doc(db, "coffees", docRef.id), {
      id: docRef.id, // Add the ID to the document
    });
  };

  const addPastries = async () => {
    const collectionRef = collection(db, "pastries");

    const docRef = await addDoc(collectionRef, itemData);

    await updateDoc(doc(db, "pastries", docRef.id), {
      id: docRef.id, // Add the ID to the document
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    const parsedValue = type === "number" ? parseFloat(value) : value;

    setItemData({ ...itemData, [name]: parsedValue });
  };
  return (
    <Modal show={show} centered onHide={handleShow} variant="dark">
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>Add Product</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-form">
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image Url"
            onChange={handleInputChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Item Price"
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="rating"
            placeholder="Item Rating"
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleInputChange}
          />

          <div className="checkbox">
            <label htmlFor="isPopular">
              Popular
              <input
                id="isPopular"
                type="checkbox"
                placeholder="Popular"
                onChange={(e) =>
                  setItemData({ ...itemData, isPopular: e.target.checked })
                }
              />
            </label>
            <label htmlFor="isExclusives">
              Exclusives
              <input
                id="isExclusives"
                type="checkbox"
                placeholder="Exclusives"
                onChange={(e) =>
                  setItemData({ ...itemData, isExclusive: e.target.checked })
                }
              />
            </label>
          </div>
          <button onClick={addCoffee}>Add Coffee</button>
          <button onClick={addPastries}>Add Pastries</button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleShow}>
          Done
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductModal;
