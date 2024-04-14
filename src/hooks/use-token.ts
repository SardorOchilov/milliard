export function useToken() {
  const TOKEN_KEY = 'sessionID'
  const setToken = (value: string) => {
    localStorage.setItem(TOKEN_KEY, value)
  }

  const getToken = () => {
    return localStorage.getItem(TOKEN_KEY)
  }

  const handleLogout = () => {
    // if (!IS_DEV) window.location.href = VITE_IDENTITY_SERVICE
  }

  return {
    setToken,
    getToken,
    handleLogout,
    TOKEN_KEY
  }
}
