import {BrowserRouter, Routes, Route, Form} from 'react-router-dom'
import {Landing, Register, Error, ProtectedRoute} from './pages'
import {
  AddDelivery,
  AllDelivery,
  Profile,
  SharedLayout,
  Stats
} from './pages/deliveryDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <SharedLayout/>
            </ProtectedRoute>
          }
        > 
          //relative paths
          <Route index element={<Stats/>}/>
          <Route path="add-delivery" element={<AddDelivery/>}/>
          <Route path="all-delivery" element={<AllDelivery/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>
        <Route path="/register" element={<Register/>}/>
        <Route path="/landing" element={<Landing/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>  
    </BrowserRouter>
  )
}
export default App