import { createPrimitive, extendPrimitive } from 'css-system'

export const Text = createPrimitive('div', {
  css: {
    display: 'inline',
    minWidth: 0,
    minHeight: 0,
    flex: 'none',
  },
})

export const Title = extendPrimitive(Text, {
  css: {
    fontSize: 'large',
    fontWeight: 'bold',
  },
})

export const Hint = extendPrimitive(Text, {
  as: 'small',
  css: {
    opacity: 0.75,
  },
})
