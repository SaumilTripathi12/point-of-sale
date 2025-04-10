import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { toast } from "react-toastify";

const Update_CategoryForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("category_id");

  const [imgFile, setImgFile] = useState(null);

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("categories");
    return saved ? JSON.parse(saved) : [];
  });

  const [category, setCategory] = useState({
    category_id: "",
    category_name: "",
    category_image: "",
  });

  // Load category on mount
  useEffect(() => {
    const existing = categories.find((cat) => cat.category_id === id);
    if (existing) setCategory(existing);
  }, [id, categories]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file change
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

  // Handle category update
  const updateCategory = async (e) => {
    e.preventDefault();

    if (!category.category_name.trim()) {
      toast.error("Category name is required.");
      return;
    }

    let newImageUrl = category.category_image;

    if (imgFile) {
      const uploadedUrl = await uploadImageToCloudinary();
      if (uploadedUrl) newImageUrl = uploadedUrl;
    }

    const updatedCategory = {
      ...category,
      category_image: newImageUrl,
    };

    const updatedList = categories.map((cat) =>
      cat.category_id === id ? updatedCategory : cat
    );

    localStorage.setItem("categories", JSON.stringify(updatedList));
    setCategories(updatedList);
    setImgFile(null);
    toast.success("Category updated successfully");
    navigate("/addcat");
  };

  return (
    <div className="main_cform_div">
      <AdminSidebar />
      <div className="form_div">
        <h3>Update Category</h3>
        <form className="form" onSubmit={updateCategory}>
          <div className="inputfields">
            <label>Category Name</label>
            <input
              type="text"
              name="category_name"
              value={category.category_name}
              onChange={handleChange}
              placeholder="Enter Category Name"
            />

            <label>Current Image</label>
            {category.category_image && (
              <div className="img-preview">
                <img
                  src={category.category_image}
                  alt="Category"
                  style={{
                    height: "80px",
                    width: "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            <label>New Image (optional)</label>
            <input
              type="file"
              name="category_image"
              onChange={handleFileChange}
              accept="image/jpg,image/jpeg,image/png"
              key={imgFile ? imgFile.name : ""}
            />
          </div>

          <button className="addcashier" type="submit">
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update_CategoryForm;
