"use client";
import Loader from "@/components/Loader";
import ProductItem from "@/components/ProductItem";
import { apiBaseUrl } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Attempt to fetch from API
        const res = await axios.get(apiBaseUrl + "/product/list");

        if (res?.data) {
          setProducts(res.data);
        } else {
          throw new Error("No data from API");
        }
      } catch (error) {
        // Getting local data if API call fails
        try {
          const response = await fetch("/data/products.json");
          const localData = await response.json();
          setProducts(localData);
        } catch (localError) {
          console.error("Error loading local data:", localError);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold my-10 text-center">
        Featured Products
      </h1>
      <p className="text-1xl my-10 text-center">
        Welcome to our Customizable E-Commerce Platform. Ecoomerce website where
        you can customize and place order according to own choice.
      </p>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Products Listing */}
          {products?.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
