import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../UI/ProductCard/ProductCard';
import "./favorites.css"; 

const Favorites = () => {
    // Zamiast pobierania tylko ID produktu, pobieramy cały obiekt produktu
    const favorites = useSelector((state) => state.favorites.favorites);

    return (
        <div className="favorites-page">
            <h1>Twoje ulubione produkty</h1>
            <div className="product-list">
                {favorites?.map((item, index) => {
                    // Teraz dla każdego produktu w ulubionych mamy dostęp do pełnych informacji o produkcie,
                    // w tym do URL obrazu, które można przekazać do komponentu ProductCard
                    const product = {
                        id: item.id,
                        productName: item.productName,
                        price: item.price,
                        imgUrls: [item.imgUrl],  // Ustawiamy imgUrl jako pierwszy element tablicy imgUrls
                    };

                    return (
                        <ProductCard item={product} key={index} hideFavoriteButton={true}/>
                    );
                })}
            </div>
        </div>
    );
};

export default Favorites;
