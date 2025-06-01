import React from "react";

export default function CartModal({ items, onClose }) {
  // Calcular total
  const total = items.reduce((sum, itm) => sum + itm.subTotal, 0);

  // 1. Encabezado con saludo y emoji, salto de línea
  const header = "¡Hola, El Monarca! 👋%0A";

  // 2. Texto introductorio y dos saltos de línea
  const intro = "Me gustaría hacer el siguiente pedido:%0A%0A";

  // 3. Para cada ítem: viñeta •, negrita para el nombre, itálica para la unidad,
  //    cantidad y negrita para el subtotal
  const bulletLines = items.map((itm) => {
    // Ejemplo: • *Longaniza Artesanal* _(kg)_ x2 – *COP 60000*
    const line = `• *${itm.name}* _(${itm.unit})_ x${itm.quantity} – *COP ${itm.subTotal.toLocaleString()}*`;
    return line;
  });
  // Unimos cada viñeta con salto de línea
  const bulletSection = bulletLines.join("%0A");

  // 4. Línea de total en negrita, con salto de línea antes
  const totalLine = `%0A*Total:* COP ${total.toLocaleString()}`;

  // 5. Despedida con emoji y dos saltos de línea antes
  const footer = "%0A%0A¡Muchas gracias! 🙌";

  // 6. Concatenamos todo el mensaje (header + intro + viñetas + línea de total + footer)
  const fullMessage = header + intro + bulletSection + totalLine + footer;

  // 7. El enlace a WhatsApp, incluyendo el texto ya con %0A para saltos de línea
  const whatsappLink = `https://wa.me/573193347893?text=${fullMessage}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Encabezado del Modal */}
        <div className="flex justify-between items-center border-b border-neutral-200 px-4 py-3">
          <h3 className="font-heading text-xl text-[#8D1111]">Tu Pedido</h3>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="text-neutral-500 hover:text-neutral-800"
          >
            ✕
          </button>
        </div>

        {/* Cuerpo: listado de ítems */}
        <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
          {items.map((itm, idx) => (
            <div
              key={`${itm.id}-${idx}`}
              className="flex justify-between items-center"
            >
              <span className="font-body text-sm text-[#1D2021]">
                {itm.name} ({itm.unit}) x{itm.quantity}
              </span>
              <span className="font-body font-semibold text-sm text-[#1D2021]">
                COP {itm.subTotal.toLocaleString()}
              </span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between items-center font-body text-base text-[#1D2021]">
            <span>Total:</span>
            <span className="font-semibold">COP {total.toLocaleString()}</span>
          </div>
        </div>

        {/* Footer: botones */}
        <div className="flex flex-col space-y-2 px-4 pb-4 pt-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center bg-[#BB9B45] hover:bg-[#F0DA82] text-white font-body py-2 rounded-md transition-colors"
          >
            Enviar por WhatsApp
          </a>
          <button
            onClick={onClose}
            className="w-full text-center bg-neutral-200 hover:bg-neutral-300 text-[#1D2021] font-body py-2 rounded-md"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
}

