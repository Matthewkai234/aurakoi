import Image from "next/image";

export default function ProductInfo() {
  return (
    <div className="product__info block sticky w-full animate max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Product Title */}
      <div className="product__title grid gap-3">
        <h1 className="heading leading-none text-3xl font-bold">
          Maya Pink Knit Sweater
        </h1>
      </div>

      {/* Product Type / Rating */}
      <div className="product__text text-sm mt-2">
        <div className="product-info-container">
          <p className="item-type text-gray-500">HOUND Knit Sweater</p>
          <div className="star-rating flex gap-1 my-2">
            {[...Array(3)].map((_, i) => (
              <img
                key={i}
                src="https://cdn.shopify.com/s/files/1/0627/6995/4970/files/SingleStar.png?v=1743987639"
                alt="Star"
                width={16}
                height={16}
              />
            ))}
          </div>

          {/* Tabs / Info sections simplified */}
          <div className="product-info-transition space-y-4">
            {/* Features */}
            <div className="product-info-content active">
              <div className="lore-section">
                <p className="text-gray-700 italic">
                  A Celestehaven relic dyed in Maya’s favourite bloom. Light as cloudglass, soft as promise.
                </p>
              </div>
              <p className="section-heading font-semibold mt-4">Features</p>
              <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                <li>HOUND Chrome Heart Logo</li>
                <li>HOUND Chain Woven Arm Pattern</li>
                <li>Speckled Gradient Weave</li>
                <li>Viscose Nylon Blend</li>
                <li>Neck Embroidery</li>
              </ul>
              <p className="section-heading font-semibold mt-4">Passive</p>
              <div className="passive-stat flex items-center gap-2">
                <img
                  src="//houndarchives.com/cdn/shop/files/fc2107.png?v=1770873461"
                  alt="Passive Icon"
                  width={24}
                  height={24}
                />
                <p>Frame Mog +5%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Size Selector */}
      <fieldset className="js product-form__input variant-input-wrapper relative mt-6">
        <legend className="sr-only">Size</legend>
        <div className="form__label flex items-center justify-between gap-2 w-full">
          <div className="flex gap-2">
            Size: <span className="font-medium">XS</span>
          </div>
        </div>
        <ul className="swatches swatches--square flex items-start flex-wrap gap-3 mt-2">
          {["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size, idx) => (
            <li key={size}>
              <label
                className={`inline-block text-sm font-medium leading-none cursor-pointer px-3 py-1 border rounded-full ${
                  idx === 1 ? "border-black bg-black text-white" : "border-gray-300 hover:border-gray-400"
                }`}
                title={size}
              >
                {size}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Price */}
      <div className="product__price grid gap-3 mt-4">
        <div className="no-js-hidden" id="Price">
          <div className="price flex flex-wrap items-baseline gap-2">
            <span className="price__regular whitespace-nowrap text-2xl font-bold">418.00 ILS</span>
          </div>
        </div>
      </div>

      {/* Add to Cart Form */}
      <div className="product-form-wrapper mt-4">
        <form className="product-form grid gap-8">
          <div className="product-form__buttons grid gap-4">
            <div className="buy-buttons grid gap-4">
              <button
                type="submit"
                className="product-form__submit button button--primary bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition"
              >
                <span className="btn-text">Add to cart</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}