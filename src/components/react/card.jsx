import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";
import CartModal from "./CartModal.jsx";

export default function ProductCards() {
  const list = [
    {
      name: "Longaniza Artesanal",
      kg: "Kilo",
      lb: "Libra",
      img: "/assets/images/longaniza.webp",
      kgPrice: "$30.000",
      lbPrice: "$16.000",
    },
    {
      name: "Chorizo Argentino",
      kg: "Kilo",
      lb: "Libra",
      img: "/assets/images/argentino.webp",
      kgPrice: "$30.000",
      lbPrice: "$16.000",
    },
    {
      name: "Chorizo Antioqueño",
      kg: "Kilo",
      lb: "Libra",
      img: "/assets/images/antioqueno.jpg",
      kgPrice: "$30.000",
      lbPrice: "$16.000",
    },
  ];

  // Estado para la cantidad de cada tarjeta
  const [quantities, setQuantities] = useState(Array(list.length).fill(0));
  // Estado para la unidad seleccionada de cada tarjeta ("kg" o "lb" o null)
  const [selectedUnits, setSelectedUnits] = useState(Array(list.length).fill(null));
  // Estado para almacenar los ítems agregados al carrito
  const [cartItems, setCartItems] = useState([]);
  // Estado para saber si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDecrease = (index) => {
    if (quantities[index] > 0) {
      const newQuantities = [...quantities];
      newQuantities[index] = newQuantities[index] - 1;
      setQuantities(newQuantities);
    }
  };

  const handleIncrease = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantities[index] + 1;
    setQuantities(newQuantities);
  };

  const handleCheckboxChange = (index, unit) => {
    // Si se hace clic de nuevo sobre la misma unidad, la deselecciona (null)
    const newUnits = [...selectedUnits];
    newUnits[index] = newUnits[index] === unit ? null : unit;
    setSelectedUnits(newUnits);
  };

  const handleAdd = (index) => {
    const productName = list[index].name;
    const quantity = quantities[index];
    const unit = selectedUnits[index];

    if (!unit) {
      alert("Por favor selecciona Kilo o Libra antes de agregar al pedido.");
      return;
    }
    if (quantity < 1) {
      alert("La cantidad debe ser al menos 1.");
      return;
    }

    // Calcula el precio numérico (sin el signo $ ni puntos)
    const priceNumeric =
      unit === "kg"
        ? Number(list[index].kgPrice.replace(/\D/g, "")) // “$30.000” → 30000
        : Number(list[index].lbPrice.replace(/\D/g, "")); // “$16.000” → 16000

    const subTotal = priceNumeric * quantity;

    // Crea un objeto con la info del ítem
    const newItem = {
      id: productName + "_" + unit, // por ejemplo, “ChorizoArgentino_kg”
      name: productName,
      unit,
      quantity,
      price: priceNumeric,
      subTotal,
    };

    // Agrega el nuevo ítem al array de carrito
    setCartItems((prev) => [...prev, newItem]);

    // Abre el modal
    setIsModalOpen(true);

    // Reiniciar la cantidad a 0 y unidad a null
    const newQuantities = [...quantities];
    newQuantities[index] = 0;
    setQuantities(newQuantities);
    const newUnits = [...selectedUnits];
    newUnits[index] = null;
    setSelectedUnits(newUnits);
  };

  return (
    <>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto justify-items-center mt-10">
        {list.map((item, index) => (
          <Card
            shadow="sm"
            className="max-w-xs flex flex-col"
            key={index}
            fullWidth={false}
            isPressable={false}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.name}
                className="w-full object-cover h-[240px]"
                src={item.img}
              />
            </CardBody>
            <CardFooter className="flex flex-col p-4">
              {/* Selector de unidad y precio */}
              <div className="flex justify-between items-center mb-2">
                <label className="flex items-center space-x-1 font-body text-sm">
                  <Checkbox
                    checked={selectedUnits[index] === "kg"}
                    onChange={() => handleCheckboxChange(index, "kg")}
                    color="danger"
                  />
                  <span>{item.kg}</span>
                </label>
                <p className="text-default-500">{item.kgPrice}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <label className="flex items-center space-x-1 font-body text-sm">
                  <Checkbox
                    checked={selectedUnits[index] === "lb"}
                    onChange={() => handleCheckboxChange(index, "lb")}
                    color="danger"
                  />
                  <span>{item.lb}</span>
                </label>
                <p className="text-default-500">{item.lbPrice}</p>
              </div>

              {/* Selector de cantidad */}
              <div className="flex items-center justify-center border border-red-700 rounded-lg mb-4">
                <span
                  onClick={() => handleDecrease(index)}
                  className="px-4 border-r border-red-700 text-center hover:bg-slate-300 rounded-l-lg cursor-pointer"
                >
                  –
                </span>
                <span className="px-4 flex-grow text-center">{quantities[index]}</span>
                <span
                  onClick={() => handleIncrease(index)}
                  className="px-4 border-l border-red-700 text-center hover:bg-slate-300 rounded-r-lg cursor-pointer"
                >
                  +
                </span>
              </div>

              {/* Botón “Agregar a mi pedido” */}
              <button
                onClick={() => handleAdd(index)}
                className="mx-auto text-white bg-red-800 rounded-lg py-2 w-full hover:bg-red-700 transition-colors"
              >
                Agregar a mi pedido
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal de carrito */}
      {isModalOpen && (
        <CartModal
          items={cartItems}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}


