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


    
    //* This function runs everytime we submit the form
    //* This function has to main goals: 
    //* to send the appointment data to server and add instant data to the calendar so the user doesent need to refresh
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
            title: title, 
            start: start, 
            end: end    
        })

        onClose()
    } 

    //* this function saves ClientId to a stateHook onChange
    //* also it grabs option text so we can display to a user when making a selection
    //* Than the userID is used to send the data to the backend,
    //* While title is only used to display instant data to the table so the user doesent have to refresh the page
    const handleChange = (event) => {
        setClient(event.target.value)
        var index = event.nativeEvent.target.selectedIndex;
        setTitle(event.nativeEvent.target[index].text)
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form onSubmit={onSubmit}>
                <div className="element_wrapper">
                    <select className="select_client" id="clients" onChange={handleChange}>
                        <option value="" defaultValue>Select client</option>
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
