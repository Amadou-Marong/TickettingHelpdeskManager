import { useState } from "react"
import AnimatedTransition from "../../common/AnimatedTransition"
import { TabsList, Tabs, TabsTrigger } from "../ui/Tabs"
import Button from "../ui/Button"
import TicketCard from "./TicketCard"
import { Plus } from "lucide-react"

const TicketList = ({tickets, onCreateTicket}) => {
  const [selectedTab, setSelectedTab] = useState('all')

    // filter tickets based on selected tab
    const filteredTickets = tickets.filter((ticket) => {
      if (selectedTab === 'all') return true
      if (selectedTab === 'open') return ticket.status === 'open'
      if (selectedTab === 'in-progress') return ticket.status === 'in-progress'
      if (selectedTab === 'on-hold') return ticket.status === 'on-hold'
      if (selectedTab === 'escalated') return ticket.status === 'escalated'
      if (selectedTab === 'closed') return ticket.status === 'closed' || ticket.status === 'resolved'
      return true
    })

    return (
      <AnimatedTransition>
        <div className="space-y-6 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
              <p className="text-gray-500">
                Here's a list of all your tickets.
              </p>
            </div>
            <Button onClick={onCreateTicket}>
              
            <Plus className="mr-2 h-4 w-4" />   Create New Ticket</Button>
          </div>
          
        </div>
      </AnimatedTransition>
    )
}

export default TicketList