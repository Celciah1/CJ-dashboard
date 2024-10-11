'use client';

import { useState } from 'react';

export default function ProductsPage() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', price: 100, stock: 50, type: 'cosmetics' },
        { id: 2, name: 'Product 2', price: 200, stock: 20, type: 'dresses' },
        { id: 3, name: 'Product 3', price: 150, stock: 10, type: 'electronics' },
    ]);

    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [productTypeFilter, setProductTypeFilter] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: 0,
        stock: 0,
        type: '',
    });
    
    const [showAddProductForm, setShowAddProductForm] = useState(false);

    const handleAddProduct = () => {
        const newProductId = products.length + 1;
        const newProductData = {
            id: newProductId,
            ...newProduct,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock),
        };
        setProducts([...products, newProductData]);
        setNewProduct({ name: '', price: 0, stock: 0, type: '' });
        setShowAddProductForm(false);
    };

    const handleSort = (key) => {
        const sorted = [...products].sort((a, b) =>
            sortOrder === 'asc' ? a[key] - b[key] : b[key] - a[key]
        );
        setProducts(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
    };

    // Filtered products logic (with case-insensitive search)
    const filteredProducts = products.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(filter.toLowerCase());
        const matchesType = productTypeFilter ? product.type === productTypeFilter : true;
        return matchesName && matchesType;
    });

    return (
        <div className="container">
            <aside>
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <nav>
                    <ul>
                        <li className="mb-4"><a href="#">Home</a></li>
                        <li className="mb-4"><a href="#">Products</a></li>
                        <li className="mb-4"><a href="#">Categories</a></li>
                        <li className="mb-4"><a href="#">Orders</a></li>
                    </ul>
                </nav>
            </aside>
            <main>
                <h1 className="text-4xl font-bold mb-8 text-center">Product Dashboard</h1>

                <div className="flex justify-between mb-6">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Filter by product name"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-blue-300 p-2 rounded-md shadow-lg w-full bg-white text-gray-800 focus:border-blue-400 focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="ml-4">
                        <select
                            value={productTypeFilter}
                            onChange={(e) => setProductTypeFilter(e.target.value)}
                            className="border border-blue-300 p-2 rounded-md shadow-lg w-full max-w-[150px] bg-white text-gray-800 focus:border-blue-400 focus:ring focus:ring-blue-200"
                        >
                            <option value="">All Products</option>
                            <option value="cosmetics">Cosmetics</option>
                            <option value="dresses">Dresses</option>
                            <option value="electronics">Electronics</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={() => setShowAddProductForm(!showAddProductForm)}
                    className="add-product bg-yellow-500 text-black mt-4 py-2 px-4 rounded-md hover:bg-yellow-400 transition duration-200"
                >
                    {showAddProductForm ? "Hide Add New Product" : "Add New Product"}
                </button>

                {showAddProductForm && (
                    <div className="mt-4">
                        <h2 className="text-2xl mb-4">New Product Details</h2>
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            className="border border-blue-300 p-2 rounded-md shadow-lg mb-2 w-full bg-white text-gray-800"
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            className="border border-blue-300 p-2 rounded-md shadow-lg mb-2 w-full bg-white text-gray-800"
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={newProduct.stock}
                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                            className="border border-blue-300 p-2 rounded-md shadow-lg mb-2 w-full bg-white text-gray-800"
                        />
                        <select
                            value={newProduct.type}
                            onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                            className="border border-blue-300 p-2 rounded-md shadow-lg mb-2 w-full bg-white text-gray-800"
                        >
                            <option value="">Select Product Type</option>
                            <option value="cosmetics">Cosmetics</option>
                            <option value="dresses">Dresses</option>
                            <option value="electronics">Electronics</option>
                        </select>
                        <button
                            onClick={handleAddProduct}
                            className="bg-yellow-500 text-black mt-4 py-2 px-4 rounded-md hover:bg-yellow-400 transition duration-200"
                        >
                            Add Product
                        </button>
                    </div>
                )}

                <table className="min-w-full bg-white rounded-lg shadow-lg mb-8 mt-6">
                    <thead>
                        <tr>
                            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('price')}>Price</th>
                            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('stock')}>Stock</th>
                            <th className="py-3 px-4 cursor-pointer" onClick={() => handleSort('type')}>Type</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-700">
                                <td className="py-3 px-4">{product.name}</td>
                                <td className="py-3 px-4">${product.price}</td>
                                <td className="py-3 px-4">{product.stock}</td>
                                <td className="py-3 px-4">{product.type}</td>
                                <td className="py-3 px-4">
                                    <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}
