import { Store } from '@/types/store'
import { Authenticated } from '@/store/authenticated'
import { createContext, useContext } from 'react'
import { User } from '@/store/user'

const getStores = (): Store => {
  const authentication = new Authenticated()
  const user = new User()

  return {
    authentication,
    user
  }
}

const stores = getStores()

const StoreContext = createContext<Store>(stores)

const StoreProvider = ({ children }: { children: any }) => {
  return (
    <StoreContext.Provider value={stores}>{children}</StoreContext.Provider>
  )
}

const useStore = () => {
  return useContext(StoreContext)
}

export { getStores, StoreContext, StoreProvider, useStore }
