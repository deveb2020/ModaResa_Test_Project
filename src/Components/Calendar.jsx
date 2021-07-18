import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import interactionPlugin from '@fullcalendar/interaction'
import { useRef, useState } from 'react'
import Scheduler from './Scheduler'
import '../Style/Calendar.css'
import { FaPlusCircle } from "react-icons/fa";
import EventModal from './EventModal'
import moment from 'moment'



const Calendar = () => {

    const [modalOpen, setModalOpen] = useState(false)
    const [eventModalOpen, setEventModalOpen] = useState(false)
    const [brandName, setBrandName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [stafAssigned, setStafAssigned] = useState([])
    const calendarRef = useRef(null)
    const displayTheButtonConditionally = modalOpen === false && eventModalOpen === false ? <button className="add_event_btn" onClick={() => setModalOpen(true)}><FaPlusCircle/></button> : ""

    const onEventAdded = (event) => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent(event)
    }

    // this function helps to get the event info, so we can than display them into a modal
    const handleEventClick = ( eventInfo ) => {
        console.log(eventInfo)
        const startDate = eventInfo.event._instance.range.start
        const endDate = eventInfo.event._instance.range.end
        setBrandName(eventInfo.event._def.title)
        setStartDate(moment(startDate).format("MMMM Do YYYY, h:mm a"))
        setEndDate(moment(endDate).format("MMMM Do YYYY, h:mm a"))
        setEventModalOpen(true)
    }

    return (
        <div>
            {displayTheButtonConditionally}
            
            <div style={{position: 'relative', zIndex: "0"}}>
                <FullCalendar
                    ref={calendarRef}
                    plugins={[ dayGridPlugin, interactionPlugin ]}
                    initialView="dayGridMonth"
                    eventClick={handleEventClick}
                />
            </div>

            <Scheduler isOpen={modalOpen} onClose={() => setModalOpen(false)} onEventAdded={event => onEventAdded(event)} />
            <EventModal 
                isOpen={eventModalOpen}
                onClose={() => setEventModalOpen(false)}
                brandName={brandName} 
                startDate={startDate}
                endDate={endDate}
            />
        </div>
    )
}

export default Calendar
