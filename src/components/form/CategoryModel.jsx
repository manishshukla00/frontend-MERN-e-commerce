import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import CategoryForm from "./CategoryForm";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

function CategoryModel({ resData, allCategories }) {
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [auth] = useAuth();

  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://e-commerce-backend-gn5p.onrender.com/api/v1/category/update-category/${resData._id}`,
        { name: update },
        { headers: { Authorization: auth?.token } }
      );
      if (data.success) {
        allCategories();
        toast.success(`Updated category name is ${data.category.name}`);
        setUpdate("");
      }
    } catch (error) {
      toast.error("Error in updating category");
    }
  };

  return (
    <>
      <Button className="text-center" variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <CategoryForm
          handleSubmit={updateCategory}
          value={update}
          setValue={setUpdate}
          close={handleClose}
        />
      </Modal>
    </>
  );
}

export default CategoryModel;
