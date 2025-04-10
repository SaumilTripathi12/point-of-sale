import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { toast } from "react-toastify";

const Category_Form = () => {
  const navigate = useNavigate(); // Navigate
  const [imgFile, setImgFile] = useState(null);

  // State for category details
  const [category, setCategory] = useState({
    category_name: "",
    category_image: "",
  });

  // Get categories from localStorage
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  //
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
  };

  // uploadImageToCloudinary
  const uploadImageToCloudinary = async () => {
    if (!imgFile) return null;

    const formData = new FormData();
    formData.append("file", imgFile);
    formData.append("upload_preset", "my_preset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dhtzjjral/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        toast.error("Image upload failed");
        return null;
      }

      const data = await res.json();
      return data.secure_url;
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Image upload failed");
      return null;
    }
  };

  // Add category function
  const addCategory = async () => {
    if (!category.category_name || !imgFile) {
      toast.error("All fields are required.");
      return;
    }

    const imageUrl = await uploadImageToCloudinary();

    const newCategory = {
      category_id: Date.now().toString(),
      category_name: category.category_name,
      category_image: imageUrl,
    };

    // Optional: Store data in Blob/DB or just localStorage for now
    const updatedCategories = [...categories, newCategory];
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
    setCategories(updatedCategories);

    setCategory({ category_name: "", category_image: "" });
    toast.success("Category Added Successfully");
    navigate("/addcat");
  };

  return (
    <div className="main_cform_div">
      <AdminSidebar />
      <div className="form_div">
        <h3>Add New Category</h3>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            addCategory();
          }}
        >
          <div className="inputfields">
            <label>Category Name</label>
            <input
              type="text"
              name="category_name"
              value={category.category_name}
              onChange={handleChange}
              placeholder="Enter Category Name"
            />

            <label>Category Image</label>

            {imgFile && (
              <div className="img-preview">
                <img
                  src={URL.createObjectURL(imgFile)}
                  alt="Preview"
                  width="100"
                />
              </div>
            )}

            <input
              type="file"
              name="category_image"
              onChange={handleFileChange}
              accept="image/jpg,image/jpeg,image/png"
            />
          </div>

          <button className="addcashier" type="submit">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Category_Form;
