import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { WISHLIST_URL } from '../../utils/constants';
import { setWishlistItems } from '../../redux/wishlistSlice';
import { addToCart, removeFromWishlist } from '../../services/userActions';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // For displaying error messages

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistData = useSelector((state) => state.wishlist.wishlistItems);
    const navigate = useNavigate();

    const fetchWishlistData = async () => {
        try {
            const { data } = await axios.get(`${WISHLIST_URL}/`, { withCredentials: true });
            dispatch(setWishlistItems(data?.wishlistData?.wishlist));
        } catch (err) {
            console.error("Failed to fetch wishlist", err);
            toast.error("Failed to load wishlist.");
        }
    };

    useEffect(() => {
        if (!wishlistData) {
            fetchWishlistData();
        }
    }, [wishlistData]);

    const handleAddToCart = async (_id) => {
        try {
            await addToCart(_id, dispatch, navigate);

        } catch (err) {
            console.error("Error adding to cart or removing from wishlist:", err);
            toast.error("Failed to add product to cart.");
        }
    };

    const handleRemoveFromWishlist = async (_id) => {
        try {
            await removeFromWishlist(_id, dispatch, navigate);
        } catch (err) {
            console.error("Error removing from wishlist:", err);
            toast.error("Failed to remove product from wishlist.");
        }
    };

    return (
        <div className="px-6 min-h-screen bg-gray-50 dark:bg-gray-900">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
                Your Wishlist <Heart className="inline-block ml-2 text-pink-500" />
            </h2>

            {wishlistData?.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-300">No items in your wishlist yet.</p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {wishlistData.map((item) => {
                        const {
                            name,
                            brand,
                            category,
                            price,
                            processor,
                            ram,
                            storage,
                            graphicsCard,
                            operatingSystem,
                            countInStock,
                            image,
                            _id
                        } = item.productId;

                        return (
                            <div
                                key={_id}
                                className="bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden h-[460px] flex flex-col"
                            >
                                <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                                    <img
                                        src={image}
                                        alt={name}
                                        className="object-contain h-full"
                                    />
                                </div>
                                <div className="p-4 flex flex-col justify-between flex-1">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 truncate">
                                            {name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 truncate">
                                            {brand} • {category}
                                        </p>

                                        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 line-clamp-5">
                                            <p>₹ <span className="font-semibold">{price}</span></p>
                                            <p>{processor}, {ram} RAM</p>
                                            <p>{storage} | {graphicsCard}</p>
                                            <p>{operatingSystem}</p>
                                            <p className={countInStock > 0 ? "text-green-600" : "text-red-500"}>
                                                {countInStock > 0 ? `In Stock (${countInStock})` : "Out of Stock"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-4">
                                        <button
                                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg"
                                            onClick={() => handleAddToCart(_id)}
                                        >
                                            <ShoppingCart size={16} />
                                            Add to Cart
                                        </button>
                                        <button
                                            className="flex items-center justify-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                                            onClick={() => handleRemoveFromWishlist(_id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
