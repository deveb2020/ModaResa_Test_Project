import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useRef, useState } from 'react'
import Scheduler from './Scheduler'
import '../Style/Calendar.css'
import { FaPlusCircle } from "react-icons/fa";
import EventModal from './EventModal'
import moment from 'moment'
import { useQuery } from '@apollo/client';
import { GET_EVENTS_QUERY } from "../graphql/Queries"



const Calendar = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const [eventModalOpen, setEventModalOpen] = useState(false)
    const [brandName, setBrandName] = useState("")
    const [staffMember, setStaffMember] = useState("")
    const [staffMemberFirstName, setStaffMemberFirstName] = useState("")
    const [staffMemberLastName, setStaffMemberLastName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [Events, setEvents] = useState()
    const calendarRef = useRef(null)
    const displayTheButtonConditionally = modalOpen === false && eventModalOpen === false ? <button className="add_event_btn" onClick={() => setModalOpen(true)}><FaPlusCircle/></button> : ""
    const { loading, error, data } = useQuery(GET_EVENTS_QUERY);

    
    //* get all the data from the database on componenet mount and save em in a useState hook
    useEffect(() => {
        if (loading) return <h3>loading...</h3>;
        if (error) return <h3>Error! {error.message}</h3>;
        setEvents(data.allAppointments.map(event => ({
            title: event.client.brandName,
            start: moment(new Date(parseInt(event.startAt))).format(),
            end: moment(new Date(parseInt(event.endAt))).format(),
            stafMember: event.staffMember.email,
            staffMemberFirstName: event.staffMember.firstName,
            staffMemberLastName: event.staffMember.lastName,
        })))
    }, [data])

    //* this function adds the events to the calendar when we create them in the Scheduler.jsx
    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent(event) 
    }

    //* this function helps to get the event info, so we can than display into a EventModal Componnent
    const handleEventClick = ( eventInfo ) => {
        setEventModalOpen(true)
        setBrandName(eventInfo.event._def.title)
        setStartDate(moment(eventInfo.event._instance.range.start).format("YYYY-MM-DD, h:mm a"))
        setEndDate(moment(eventInfo.event._instance.range.end).format("YYYY-MM-DD, h:mm a"))
        setStaffMember(eventInfo.event._def.extendedProps.stafMember)
        setStaffMemberFirstName(eventInfo.event._def.extendedProps.staffMemberFirstName)
        setStaffMemberLastName(eventInfo.event._def.extendedProps.staffMemberLastName)
    }

    return (
        <div>
            {displayTheButtonConditionally}
            
            <div style={{position: 'relative', zIndex: "0"}}>
                <FullCalendar
                    ref={calendarRef}
                    events={Events}
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    eventClick={handleEventClick}
                    dayMaxEventRows={true}
                />
            </div>

            <Scheduler 
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                onEventAdded={event => onEventAdded(event)} 
            />
            
            <EventModal 
                isOpen={eventModalOpen}
                onClose={() => setEventModalOpen(false)}
                brandName={brandName} 
                startDate={startDate}
                endDate={endDate}
                staffMember={staffMember}
                staffMemberFirstName={staffMemberFirstName}
                staffMemberLastName={staffMemberLastName}
            />
        </div>
    )
}

export default Calendar
