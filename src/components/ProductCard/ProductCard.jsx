import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import './Product.css';

export default function ProductCard({ product, onAddToCart }) {
  const colors = Array.from(new Set(product.variants?.map(v => v.color).filter(Boolean)));
  const sizes = Array.from(new Set(product.variants?.map(v => v.size).filter(Boolean)));

  const [selectedColor, setSelectedColor] = useState(colors[0] || null);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);

  const selectedVariant = product.variants?.find(
    v => v.color === selectedColor && v.size === selectedSize
  );

  const inStock = selectedVariant?.stock > 0;

  return (
    <div className="h-100 card border-light overflow-hidden" style={{ transition: "all 0.3s ease" }}>
      <div className="bg-light p-3">
        <img
          src={product.image}
          alt={product.title}
          className="card-img-top p-3"
          style={{ height: 200, objectFit: "contain" }}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
            e.target.onerror = null;
          }}
        />
      </div>

      <div className="card-body d-flex flex-column" style={{ overflow: "visible" }}>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0" title={product.title}>
            {product.title}
          </h5>
        </div>

        <div className="d-flex align-items-center mb-2">
          <Star size={14} className="text-warning me-1" fill="currentColor" />
          <small className="text-muted">{product.rating?.rate || 0}</small>
          <small className="text-muted ms-2">
            ({product.rating?.count || 0} reviews)
          </small>
        </div>

        <div className="mb-3">
          <span className="fw-bold fs-5">${Number(product.price).toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-muted text-decoration-line-through ms-2">
              ${product.originalPrice}
            </span>
          )}
        </div>

         {/* Size dropdown */}
        {sizes.length > 0 && (
          <div className="mb-3">
            <label htmlFor="sizeSelect" className="fw-bold mb-2 d-block">
              Size
            </label>
            <select
             style={{maxWidth:"max-content"}}
              id="sizeSelect"
              className="form-select bg-light form-select-sm"
              value={selectedSize || ""}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              {sizes.map(size => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Color buttons */}
        {colors.length > 0 && (
          <div className="mb-3">
            <div className="fw-bold mb-2">Color</div>
            <div className="d-flex flex-wrap gap-2">
              {colors.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`btn btn-sm ${selectedColor === color ? "btn-dark" : "btn-outline-secondary"}`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

       

        <div className="mt-auto">
          {inStock ? (
            <button
              className="btn btn-dark w-100"
              onClick={() => {
                toast.success("Added to cart");
                onAddToCart({ ...product, selectedVariant });
              }}
            >
              Add to Cart
            </button>
          ) : (
            <button className="btn btn-secondary w-100" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
