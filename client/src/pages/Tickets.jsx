import TicketList from "../components/tickets/TicketList"
import Button from "../components/ui/Button";
import { useTheme } from "../contexts/ThemeContext";
import { mockTickets } from "../data/mockData"
import { useNavigate } from "react-router-dom"


const Tickets = () => {
  const navigate = useNavigate();  

  const formattedTickets = mockTickets.map((ticket) => ({
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    category: ticket.category,
    createdAt: new Date(ticket.createdAt),
    updatedAt: new Date(ticket.updatedAt),
    assignedTo: ticket.assignedTo,
    createdBy: ticket.createdBy,
    commentsCount: ticket.commentsCount
  }));
  
  const {theme, toggleTheme} = useTheme();

  return (
    <div className="p-6 md:p-8">
        <TicketList tickets={formattedTickets} onCreateTicket={() => navigate('/')}/>     
        <Button onClick={toggleTheme}>Toggle</Button>
    </div>
  )
}

export default Tickets