import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Checkbox } from "@nextui-org/react";

export default function App() {
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
  // Estado para realizar un seguimiento de la cantidad seleccionada para cada tarjeta
  const [quantities, setQuantities] = useState(Array(list.length).fill(0));
  const [selectedUnit, setSelectedUnit] = useState(null);

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
    setSelectedUnit(unit === selectedUnit ? null : unit);
  };

  const handleBuy = (index) => {
    const phoneNumber = "573193347803"; // El número de teléfono de WhatsApp en formato internacional
    const productName = list[index].name;
    const quantity = quantities[index];
    const unit = selectedUnit;

    // Construir el mensaje predeterminado
    const message = `¡Hola! Quiero comprar ${quantity} ${unit} de ${productName}.`;

    // Codificar el mensaje para la URL
    const encodedMessage = encodeURIComponent(message);

    // Crear el enlace de WhatsApp
    const whatsappLink = `https://wa.me/${phoneNumber}/?text=${encodedMessage}`;

    // Abrir WhatsApp con el enlace
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 mx-auto justify-items-center lg:grid-cols-3 mt-10">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          className="flex max-w-xs"
          key={index}
          fullWidth={false}
          isPressable={false}
          onPress={() => console.log("item pressed")}
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={item.title}
              className="w-full object-fit h-[240px]"
              src={item.img}
            />
          </CardBody>
          <CardFooter className="flex flex-col flex-wrap">
            <div className="flex justify-between w-full">
              <div>
                <label>
                  <Checkbox
                    checked={selectedUnit === "kg"}
                    onChange={() => handleCheckboxChange(index, "kg")}
                    color="danger"
                  />
                  <span className="">{item.kg}</span>
                </label>
              </div>
              <p className="text-default-500">{item.kgPrice}</p>
            </div>
            <div className="flex justify-between w-full">
              <div>
                <label>
                  <Checkbox
                    checked={selectedUnit === "lb"}
                    onChange={() => handleCheckboxChange(index, "lb")}
                    color="danger"
                  />
                  <span className="">{item.lb}</span>
                </label>
              </div>
              <p className="text-default-500">{item.lbPrice}</p>
            </div>

            <div className="flex mx-auto border border-red-700 rounded-lg">
              <span
                id={`drop-${index}`}
                onClick={() => handleDecrease(index)}
                className="px-4 border-r-1 border-red-700 text-center hover:bg-slate-300 rounded-l-lg"
              >
                -
              </span>
              <span id={`total-${index}`} className="px-4 flex-grow">
                {quantities[index]}
              </span>
              <span
                id={`push-${index}`}
                onClick={() => handleIncrease(index)}
                className="px-4 border-l-1 border-red-700 text-center hover:bg-slate-300 rounded-r-lg"
              >
                +
              </span>
            </div>
            <button
              onClick={() => handleBuy(index)}
              className="mx-auto text-white bg-red-800 rounded-lg mt-2 py-2 w-full hover:bg-red-700"
            >
              Comprar
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
