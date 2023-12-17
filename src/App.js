import {useState} from 'react'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import HomePage from './components/HomePage'
import LoginForm from './components/LoginForm'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'


const App = () => {
  const [cartList, setCartList] = useState([])
  const [restaurantName, setRestaurantName] = useState('')

  const addCartItem = dish => {
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (!isAlreadyExists) {
      setCartList(prev => [...prev, dish])
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      )
    }
  }

  const removeCartItem = dishId => {
    setCartList(prevState => prevState.filter(item => item.dishId !== dishId))
  }

  const removeAllCartItems = () => setCartList([])

  const incrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0)
    )
  }

  return (
    <>
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem,
            removeCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            removeAllCartItems,
            restaurantName,
            setRestaurantName,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={HomePage} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route exact path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
