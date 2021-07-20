import { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Modal from "react-modal"
import moment from 'moment'
import '../Style/Scheduler.css'
import { useMutation } from '@apollo/client';
import { CREATE_APPOINTMENT } from "../graphql/Queries"

const Scheduler = ({isOpen, onClose, onEventAdded}) => {

    const [title, setTitle] = useState("")
    const [client, setClient] = useState("")
    const [staffMember, setStaffMember] = useState("")
    const [start, setStart] = useState(moment(new Date()).format("MMMM Do YYYY, h:mm a"))
    const [end, setEnd] = useState(moment(new Date()).format("MMMM Do YYYY, h:mm a"))
    const [createAppoitment, { data, error }] = useMutation(CREATE_APPOINTMENT)

    const onSubmit = (event) => {
        event.preventDefault()

        createAppoitment({
            variables: {
                startAt: moment(start).format("YYYY-MM-DD, h:mm a"),
                endAt: moment(end).format("YYYY-MM-DD, h:mm a"),
                clientId: client,
                staffMemberId: staffMember
            }
        }) 

        if (error) { console.log(error) }

        onEventAdded({     
            title: title, // title: "Egzon Berisha"
            start: start, // start: Tue Jul 20 2021 14:00:00 GMT+0200 (heure d’été d’Europe centrale)
            end: end     // end: Tue Jul 20 2021 15:00:00 GMT+0200 (heure d’été d’Europe centrale)
        })

        onClose()
    } 


    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <input placeholder="Brand name" value={title}  onChange={e => setTitle(e.target.value)} />

                <div className="element_wrapper">
                    <select className="select_client" id="clients" onChange={(event) => setClient(event.target.value)}>
                        <option value="">Select client</option>
                        <option value="ckpxxtzyq0018oh7p6pp4w1xp">Client 1</option>
                        <option value="ckpxxtzyu0027oh7po6iyk77i">Client 2</option>
                        <option value="ckpxxtzyz0036oh7pkq3htl4r">Client 3</option>
                    </select>
                </div>

                <div className="element_wrapper">
                    <select className="select_client" id="staffMember" onChange={(event) => setStaffMember(event.target.value)}>
                        <option value="">Select staff member</option>
                        <option value="ckpxxtzyb0000oh7pwq9uzwte">John Doe</option>
                        <option value="ckpxxtzyl0009oh7pmmj7tajq">Jane Tristan</option>
                    </select>
                </div>

                <div className="element_wrapper">
                    <Datetime value={start} onChange={date => setStart(date._d)}/>
                </div>

                <div className="element_wrapper"> 
                    <Datetime value={end} onChange={date => setEnd((date._d))}/>
                </div>

                <button className="submit_btn" type='submit'>Add event</button>
            </form>
        </Modal>
    )
}

export default Scheduler
