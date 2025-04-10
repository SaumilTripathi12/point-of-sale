import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { toast } from "react-toastify";

const Add_Item = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const category_id = searchParams.get("category_id");

  // Load items from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem("products");
    const storedCategories = localStorage.getItem("categories");

    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  const addItem = () => {
    navigate(`/itemform?category_id=${category_id}`);
  };

  // Delete item from localStorage
  const deleteItem = (prod_id) => {
    const updatedItems = items.filter((item) => item.id !== prod_id);
    localStorage.setItem("products", JSON.stringify(updatedItems));
    setItems(updatedItems);
    toast.success("Item deleted successfully!");
  };

  const getCategoryName = (catId) => {
    const found = categories.find((cat) => cat.category_id === catId);
    return found ? found.category_name : "--";
  };

  return (
    <div className="main_addcashier_div">
      <AdminSidebar />
      <div className="addcashier_main">
        <div className="addcashier_table_div">
          <table>
            <caption>
              <button className="addcashier" onClick={addItem}>
                Add Item
              </button>
            </caption>

            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.Productimage}
                        alt="Item"
                        style={{
                          height: "100px",
                          width: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>{item.Productname}</td>
                    <td>{getCategoryName(item.category_id)}</td>
                    <td>{item.Productprice}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link
                        className="update"
                        to={`/updateitemform?prod_id=${item.id}`}
                      >
                        Update
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Add_Item;