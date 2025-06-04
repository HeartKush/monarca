import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import CartModal from "./CartModal.jsx";
export default function ProductCards() {
  const products = [
    {
      id: "longaniza-artesanal",
      name: "Longaniza Artesanal",
      description:
        "Embutido cárnico de lomo y pierna de cerdo, adobado con especias naturales y condimentos libre de conservantes artificiales. Producto con características de sabor ahumado y levemente picante, dándole un toque parrillero y perfecto para acompañar asados.",
      img: "/assets/images/longaniza.webp",
      variants: [
        { label: "10 und", price: 32000 },
        { label: "5 und", price: 17000 },
      ],
    },
    {
      id: "chorizo-argentino",
      name: "Chorizo Argentino",
      description:
        "Nuestro Chorizo Argentino captura la pasión y el sabor intenso de la parrilla argentina. Con la mezcla perfecta de carne de cerdo, tocino, especias, ají y condimentos, cada chorizo es una obra maestra de sabores audaces y auténticos. Descubre la tradición de la parrilla argentina en cada mordisco y deja que tu paladar viaje a las tierras del asado.",
      img: "/assets/images/argentino.webp",
      variants: [
        { label: "10 und", price: 32000 },
        { label: "5 und", price: 17000 },
      ],
    },
    {
      id: "chorizo-antioqueno",
      name: "Chorizo Antioqueño",
      description:
        "Sumérgete en la deliciosa tradición con nuestro Chorizo Antioqueño. Elaborado con la calidad suprema de carne de cerdo, tocino, hierbas frescas, paprika, sal, y el toque distintivo del orégano, cada porción es una experiencia de sabor única. Disfruta de la autenticidad y la riqueza de nuestras raíces en cada bocado.",
      img: "/assets/images/antioqueno.jpg",
      variants: [
        { label: "10 und", price: 32000 },
        { label: "5 und", price: 17000 },
      ],
    },
  ];
  const [quantities, setQuantities] = useState(
    products.map(() => [0, 0])
  );

  const [descExpanded, setDescExpanded] = useState(
    products.map(() => false)
  );

  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const syncQuantitiesWithCart = () => {
    const newQuantities = products.map(() => [0, 0]);
    cartItems.forEach((ci) => {
      const pi = products.findIndex((p) => p.name === ci.name);
      const vi = products[pi].variants.findIndex(
        (v) => v.label === ci.variantLabel
      );
      if (pi !== -1 && vi !== -1) {
        newQuantities[pi][vi] = ci.quantity;
      }
    });
    setQuantities(newQuantities);
  };

  const handleCloseModal = () => {
    syncQuantitiesWithCart();
    setIsModalOpen(false);
  };

  const handleDecrease = (pi, vi) => {
    if (quantities[pi][vi] > 0) {
      const copy = quantities.map((row) => [...row]);
      copy[pi][vi]--;
      setQuantities(copy);
    }
  };

  const handleIncrease = (pi, vi) => {
    const copy = quantities.map((row) => [...row]);
    copy[pi][vi]++;
    setQuantities(copy);
  };

  const handleAddToCart = (pi) => {
    const product = products[pi];
    const variantQs = quantities[pi];

    const toAdd = product.variants
      .map((variant, vi) => {
        const qty = variantQs[vi];
        if (qty > 0) {
          return {
            name: product.name,
            variantLabel: variant.label,
            quantity: qty,
            price: variant.price,
            subTotal: variant.price * qty,
          };
        }
        return null;
      })
      .filter(Boolean);

    if (toAdd.length === 0) {
      alert("Debes elegir al menos una cantidad para agregar al pedido.");
      return;
    }

    const updated = [...cartItems];
    toAdd.forEach((newItem) => {
      const existingIndex = updated.findIndex(
        (ci) =>
          ci.name === newItem.name &&
          ci.variantLabel === newItem.variantLabel
      );
      if (existingIndex > -1) {
        updated[existingIndex].quantity = newItem.quantity;
        updated[existingIndex].subTotal =
          newItem.price * newItem.quantity;
      } else {
        updated.push({
          id: `${newItem.name
            .toLowerCase()
            .replace(/\s+/g, "-")}-${newItem.variantLabel
            .replace(/\s+/g, "")
            .toLowerCase()}-${Date.now()}`,
          ...newItem,
        });
      }
    });

    setCartItems(updated);
    setIsModalOpen(true);

    const reset = quantities.map((row, idx) =>
      idx === pi ? [0, 0] : [...row]
    );
    setQuantities(reset);
  };

  const removeItem = (idx) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return (
    <>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center mt-10">
        {products.map((prod, pi) => (
          <Card
            shadow="sm"
            className="w-[320px] flex flex-col self-start"
            key={prod.id}
            fullWidth={false}
            isPressable={false}
          >
            <CardBody className="flex items-center justify-center overflow-hidden p-0 h-[320px]">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={prod.name}
                className="object-cover w-full h-full"
                src={prod.img}
              />
            </CardBody>
            <CardFooter className="flex flex-col justify-between p-4 space-y-3 w-full">
              <div className="space-y-3">
                <div className="space-y-1">
                  <h3 className="font-heading text-lg text-[#1D2021]">
                    {prod.name}
                  </h3>
                  <p
                    className={`font-body text-sm text-neutral-600 ${
                      descExpanded[pi]
                        ? ""
                        : "overflow-hidden text-ellipsis break-words whitespace-normal"
                    }`}
                    style={
                      descExpanded[pi]
                        ? {}
                        : {
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }
                    }
                  >
                    {prod.description}
                  </p>
                  <button
                    onClick={() => {
                      const copy = [...descExpanded];
                      copy[pi] = !copy[pi];
                      setDescExpanded(copy);
                    }}
                    className="text-sm text-red-700 hover:underline focus:outline-none"
                  >
                    {descExpanded[pi] ? "Mostrar menos" : "Leer más"}
                  </button>
                </div>

                {prod.variants.map((variant, vi) => (
                  <div
                    className="flex justify-between items-center w-full"
                    key={variant.label}
                  >
                    <span className="font-body text-sm text-[#1D2021] w-40 whitespace-nowrap">
                      {variant.label} – COP{" "}
                      {variant.price.toLocaleString()}
                    </span>
                    <div className="flex items-center border border-red-700 rounded-lg">
                      <button
                        onClick={() => handleDecrease(pi, vi)}
                        className={`px-3 border-r border-red-700 text-center hover:bg-slate-300 rounded-l-lg ${
                          quantities[pi][vi] === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        –
                      </button>
                      <span className="px-4 text-center w-8">
                        {quantities[pi][vi]}
                      </span>
                      <button
                        onClick={() => handleIncrease(pi, vi)}
                        className="px-3 border-l border-red-700 text-center hover:bg-slate-300 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleAddToCart(pi)}
                className="mt-3 text-white bg-red-800 rounded-lg py-2 w-full hover:bg-red-700 transition-colors"
              >
                Agregar a mi pedido
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalItemsCount > 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-4 right-4 z-50 bg-white border border-black text-black p-3 rounded-full shadow-lg hover:scale-110 transform transition-transform focus:outline-none"
          aria-label="Abrir carrito"
        >
          <Image src="public/assets/icons/cart.svg" alt="Carrito" width={48} height={48} className="block" />
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
              {totalItemsCount}
            </span>
          )}
        </button>
      )}

      {isModalOpen && (
        <CartModal
          items={cartItems}
          onRemove={removeItem}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}