import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import CheckIcon from "../icons/check";
import { cn } from "../../utils/helpers";

export interface DropdownContentProps
  extends DropdownMenuPrimitive.DropdownMenuContentProps {
  /** extra classname for styling */
  className?: string;
  /** dropdown variant */
  variant?: "primary" | "normal";
  /** max height of dropdown content */
  maxHeight?: number | string;
  /** width of dropdown content */
  width?: number | string;
}

export interface DropdownItemProps
  extends DropdownMenuPrimitive.DropdownMenuItemProps {
  /** extra classname for styling */
  className?: string;
  /** dropdown variant */
  variant?: "primary" | "normal";
  /** is this a multi select value */
  isMulti?: boolean;
  /** what is the value of this dropdown item */
  itemValue?: string;
  /** This is the array of selected values */
  values?: string[];
  /** should menu be closed on item click */
  closeMenuOnSelect?: boolean;
}

/**
 * Displays a menu to the user—such as a set of actions or  functions—triggered by a button
 */
export const DropdownContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  DropdownContentProps
>(
  (
    {
      className,
      children,
      maxHeight,
      width,
      align,
      variant = "normal",
      ...props
    },
    forwardedRef
  ) => {
    return (
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          {...props}
          align={align || "start"}
          className={cn(
            "text-black text-sm bg-white h-auto w-auto rounded-r8 flex flex-col gap-y-4 py-8 px-6 shadow-dropdown mt-8 z-50",
            {
              "bg-primary text-white": variant === "primary",
            },
            className
          )}
          style={{
            maxHeight: maxHeight || "300px",
            width: width || "var(--radix-dropdown-menu-trigger-width)",
          }}
          ref={forwardedRef}
        >
          {children}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    );
  }
);

DropdownContent.displayName = "DropdownContent";

export const DropdownItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownItemProps
>(
  (
    {
      className,
      variant = "normal",
      isMulti,
      values,
      itemValue,
      closeMenuOnSelect = false,
      ...props
    },
    ref
  ) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        "cursor-default rounded-r4 text-sm text-app-text px-[6px] p-4 font-medium hover:outline-none hover:border-none ",
        {
          "hover:bg-primary hover:bg-opacity-20": variant === "normal",
        },
        className
      )}
      {...props}
      onClick={
        isMulti && !closeMenuOnSelect
          ? (e) => {
              e.preventDefault();
              props.onClick?.(e);
            }
          : props.onClick
      }
    >
      {isMulti ? (
        <span className="flex items-center">
          <span
            className={cn(
              "h-16 w-16 rounded-[4px] bg-white shadow-[0px_1px_1px_0px_#00000019,0px_0px_0px_1px_#0b132b28] mr-8 flex items-center justify-center",
              {
                "bg-primary": itemValue && values?.includes(itemValue),
              }
            )}
          >
            <CheckIcon />
          </span>
          {props.children}
        </span>
      ) : (
        props.children
      )}
    </DropdownMenuPrimitive.Item>
  )
);
DropdownItem.displayName = DropdownMenuPrimitive.Item.displayName;

const Dropdown = DropdownMenuPrimitive.Root;
export { Dropdown };

export const DropdownTrigger = DropdownMenuPrimitive.Trigger;
