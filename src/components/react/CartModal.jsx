import React from "react";

export default function CartModal({ items, onClose, onRemove }) {
  // Recalcular total
  const total = items.reduce((sum, itm) => sum + itm.subTotal, 0);

  // Construir el mensaje para WhatsApp
  const header = "¡Hola, El Monarca! 👋%0A";
  const intro = "Me gustaría hacer el siguiente pedido:%0A%0A";

  const bulletLines = items.map((itm) => {
    // Sólo mostrar paréntesis si variantLabel no está vacío
    const variantText = itm.variantLabel
      ? ` (${itm.variantLabel})`
      : "";
    return `• *${itm.name}*${variantText} x${itm.quantity} – *COP ${itm.subTotal.toLocaleString()}*`;
  });
  const bulletSection = bulletLines.join("%0A");
  const totalLine = `%0A*Total:* COP ${total.toLocaleString()}`;
  const footer = "%0A%0A¡Muchas gracias! 🙌";
  const fullMessage = header + intro + bulletSection + totalLine + footer;
  const whatsappLink = `https://wa.me/573193347803?text=${fullMessage}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Encabezado del modal */}
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

        {/* Cuerpo: lista de ítems */}
        <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
          {items.length === 0 ? (
            <p className="font-body text-center text-neutral-600">
              Aún no has agregado nada.
            </p>
          ) : (
            items.map((itm, idx) => {
              const variantText = itm.variantLabel
                ? ` (${itm.variantLabel})`
                : "";
              return (
                <div
                  key={itm.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onRemove(idx)}
                      aria-label={`Eliminar ${itm.name}`}
                      className="text-neutral-400 hover:text-red-600"
                    >
                      ✕
                    </button>
                    <span className="font-body text-sm text-[#1D2021]">
                      {itm.name}
                      {variantText} x{itm.quantity}
                    </span>
                  </div>
                  <span className="font-body font-semibold text-sm text-[#1D2021]">
                    COP {itm.subTotal.toLocaleString()}
                  </span>
                </div>
              );
            })
          )}
          {items.length > 0 && (
            <>
              <hr className="my-2" />
              <div className="flex justify-between items-center font-body text-base text-[#1D2021]">
                <span>Total:</span>
                <span className="font-semibold">
                  COP {total.toLocaleString()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Pie: botones */}
        <div className="flex flex-col space-y-2 px-4 pb-4 pt-2">
          {items.length > 0 && (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-[#BB9B45] hover:bg-[#F0DA82] text-white font-body py-2 rounded-md transition-colors"
            >
              Enviar por WhatsApp
            </a>
          )}
          <button
            onClick={onClose}
            className="w-full text-center bg-neutral-200 hover:bg-neutral-300 text-[#1D2021] font-body py-2 rounded-md"
          >
            {items.length > 0 ? "Seguir comprando" : "Cerrar"}
          </button>
        </div>
      </div>
    </div>
  );
}

