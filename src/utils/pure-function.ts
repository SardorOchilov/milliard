export function debounce<F extends (...args: any[]) => void>(
  func: F,
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout>

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this

    const later = () => {
      timeoutId = null!
      func.apply(context, args)
    }

    clearTimeout(timeoutId)
    timeoutId = setTimeout(later, delay) as any
  }
}
