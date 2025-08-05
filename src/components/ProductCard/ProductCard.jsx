// src/components/ProductCard/ProductCard.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Star } from "lucide-react";

export default function ProductCard({ product, onAddToCart }) {
  const inStock = product?.rating?.count > 0;
  const defaultVariants = ["Default"];
  const variants =
    product.variants && product.variants.length > 0
      ? product.variants
      : defaultVariants;

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  return (
    <div
      className="card h-100 border-1 shadow-sm overflow-hidden rounded-4"
      style={{ transition: "all 0.3s ease" }}
    >
      {/* Image with wishlist icon */}
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

      {/* Card content */}
      <div
        className="card-body d-flex flex-column"
        style={{ overflow: "visible" }}
      >
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title text-truncate mb-0" title={product.title}>
            {product.title}
          </h5>
        </div>

        {/* Rating */}
        <div className="d-flex align-items-center mb-2">
          <Star size={14} className="text-warning me-1" fill="currentColor" />
          <small className="text-muted">{product.rating?.rate || 0}</small>
          <small className="text-muted ms-2">
            ({product.rating?.count || 0} reviews)
          </small>
        </div>

        {/* Price */}
        <div className="mb-3">
          <span className="fw-bold fs-5">
            ${Number(product.price).toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-muted text-decoration-line-through ms-2">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Variant selector */}
        <div className="d-flex flex-wrap justify-items-center gap-4">
          <div className="fw-bold">Color</div>
          <select
            className="form-select form-select-sm mb-3 position-relative"
            value={selectedVariant}
            style={{
              maxWidth: "200px",
              zIndex: 9999,
              position: "relative",
            }}
            onChange={(e) => setSelectedVariant(e.target.value)}
            disabled={!inStock}
          >
            {variants.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Add to cart / Out of stock */}
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
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};
