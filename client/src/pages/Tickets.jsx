import { useEffect } from "react"
import TicketList from "../components/tickets/TicketList"
import { useTheme } from "../contexts/ThemeContext"
import Button from "../components/ui/Button"

const Tickets = () => {
    const {theme,toggleTheme} = useTheme()

    
    
  return (
    <div className="p-6 md:p-8">
        <TicketList />
    </div>
  )
}

export default Tickets