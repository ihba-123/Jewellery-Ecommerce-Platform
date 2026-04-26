import React from "react";
import { X, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategorySelect = ({
  selectedProduct,
  modalOpen,
  closeQuickView,
  Backdrop,
  selectedImage,
  galleryImages,
  selectedImageIndex,
  setSelectedImageIndex,
  weights,
  StatTile,
  quantity,
  setQuantity,
  category,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {/* =======================================================
          PRODUCT DETAIL MODAL
      ======================================================= */}
      {selectedProduct && (
        <div
          className={`fixed inset-0 z-[90] transition duration-300 ${
            modalOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <Backdrop onClick={closeQuickView} />

          {/* Main Wrapper */}
          <div className="relative flex min-h-screen items-center justify-center p-2 sm:p-4">
            <article
              className={`relative w-full max-w-5xl rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.45)] transition duration-300 overflow-hidden ${
                modalOpen
                  ? "translate-y-0 scale-100"
                  : "translate-y-4 scale-95"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={closeQuickView}
                className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center  justify-center rounded-[100%] border border-white/10 bg-white/10 text-white/70 hover:text-white"
              >
                <X size={15} />
              </button>

              {/* SCROLLABLE MODAL BODY */}
              <div className="grid md:grid-cols-2 max-h-[92vh] overflow-y-auto custom-scroll">
                {/* ===================================================
                    LEFT SIDE
                =================================================== */}
                <div className="p-4 sm:p-5">
                  {/* Main Image */}
                  <div className="overflow-hidden rounded-3xl">
                    <img
                      src={selectedImage}
                      alt={selectedProduct.name}
                      className="aspect-square w-full object-cover"
                    />
                  </div>

                  {/* Thumbnails */}
                  <div className="mt-4 flex gap-2 overflow-x-auto custom-scroll pb-2">
                    {galleryImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImageIndex(i)}
                        className={`h-14 w-14 shrink-0 overflow-hidden rounded-2xl border ${
                          i === selectedImageIndex
                            ? "border-[#ffd86f]"
                            : "border-white/10"
                        }`}
                      >
                        <img
                          src={img}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>

                  {/* QR Code */}
                  <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="mb-3 text-sm text-white/75">
                      Scan Product QR
                    </p>

                    <div className="inline-block rounded-2xl bg-white p-3">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                          JSON.stringify({
                            id: selectedProduct.id,
                            name: selectedProduct.name,
                            price: selectedProduct.price,
                          })
                        )}`}
                        alt="QR"
                        className="w-[140px]"
                      />
                    </div>
                  </div>
                </div>

                {/* ===================================================
                    RIGHT SIDE
                =================================================== */}
                <div className="border-t border-white/10 md:border-l md:border-t-0 p-4 sm:p-6">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                    Premium Collection
                  </p>

                  {/* Title */}
                  <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-white leading-snug">
                    {selectedProduct.name}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {selectedProduct.description}
                  </p>

                  {/* Price */}
                  <div className="mt-5 rounded-3xl border border-[#ffd86f]/20 bg-[#ffd86f]/10 p-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">
                      Price
                    </p>

                    <h3 className="mt-1 text-2xl font-bold text-[#ffd86f]">
                      ₹{" "}
                      {selectedProduct.price.toLocaleString("en-IN")}
                    </h3>
                  </div>

                  {/* Stats */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <StatTile
                      label="Net Weight"
                      value={`${weights.nw} g`}
                    />
                    <StatTile
                      label="Stone Weight"
                      value={`${weights.sw} g`}
                    />
                    <StatTile
                      label="Total Weight"
                      value={`${selectedProduct.weight} g`}
                    />
                    <StatTile
                      label="Purity"
                      value={selectedProduct.purity}
                    />
                  </div>

                  {/* Quantity */}
                  <div className="mt-5 flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-white/70">
                      Quantity
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          setQuantity((p) =>
                            Math.max(1, p - 1)
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-[28px] text-center text-sm font-semibold text-white">
                        {quantity}
                      </span>

                      <button
                        onClick={() =>
                          setQuantity((p) => p + 1)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        navigate(
                          `/products/${selectedProduct.id}`
                        )
                      }
                      className="rounded-2xl bg-[#ffd86f] py-3 text-sm font-semibold text-black hover:brightness-110"
                    >
                      Order Now
                    </button>

                    <button
                      onClick={() => {
                        alert(
                          `${selectedProduct.name} added x${quantity}`
                        );
                        closeQuickView();
                      }}
                      className="rounded-2xl border border-white/10 bg-white/10 py-3 text-sm font-semibold text-white"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* =======================================================
          CUSTOM RIGHT SCROLLBAR
      ======================================================= */}
      <style>{`
        .custom-scroll::-webkit-scrollbar{
          width:7px;
        }

        .custom-scroll::-webkit-scrollbar-track{
          background:rgba(255,255,255,0.04);
          border-radius:20px;
        }

        .custom-scroll::-webkit-scrollbar-thumb{
          background:linear-gradient(180deg,#ffd86f,#dcae35);
          border-radius:20px;
        }

        .custom-scroll::-webkit-scrollbar-thumb:hover{
          background:linear-gradient(180deg,#ffe48f,#e7bb45);
        }

        .custom-scroll{
          scrollbar-width:thin;
          scrollbar-color:#ffd86f rgba(255,255,255,0.04);
        }
      `}</style>
    </>
  );
};

export default CategorySelect;