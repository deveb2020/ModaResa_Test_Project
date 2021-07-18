import { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Modal from "react-modal"
import moment from 'moment'
import '../Style/Scheduler.css'

const Scheduler = ({isOpen, onClose, onEventAdded}) => {

    const [title, setTitle] = useState("")
    const [start, setStart] = useState(moment(new Date()).format("MMMM Do YYYY, h:mm a"))
    const [end, setEnd] = useState(moment(new Date()).format("MMMM Do YYYY, h:mm a"))


    const onSubmit = (event) => {
        event.preventDefault()

        onEventAdded({
            title,
            start,
            end
        })

        onClose()
    } 


    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <input placeholder="Brand name" value={title} onChange={e => setTitle(e.target.value)} />

                <div>
                    <label>Start Date</label>
                    <Datetime value={start} onChange={date => setStart(date._d)}/>
                </div>

                <div>
                    <label>End Date</label>
                    <Datetime value={end} onChange={date => setEnd((date._d))}/>
                </div>

                <button className="submit_btn" type='submit'>Add event</button>
            </form>
        </Modal>
    )
}

export default Scheduler
