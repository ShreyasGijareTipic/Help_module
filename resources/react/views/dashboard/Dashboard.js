import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardTitle,
  CCardText,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import TicketTable from '../pages/TicketTable'

const Dashboard = () => {
  const [ticketCounts, setTicketCounts] = useState({
    new: 0,
    inProcess: 0,
    closed: 0,
    total: 0,
    drAssist: 0,
    aquaLogix: 0,
  })
  const [tickets, setTickets] = useState([]) 
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tickets')
        const tickets = response.data

        // Count tickets based on status
        const newTickets = tickets.filter((ticket) => ticket.status === 0).length
        const inProcessTickets = tickets.filter((ticket) => ticket.status === 1).length
        const closedTickets = tickets.filter((ticket) => ticket.status === 2).length
        const totalTickets = tickets.length

        // Count tickets based on product id
        const drAssistTickets = tickets.filter((ticket) => ticket.products_id === 1).length
        const aquaLogixTickets = tickets.filter((ticket) => ticket.products_id === 2).length

        setTicketCounts({
          new: newTickets,
          inProcess: inProcessTickets,
          closed: closedTickets,
          total: totalTickets,
          drAssist: drAssistTickets,
          aquaLogix: aquaLogixTickets,
        })

        setTickets(tickets)
      } catch (error) {
        console.error('Error fetching tickets:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [])

  const handleCardClick = (status) => {
    navigate(`/TicketTableNewTicket`)
  }

  const handleCardClick4 = (status) => {
    navigate(`/TicketTable`)
  }

  const handleCardClick1 = (status) => {
    navigate(`/TicketTableInProcessTicket`)
  }

  const handleCardClick2 = (status) => {
    navigate(`/TicketTableClosedTicket`)
  }

  const handleCardClickDrAssist = () => {
    navigate(`/TicketTableDrAssist`)
  }

  const handleCardClickAquaLogix = () => {
    navigate(`/TicketTableAquaLogix`)
  }

  return (
    <>
      <CRow className="mb-4">
        {loading ? (
          <CCol xs={12} className="text-center">
            <CSpinner color="primary" />
          </CCol>
        ) : (
          <>
            {/* Status cards */}
            <CCol xs={12} sm={6} md={3}>
              <CCard
                color="primary"
                textColor="white"
                onClick={() => handleCardClick(0)}
                style={{ cursor: 'pointer' }}
              >
                <CCardBody>
                  <CCardTitle>New Tickets</CCardTitle>
                  <CCardText className="fs-4">{ticketCounts.new}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12} sm={6} md={3}>
              <CCard
                color="warning"
                textColor="white"
                onClick={() => handleCardClick1(1)}
                style={{ cursor: 'pointer' }}
              >
                <CCardBody>
                  <CCardTitle>In Process</CCardTitle>
                  <CCardText className="fs-4">{ticketCounts.inProcess}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12} sm={6} md={3}>
              <CCard
                color="danger"
                textColor="white"
                onClick={() => handleCardClick2(2)}
                style={{ cursor: 'pointer' }}
              >
                <CCardBody>
                  <CCardTitle>Closed Tickets</CCardTitle>
                  <CCardText className="fs-4">{ticketCounts.closed}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12} sm={6} md={3}>
              <CCard
                color="success"
                textColor="white"
                onClick={() => handleCardClick4('all')}
                style={{ cursor: 'pointer' }}
              >
                <CCardBody>
                  <CCardTitle>Total Tickets</CCardTitle>
                  <CCardText className="fs-4">{ticketCounts.total}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>

            {/* Product-specific cards with spacing and colors */}
            <CCol xs={12} sm={6} md={3} style={{ marginTop: '20px' }}>
              <CCard
                style={{
                  backgroundColor: 'purple',
                  color: 'white',
                  cursor: 'pointer',
                }}
                onClick={handleCardClickDrAssist}
              >
                <CCardBody>
                  <CCardTitle>Dr Assist</CCardTitle>
                  <CCardText className="fs-4">{ticketCounts.drAssist}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol xs={12} sm={6} md={3} style={{ marginTop: '20px' }}>
              <CCard
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  cursor: 'pointer',
                }}
                onClick={handleCardClickAquaLogix}
              >
                <CCardBody>
                  <CCardTitle>Aqua Logix</CCardTitle>
                  <CCardText className="fs-4">{ticketCounts.aquaLogix}</CCardText>
                </CCardBody>
              </CCard>
            </CCol>
          </>
        )}
      </CRow>

      {/* Show the full table of tickets */}
      {!loading && <TicketTable tickets={tickets} />}
    </>
  )
}

export default Dashboard;
