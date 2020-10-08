import { createPrimitive } from "css-system"

export const Input = createPrimitive("input", {
  type: "text",
  css: {
    color: "lightPrimaryText",
    fontSize: "inherit",
    bg: "lightPrimary",
    border: "none",
    borderRadius: 2,
    borderColor: "currentColor",
    p: 2,
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    "&:focus": {
      outline: "none",
    },
  },
})
