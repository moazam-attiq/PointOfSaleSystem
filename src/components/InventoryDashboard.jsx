import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import SearchBar from "./SearchBar";
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import { useToast } from "../context/ToastContext";
import DeleteModal from "./DeleteModal";

export default function InventoryDashboard() {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("/products/inventory");
        setInventoryData(res.data);
      } catch (err) {
        console.error("❌ Failed to load inventory", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleSearch = (term) => setSearchTerm(term.toLowerCase());
  const resetSearch = () => setSearchTerm("");
  const goToAddProduct = () => navigate("/add-product");

  const filteredData = inventoryData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm)
  );

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`);
      setInventoryData((prev) => prev.filter((item) => item._id !== productId));
      showToast("Product deleted successfully", "success");
      setShowModal(false);
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      showToast("Failed to delete product", "danger");
    }
  };

  return (
    <div className="flex min-h-screen text-black">
      <main className="flex-1 bg-gray-50 p-6">
        {loading ? (
          <Loading message="Loading Inventory..." />
        ) : (
          <>
            <div className="justify-between items-center mb-4">
              <SearchBar
                searchText="Search the Product..."
                onSearch={handleSearch}
              />
              <div className="flex gap-6 mt-4">
                <button
                  style={{ background: "#91C8E4" }}
                  className="px-6 py-2 text-sm font-extrabold rounded text-white"
                  onClick={resetSearch}
                >
                  All Inventory
                </button>
                <button
                  style={{ background: "#91C8E4" }}
                  className="px-6 py-2 text-sm font-extrabold rounded text-white"
                  onClick={goToAddProduct}
                >
                  Add Product
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-black mb-4">
              Inventory
            </h2>

            <div className="overflow-auto rounded shadow-xl">
              <table className="min-w-full text-sm border border-gray-300 bg-white">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="p-2 border">Product Name</th>
                    <th className="p-2 border">Original Price</th>
                    <th className="p-2 border">Resale Price</th>
                    <th className="p-2 border">Sold Items</th>
                    <th className="p-2 border">Earnings</th>
                    <th className="p-2 border">In Stock</th>
                    <th className="p-2 border">Profit</th>
                    <th className="p-2 border">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-100">
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan="8">
                        <EmptyState message="No products found in inventory." />
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-50">
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">
                          Rs. {item.original.toFixed(2)}
                        </td>
                        <td className="p-2 border">
                          Rs. {item.resale.toFixed(2)}
                        </td>
                        <td className="p-2 border">{item.sold}</td>
                        <td className="p-2 border">
                          Rs. {item.earnings.toFixed(2)}
                        </td>
                        <td className="p-2 border">{item.stock}</td>
                        <td className="p-2 border">
                          Rs. {item.profit.toFixed(2)}
                        </td>
                        <td className="p-2 border space-x-2 flex justify-center items-center">
                          <button
                            style={{ background: "#91C8E4" }}
                            className="px-4 py-2 text-sm font-bold rounded text-white"
                            onClick={() =>
                              navigate(`/edit-product?id=${item._id}&headerText=Edit%20Product`)
                            }
                          >
                            Edit
                          </button>
                          <button
                            style={{ background: "#91C8E4" }}
                            className="px-4 py-2 text-sm font-bold rounded text-white"
                            onClick={() => {
                              setShowModal(true);
                              setSelectedProductId(item._id);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                  <DeleteModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => handleDeleteProduct(selectedProductId)}
                  />
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
