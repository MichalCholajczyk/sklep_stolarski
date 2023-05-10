import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../UI/ProductCard/ProductCard';
import "./favourites.css"; 


const Favorites = () => {
    const favorites = useSelector((state) => state.favorites.favorites);

    return (
        <div className="favorites-page">
            <h1>Twoje ulubione produkty</h1>
            <div className="product-list">
            {favorites?.map((item, index) => (
				<ProductCard item={item} key={index} hideFavoriteButton={true}/>
			))}
            </div>
        </div>
    );
};

export default Favorites;
