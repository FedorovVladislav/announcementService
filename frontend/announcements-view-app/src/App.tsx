import './App.css'
import LoginForm from './LoginForm'
import { Button } from "@/components/ui/button"
import { RegistrationForm } from './RegistrationForm'

function App() {
  return (
    <>
 <div className="flex min-h-svh flex-col items-center justify-center">
      <RegistrationForm/>
    </div>
    </>
  )
}

export default App
