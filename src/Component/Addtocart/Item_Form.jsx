import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const initialValues = {
  Productname: "",
  Productimage: "",
  Productprice: "",
  category_id: "",
};

const Item_Form = () => {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("products");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhtzjjral/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed.");
      return null;
    }
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values, action) => {
      if (!imgFile) {
        toast.error("Please upload an item image");
        return;
      }

      const uploadedUrl = await uploadToCloudinary(imgFile);
      if (!uploadedUrl) return;

      const newItem = {
        id: Date.now().toString(),
        Productname: values.Productname,
        Productprice: values.Productprice,
        Productimage: uploadedUrl,
        category_id: values.category_id,
      };

      const updatedProducts = [...products, newItem];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      toast.success("Item added successfully!");
      navigate("/additem");
      action.resetForm();
      setImgFile(null);
    },
  });

  return (
    <div className="main_cform_div">
      <AdminSidebar />
      <div className="form_div">
        <h3>Please Fill All Fields</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputfields">
            <label>Item Name</label>
            <input
              type="text"
              name="Productname"
              value={values.Productname}
              onChange={handleChange}
              placeholder="Enter Item Name"
            />

            <label>Item Category</label>
            <select
              name="category_id"
              value={values.category_id}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Select Category
              </option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputfields">
            <label>Item Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={(e) => setImgFile(e.target.files[0])}
            />

            <label>Item Price</label>
            <input
              type="text"
              name="Productprice"
              value={values.Productprice}
              onChange={handleChange}
              placeholder="Enter Item Price"
            />
          </div>

          <button className="addcashier" type="submit">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Item_Form;
