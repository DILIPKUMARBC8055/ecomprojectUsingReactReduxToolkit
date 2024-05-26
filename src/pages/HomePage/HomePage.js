import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import Loader from "../../components/UI/Loader/Loader";
import ProductList from "../../components/Product/ProductList/ProductList";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  productActions,
  productSelectors,
} from "../../redux/Products/productRedux";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { authSelector } from "../../redux/Auth/authRedux";
function HomePage() {
  const dispatch = useDispatch();
  const productData = useSelector(productSelectors);
  const data=useSelector(authSelector);
  
  const getAllProducts = async () => {
    try {
      dispatch(productActions.TOGGLE_LOADING());
      const productsRef = collection(db, "products");
      const productsSnapshot = await getDocs(productsRef);

      const productsData = productsSnapshot.docs.map((doc) => ({
        ...doc.data(),
      }));

      dispatch(productActions.SET_PRODUCTS(productsData));
      
    } catch (error) {
      dispatch(productActions.SET_ERROR(error.message));
    }
  };
  useEffect(() => {
    // This effect runs every time productData changes
    
}, [productData]);

  const filterProducts = (filterObj) => {
    const {
      searchQuery,
      priceRange,
      categories: { mensFashion, womensFashion, jewelery, electronics },
    } = filterObj;

    let filteredProducts = productData.products;
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.title.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }
    if (mensFashion || womensFashion || jewelery || electronics) {
      filteredProducts = filteredProducts.filter((product) => {
        if (mensFashion && product.category === "men's clothing") {
          return true;
        }
        if (womensFashion && product.category === "women's clothing") {
          return true;
        }
        if (electronics && product.category === "electronics") {
          return true;
        }
        if (jewelery && product.category === "jewelery") {
          return true;
        }
        return false;
      });
    }

    if (priceRange) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.price < priceRange;
      });
    }
    dispatch(productActions.SET_FILTERED_PRODUCTS(filteredProducts));
  };
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState(75000);
  const [categories, setCategories] = useState({
    mensFashion: false,
    electronics: false,
    jewelery: false,
    womensClothing: false,
  });

  const { products, loading, filteredProducts } = productData;
  

  // Fetch products on app mount
  useEffect(() => {
    const getfun = async () => {
      await getAllProducts();
    };
    getfun();

    // addDataToCollection();
  }, []);

  // Rerender the products if the search or filter parameters change
  useEffect(() => {
    filterProducts({
      priceRange,
      searchQuery: query,
      categories,
    });
  }, [priceRange, query, categories]);

  // Display loader while products are fetching
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.homePageContainer}>
      <FilterSidebar
        setPriceRange={setPriceRange}
        setCategories={setCategories}
        priceRange={priceRange}
      />{" "}
      <form className={styles.form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>{" "}
      {products.length ? (
        <ProductList products={products.length ? filteredProducts : null} />
      ) : null}{" "}
    </div>
  );
}

export default HomePage;
