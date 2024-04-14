import { useCookies } from 'react-cookie'

export const useCookieRemover = (): ((cookieNames: string[]) => void) => {
  const [, , removeCookie] = useCookies()

  const removeCookies = (cookieNames: string[]) => {
    cookieNames.forEach((cookieName) => {
      removeCookie(cookieName)
    })
  }

  return removeCookies
}
