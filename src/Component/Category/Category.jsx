import React, { useEffect, useState } from "react";
import Item from "../Item/Item";
import Addtocart from "../Addtocart/Addtocart";
import { NavLink, useSearchParams } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showIngredients, setShowImgredients] = useState(false);
  const [check, setCheck] = useState(false);

  const [searchParams] = useSearchParams();
  const selectedCatName = searchParams.get("id");

  // Load categories and products from localStorage
  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    setCategories(storedCategories);
    setProducts(storedProducts);
  }, []);

  // Filter products by selected category name
  useEffect(() => {
    if (selectedCatName) {
      const filtered = products.filter(
        (product) => product.category_id === selectedCatName
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCatName, products]);

  const popup = () => setShowImgredients(!showIngredients);
  const PopUp2 = (status) => setCheck(status ?? !check);

  return (
    <div className="category_div">
      <div className="category_choose">
        <div className="category_heading">
          <h1>Choose Category</h1>
        </div>

        {/* Categories */}
        <div className="category_list">
          {categories.map((cat, index) => (
            <div key={index}>
              <NavLink to={`?id=${cat.category_id}`}>
                <Item img={cat.category_image} title={cat.category_name} />
              </NavLink>
            </div>
          ))}
        </div>
        <p className='itemhead'>All</p>
        {/* <p className='itemhead'>{getUrlCatName ? getUrlCatName : "All"}</p> */}

        {/* Products */}
        <div className="category_item">
          {filteredProducts.map((product, index) => (
            <div key={index}>
              <Addtocart
                img={product.Productimage}
                title={product.Productname}
                prodprice={product.Productprice}
                prodid={product.id}
                // productqty={product.productqty}
                popup={popup}
                PopUp2={PopUp2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
