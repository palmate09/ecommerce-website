

export default function ProductCard1() {
    return (
      <div className="w-80 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
  
        {/* Product Icon */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl">
          🌿
        </div>
  
        {/* Content */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-neutral-900">
            Indoor Plants
          </h2>
  
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Bring nature into your home with our curated collection of premium
            indoor plants.
          </p>
  
          <p className="mt-6 text-2xl font-bold text-neutral-900">
            ₹799
          </p>
  
          <button className="mt-6 w-full rounded-xl bg-green-600 px-4 py-4 text-white transition hover:bg-green-700">
            Add to Cart
          </button>
        </div>
      </div>
    );
  }