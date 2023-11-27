import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Inicio",
    "Nosotros",
    "Productos",
    "Contactos"
  ];

  return (
    <Navbar
      position="sticky"
      isBordered
      maxWidth="2xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="py-1 text-white bg-red-800 sm:bg-red-800"
      isBlurred={true}
    >
      {/* mobile */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <img
            src="/assets/images/logo.png"
            widht={64}
            heigth={64}
            alt=""
            className="w-1/2"
          />
          <p className="font-bold text-inherit leading-5">
            El Monarca <br />
            Embutidos
          </p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarBrand>
          <img
            src="/assets/images/logo.png"
            widht={64}
            heigth={64}
            alt=""
            className="w-16"
          />
          <p className="font-bold text-inherit leading-5">
            El Monarca <br />
            Embutidos
          </p>
        </NavbarBrand>
        <NavbarItem>
          <Link className="text-white text-md" href="#">
            INICIO
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            className="text-white text-md"
            href="https://www.instagram.com/elmonarca.co"
            target="_blank"
          >
            NOSOTROS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            className="text-white text-md"
            href="#products"
          >
            PRODUCTOS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            className="text-white text-md"
            href="https://wa.me/message/BEDMNENC5ZUNJ1"
            target="_blank"
          >
            CONTACTO
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="mt-1 gap-10 bg-slate-900 justify-center items-center">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-slate-300 text-2xl" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
