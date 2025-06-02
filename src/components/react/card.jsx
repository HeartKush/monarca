import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import CartModal from "./CartModal.jsx";

export default function ProductCards() {
  // 1. Lista de productos con descripción y dos variantes
  const products = [
    {
      id: "longaniza-artesanal",
      name: "Longaniza Artesanal",
      description: "La mejor calidad y sabor para disfrutar en familia",
      img: "/assets/images/longaniza.webp",
      variants: [
        { label: "10 und", price: 32000 },
        { label: "5 und", price: 17000 },
      ],
    },
    {
      id: "chorizo-argentino",
      name: "Chorizo Argentino",
      description: "Sabor auténtico argentino para tu asado",
      img: "/assets/images/argentino.webp",
      variants: [
        { label: "10 und", price: 32000 },
        { label: "5 und", price: 17000 },
      ],
    },
    {
      id: "chorizo-antioqueno",
      name: "Chorizo Antioqueño",
      description: "Receta típica antioqueña para chuparse los dedos",
      img: "/assets/images/antioqueno.jpg",
      variants: [
        { label: "10 und", price: 32000 },
        { label: "5 und", price: 17000 },
      ],
    },
  ];

  // 2. Estado de cantidades: [ [qtyVar1, qtyVar2], [qtyVar1, qtyVar2], ... ]
  const [quantities, setQuantities] = useState(
    products.map(() => [0, 0])
  );

  // 3. Carrito y control de modal
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4. Sincroniza “quantities” con “cartItems”
  const syncQuantitiesWithCart = () => {
    const newQuantities = products.map(() => [0, 0]);
    cartItems.forEach((ci) => {
      const prodIndex = products.findIndex((p) => p.name === ci.name);
      if (prodIndex === -1) return;
      const varIndex = products[prodIndex].variants.findIndex(
        (v) => v.label === ci.variantLabel
      );
      if (varIndex === -1) return;
      newQuantities[prodIndex][varIndex] = ci.quantity;
    });
    setQuantities(newQuantities);
  };

  // 5. Cierra el modal tras sincronizar cantidades
  const handleCloseModal = () => {
    syncQuantitiesWithCart();
    setIsModalOpen(false);
  };

  // 6. Disminuir cantidad (no bajar de 0)
  const handleDecrease = (prodIndex, varIndex) => {
    const current = quantities[prodIndex][varIndex];
    if (current > 0) {
      const newQuantities = quantities.map((row) => [...row]);
      newQuantities[prodIndex][varIndex] = current - 1;
      setQuantities(newQuantities);
    }
  };

  // 7. Aumentar cantidad
  const handleIncrease = (prodIndex, varIndex) => {
    const newQuantities = quantities.map((row) => [...row]);
    newQuantities[prodIndex][varIndex] =
      newQuantities[prodIndex][varIndex] + 1;
    setQuantities(newQuantities);
  };

  // 8. Agregar al carrito: reemplazar cantidad si ya existe
  const handleAddToCart = (prodIndex) => {
    const product = products[prodIndex];
    const variantQuantities = quantities[prodIndex];

    // Preparamos la lista de variantes con qty > 0
    const toAdd = product.variants
      .map((variant, varIndex) => {
        const qty = variantQuantities[varIndex];
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
      .filter((item) => item !== null);

    if (toAdd.length === 0) {
      alert("Debes elegir al menos una cantidad para agregar al pedido.");
      return;
    }

    // Clonamos el carrito actual para mutar
    const updatedCart = [...cartItems];

    toAdd.forEach((newItem) => {
      // Buscar si ya existe el mismo producto + variante
      const existingIndex = updatedCart.findIndex(
        (ci) =>
          ci.name === newItem.name &&
          ci.variantLabel === newItem.variantLabel
      );

      if (existingIndex > -1) {
        // Reemplazamos la cantidad (no sumamos)
        const existing = updatedCart[existingIndex];
        existing.quantity = newItem.quantity;
        existing.subTotal = existing.price * newItem.quantity;
        updatedCart[existingIndex] = existing;
      } else {
        // Si no existía, lo agregamos como nuevo ítem
        updatedCart.push({
          id: `${newItem.name
            .toLowerCase()
            .replace(/\s+/g, "-")}-${newItem.variantLabel
            .replace(/\s+/g, "")
            .toLowerCase()}-${Date.now()}`,
          ...newItem,
        });
      }
    });

    setCartItems(updatedCart);
    setIsModalOpen(true);

    // Reiniciamos las cantidades de esta tarjeta a [0, 0]
    const reset = quantities.map((row, idx) =>
      idx === prodIndex ? [0, 0] : [...row]
    );
    setQuantities(reset);
  };

  // 9. Eliminar un ítem del carrito
  const removeItem = (idxToRemove) => {
    setCartItems((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  // 10. Cálculo simple: número total de ítems en el carrito
  const totalItemsCount = cartItems.reduce(
    (acc, itm) => acc + itm.quantity,
    0
  );

  return (
    <>
      {/* Grid de productos */}
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center mt-10">
        {products.map((prod, prodIndex) => (
          <Card
            shadow="sm"
            className="w-[320px] flex flex-col h-full"
            key={prod.id}
            fullWidth={false}
            isPressable={false}
          >
            {/* Imagen cuadrada 1:1 de 320×320px */}
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

            {/* Contenido textual: flex-col justify-between para alinear botón abajo */}
            <CardFooter className="flex flex-col justify-between p-4 space-y-3 w-full">
              {/* Bloque superior: título, descripción y variantes */}
              <div className="space-y-3">
                {/* Título y descripción */}
                <div className="space-y-1">
                  <h3 className="font-heading text-lg text-[#1D2021]">
                    {prod.name}
                  </h3>
                  <p className="font-body text-sm text-neutral-600">
                    {prod.description}
                  </p>
                </div>

                {/* Variante 1: flex + nowrap */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-body text-sm text-[#1D2021] w-40 whitespace-nowrap">
                    {prod.variants[0].label} – COP{" "}
                    {prod.variants[0].price.toLocaleString()}
                  </span>
                  <div className="flex items-center border border-red-700 rounded-lg">
                    <button
                      onClick={() => handleDecrease(prodIndex, 0)}
                      className={`px-3 border-r border-red-700 text-center hover:bg-slate-300 rounded-l-lg ${
                        quantities[prodIndex][0] === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      –
                    </button>
                    <span className="px-4 text-center w-8">
                      {quantities[prodIndex][0]}
                    </span>
                    <button
                      onClick={() => handleIncrease(prodIndex, 0)}
                      className="px-3 border-l border-red-700 text-center hover:bg-slate-300 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Variante 2: flex + nowrap */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-body text-sm text-[#1D2021] w-40 whitespace-nowrap">
                    {prod.variants[1].label} – COP{" "}
                    {prod.variants[1].price.toLocaleString()}
                  </span>
                  <div className="flex items-center border border-red-700 rounded-lg">
                    <button
                      onClick={() => handleDecrease(prodIndex, 1)}
                      className={`px-3 border-r border-red-700 text-center hover:bg-slate-300 rounded-l-lg ${
                        quantities[prodIndex][1] === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      –
                    </button>
                    <span className="px-4 text-center w-8">
                      {quantities[prodIndex][1]}
                    </span>
                    <button
                      onClick={() => handleIncrease(prodIndex, 1)}
                      className="px-3 border-l border-red-700 text-center hover:bg-slate-300 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Botón “Agregar a mi pedido” siempre pegado al fondo */}
              <button
                onClick={() => handleAddToCart(prodIndex)}
                className="mt-3 text-white bg-red-800 rounded-lg py-2 w-full hover:bg-red-700 transition-colors"
              >
                Agregar a mi pedido
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 11. Burbuja fija en esquina inferior izquierda (sólo si hay ítems) */}
      {totalItemsCount > 0 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-4 left-4 z-50 bg-white border border-black text-black p-3 rounded-full shadow-lg hover:scale-110 transform transition-transform focus:outline-none"
          aria-label="Abrir carrito"
        >
          {/* SVG de carrito con chorizos en negro */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block"
          >
            {/* Carrito */}
            <rect
              x="6"
              y="15"
              width="36"
              height="21"
              stroke="#000"
              strokeWidth="2"
              fill="none"
              rx="3"
              ry="3"
            />
            <line
              x1="6"
              y1="15"
              x2="12"
              y2="9"
              stroke="#000"
              strokeWidth="2"
            />
            <line
              x1="42"
              y1="15"
              x2="36"
              y2="9"
              stroke="#000"
              strokeWidth="2"
            />
            <circle
              cx="16"
              cy="39"
              r="3"
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="32"
              cy="39"
              r="3"
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-xs font-bold text-black">
              {totalItemsCount}
            </span>
          )}
        </button>
      )}

      {/* Modal de carrito */}
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
