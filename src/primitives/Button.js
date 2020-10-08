import { createPrimitive, extendPrimitive } from "css-system";

const BaseButton = createPrimitive("button", {
  css: {
    borderRadius: 2,
    minWidth: 0,
    minHeight: 0,
    flex: "none",
    fontWeight: "bold",
    border: "none",
    fontSize: "inherit",
    color: "inherit",
    background: "none",
    cursor: "pointer",
    p: 2,
    "&:disabled": {
      opacity: 0.3,
      cursor: "not-allowed",
    },
    "&:focus": {
      outline: "none",
    },
    "&:active": {
      filter: "invert(1)",
    },
  },
});

export const SecondaryButton = extendPrimitive(BaseButton, {
  css: {
    border: "2px solid",
    borderRadius: 2,
  },
});

export const PrimaryButton = extendPrimitive(BaseButton, {
  css: {
    bg: "accent",
    color: "accentText",
  },
});
