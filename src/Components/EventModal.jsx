import Modal from "react-modal"
import '../Style/EventModal.css'

//* Here is where we show details about each event we click

const EventModal = ({isOpen, onClose, brandName, startDate, endDate, staffMember, staffMemberFirstName, staffMemberLastName}) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className="event_info_modal">
                <h3>{brandName}</h3>
                <p>{startDate}</p>
                <p>{endDate}</p>
                <p>{staffMemberFirstName} {staffMemberLastName}</p>
                <p>{staffMember}</p>
            </div>
        </Modal>
    )
}

export default EventModal
