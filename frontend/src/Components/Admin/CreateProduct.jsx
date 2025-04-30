import React, { useState } from 'react';
import { ADMIN_URL } from '../../utils/constants';
import { toast } from 'react-toastify';

const categoryOptions = [
    "Gaming Laptops",
    "Business & Office",
    "Student Laptops",
    "2-in-1 Convertibles",
    "Workstations",
    "Chromebooks",
    "Everyday Use",
    "Ultrabooks",
    "Creator & Editing",
    "MacBook"
];

const brandOptions = [
    "HP", "Dell", "Lenovo", "Asus", "Acer", "MSI", "Apple", "Samsung", "Microsoft"
];

const ramOptions = ["4GB", "8GB", "16GB", "32GB", "64GB"];
const storageOptions = ["128GB SSD", "256GB SSD", "512GB SSD", "1TB HDD", "1TB SSD"];
const osOptions = ["Windows", "macOS", "Linux", "ChromeOS"];

const CreateProduct = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [category, setCategory] = useState('');
    const [processor, setProcessor] = useState('');
    const [ram, setRam] = useState('');
    const [storage, setStorage] = useState('');
    const [screenSize, setScreenSize] = useState('');
    const [graphicsCard, setGraphicsCard] = useState('');
    const [operatingSystem, setOperatingSystem] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
        const descriptionPoints = description
            .split('\n')                 
            .map(line => line.trim())     
            .filter(line => line.length > 0);
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('description', descriptionPoints); 
        formData.append('price', price);
        formData.append('countInStock', countInStock);
        formData.append('category', category);
        formData.append('processor', processor);
        formData.append('ram', ram);
        formData.append('storage', storage);
        formData.append('screenSize', screenSize);
        formData.append('graphicsCard', graphicsCard);
        formData.append('operatingSystem', operatingSystem);
        formData.append('image', image);
    
        try {
            const res = await fetch(ADMIN_URL + "/createProduct", {
                method: 'POST',
                body: formData,
            });
    
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to create product');
            }
    
            toast.success("Product created successfully!");
        } catch (err) {
            toast.error(err.message || "Product creation failed");
        }
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }
    };

    return (
        <div className="w-full flex flex-col lg:flex-row gap-6 px-4">
            
            <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-3">
                <h1 className="text-3xl mb-3">Create Product</h1>
                <fieldset className="bg-base-200 border rounded-lg p-6 space-y-4">

                    <input type="file" className="file-input file-input-primary w-full" onChange={handleImageChange} />

                    <input type="text" className="input w-full" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />

                    <select className="select w-full" value={brand} onChange={(e) => setBrand(e.target.value)}>
                        <option value="">Select Brand</option>
                        {brandOptions.map((b, idx) => (
                            <option key={idx}>{b}</option>
                        ))}
                    </select>

                    <input type="number" className="input w-full" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
                    <input type="number" className="input w-full" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} placeholder="Count In Stock" />

                    <select className="select w-full" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categoryOptions.map((cat, idx) => (
                            <option key={idx}>{cat}</option>
                        ))}
                    </select>

                    <input type="text" className="input w-full" value={processor} onChange={(e) => setProcessor(e.target.value)} placeholder="Processor" />

                    <select className="select w-full" value={ram} onChange={(e) => setRam(e.target.value)}>
                        <option value="">Select RAM</option>
                        {ramOptions.map((r, idx) => (
                            <option key={idx}>{r}</option>
                        ))}
                    </select>

                    <select className="select w-full" value={storage} onChange={(e) => setStorage(e.target.value)}>
                        <option value="">Select Storage</option>
                        {storageOptions.map((s, idx) => (
                            <option key={idx}>{s}</option>
                        ))}
                    </select>

                    <input type="text" className="input w-full" value={screenSize} onChange={(e) => setScreenSize(e.target.value)} placeholder="Screen Size" />

                    <input type="text" className="input w-full" value={graphicsCard} onChange={(e) => setGraphicsCard(e.target.value)} placeholder="Graphics Card" />

                    <select className="select w-full" value={operatingSystem} onChange={(e) => setOperatingSystem(e.target.value)}>
                        <option value="">Select OS</option>
                        {osOptions.map((os, idx) => (
                            <option key={idx}>{os}</option>
                        ))}
                    </select>

                    <textarea
                        className="textarea w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter each description point on a new line"
                    />
                    <button type="submit" className="btn btn-primary w-full">Create Product</button>
                </fieldset>
            </form>

           
            <div className="w-full lg:w-1/2">
                <h2 className="text-2xl mb-4">Product Preview</h2>
                <div className="border rounded-lg p-6 bg-base-100 shadow-md space-y-3">
                    <div className="w-full h-48 border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 overflow-hidden bg-white">
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="object-contain max-h-full" />
                        ) : (
                            <span className="text-gray-400">Image Preview</span>
                        )}
                    </div>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Brand:</strong> {brand}</p>
                    <p><strong>Price:</strong> ₹{price}</p>
                    <p><strong>Count In Stock:</strong> {countInStock}</p>
                    <p><strong>Category:</strong> {category}</p>
                    <p><strong>Processor:</strong> {processor}</p>
                    <p><strong>RAM:</strong> {ram}</p>
                    <p><strong>Storage:</strong> {storage}</p>
                    <p><strong>Screen Size:</strong> {screenSize}</p>
                    <p><strong>Graphics Card:</strong> {graphicsCard}</p>
                    <p><strong>Operating System:</strong> {operatingSystem}</p>
                    <p><strong>Description:</strong></p>
                    <ul className="list-disc pl-5">
                        {description.split('\n').filter(line => line.trim()).map((point, idx) => (
                            <li key={idx}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;
