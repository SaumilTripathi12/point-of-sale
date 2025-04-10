import React, { useEffect, useState } from "react";
import AdminSidebar from "../Sidebar/AdminSidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const Update_ItemForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams();
  const prod_id = searchParams.get("prod_id");
  const [imgFile, setImgFile] = useState(null);

  const [itemData, setItemData] = useState({
    id: "",
    Productname: "",
    Productimage: "",
    Productprice: "",
    category_id: "",
  });

  const [previewImg, setPreviewImg] = useState("");

  // Load item and category data from localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("products")) || [];
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];

    setCategories(storedCategories);

    const currentItem = storedItems.find((item) => item.id === prod_id);
    if (currentItem) {
      setItemData(currentItem);
      setPreviewImg(currentItem.Productimage);
    }
  }, [prod_id]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset");
    formData.append("cloud_name", "dhtzjjral");

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
    } catch (error) {
      console.error("Upload error", error);
      return null;
    }
  };

  const handleUpdate = async () => {
    if (
      !itemData.Productname ||
      !itemData.Productprice ||
      !itemData.category_id
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    let imageUrl = itemData.Productimage;

    if (imgFile) {
      const uploadedUrl = await uploadToCloudinary(imgFile);
      if (!uploadedUrl) {
        toast.error("Image upload failed");
        return;
      }
      imageUrl = uploadedUrl;
    }

    const updatedItem = {
      ...itemData,
      Productimage: imageUrl,
    };

    const storedItems = JSON.parse(localStorage.getItem("products")) || [];
    const updatedItems = storedItems.map((item) =>
      item.id === prod_id ? updatedItem : item
    );

    localStorage.setItem("products", JSON.stringify(updatedItems));
    toast.success("Item updated successfully!");
    navigate("/additem");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImg(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="main_cform_div">
      <AdminSidebar />
      <div className="form_div">
        <h3>Update Item Details</h3>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <div className="inputfields">
            <label>Item Name</label>
            <input
              type="text"
              value={itemData.Productname}
              onChange={(e) =>
                setItemData({ ...itemData, Productname: e.target.value })
              }
              placeholder="Enter Item Name"
              required
            />

            <label>Item Category</label>
            <select
              value={itemData.category_id}
              onChange={(e) =>
                setItemData({ ...itemData, category_id: e.target.value })
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.category_id} value={cat.category_id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputfields">
            <label>Item Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImg && (
              <img
                src={previewImg}
                alt="Preview"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}

            <label>Item Price</label>
            <input
              type="number"
              value={itemData.Productprice}
              onChange={(e) =>
                setItemData({ ...itemData, Productprice: e.target.value })
              }
              placeholder="Enter Item Price"
              required
            />
          </div>

          <button className="addcashier" type="submit">
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update_ItemForm;
