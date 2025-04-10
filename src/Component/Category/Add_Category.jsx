import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { toast } from "react-toastify";

const Add_Category = () => {
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");

  const navigate = useNavigate(); // Navigation
  const [categoryDetails, setCategoryDetails] = useState([]); // Category

  // Add Category
  const categoryAdd = () => {
    navigate("/categoryform");
  };

  // Show Category List from localStorage
  const categoryListShow = () => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategoryDetails(JSON.parse(savedCategories));
    }
  };

  useEffect(() => {
    categoryListShow();
  }, []);

  // Delete Category and update localStorage
  const deleteCategory = (category_id) => {
    const updatedCategories = categoryDetails.filter(
      (category) => category.category_id !== category_id
    );
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setCategoryDetails(updatedCategories);
    toast.success("Category Deleted Successfully");
  };

  return (
    <div className="main_addcashier_div">
      <AdminSidebar />
      <div className="addcashier_main">
        <div className="addcashier_table_div">
          <table>
            <caption>
              <button className="addcashier" onClick={categoryAdd}>
                Add Category
              </button>
            </caption>

            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categoryDetails.map((i, j) => (
                <tr key={j}>
                  <td>
                    <img
                      src={i.category_image} // Assuming category_image is a local path or URL
                      style={{
                        height: "80px",
                        width: "80px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      alt={i.category_name}
                    />
                  </td>
                  <td>{i.category_name}</td>
                  <td>
                    <button
                      className="delete"
                      onClick={() => deleteCategory(i.category_id)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <Link
                      className="update"
                      to={`/updatecategoryform?category_id=${i.category_id}`}
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Add_Category;
