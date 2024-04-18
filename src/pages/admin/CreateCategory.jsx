import React, { useEffect, useState } from "react";
import Adminmenu from "../../components/Adminmenu";
import axios from "axios";
import toast from "react-hot-toast";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CategoryForm from "../../components/form/CategoryForm";
import { useAuth } from "../../context/auth";
import CategoryModel from "../../components/form/CategoryModel";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://e-commerce-backend-gn5p.onrender.com/api/v1/category/create-category",
        { name },
        { headers: { Authorization: auth?.token } }
      );
      console.log(data);
      if (data.success) {
        allCategories();
        setName("");
        toast.success(`${data.category?.slug} is created`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in input form");
    }
  };

  const allCategories = async () => {
    try {
      const res = await axios.get(
        "https://e-commerce-backend-gn5p.onrender.com/api/v1/category/all-category"
      );
      toast.success("Showing all categories");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://e-commerce-backend-gn5p.onrender.com/api/v1/category/delete-category/${id}`
      );
      if (data) {
        toast.success(data.message);
        allCategories();
      }
    } catch (error) {
      toast.error("Error in delete category");
    }
  };

  useEffect(() => {
    allCategories();
  }, []);

  return (
    <div className="container-fluid pt-4">
      <div className="row">
        <div className="col-md-4">
          <Adminmenu />
        </div>
        <div className="col-md-8">
          <div className="w-75 p-2 text-center">
            <h4 className="text-center pb-4">Manage Category</h4>
            <div className="p-4">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((elem) => {
                  return (
                    <>
                      <tr key={elem._id} className="text-center">
                        <td>{elem.slug}</td>
                        <td className="d-flex gap-4">
                          <Button className="w-31" variant="primary">
                            <CategoryModel
                              resData={elem}
                              allCategories={allCategories}
                            />
                          </Button>
                          <Button
                            onClick={() => deleteCategory(elem._id)}
                            variant="danger"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
