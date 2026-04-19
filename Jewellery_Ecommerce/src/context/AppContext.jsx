import { createContext, useContext, useMemo, useState } from 'react'
import {
  categories,
  getProductById,
  getProductsByCategory,
  products,
} from '../data/products'

const AppContext = createContext(null)

export const AppProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const value = useMemo(
    () => ({
      categories,
      products,
      selectedCategory,
      setSelectedCategory,
      getProductsByCategory,
      getProductById,
    }),
    [selectedCategory],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext must be used inside AppProvider')
  }

  return context
}
