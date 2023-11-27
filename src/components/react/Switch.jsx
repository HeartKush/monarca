import React from "react";
import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

const ThemeSwitch = (props) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    color,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  
  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={
            (isSelected
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-slate-200 hover:bg-slate-300",
            slots.wrapper({
              class: [
                "w-8 h-8",
                "flex items-center justify-center",
                "rounded-lg",
                "group-data-[selected=true]:bg-fuchsia-600 group-data-[selected=true]:text-primary-foreground",
              ],
            }))
          }
        >
          {isSelected ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  );
};

export default function App() {
  return <ThemeSwitch />;
}
