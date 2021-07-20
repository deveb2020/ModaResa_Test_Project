import { gql } from "@apollo/client"

export const GET_EVENTS_QUERY = gql`
query { 
    allAppointments { 
        id
        startAt
        endAt
        client { 
            id
            brandName
        }
        staffMember { 
                id
                email
                firstName
                lastName
            }
        }
}
`

export const CREATE_APPOINTMENT = gql`
    mutation createAppointment(
        $startAt: String!
        $endAt: String!
        $clientId: String!
        $staffMemberId: String!
    ) {
        createAppointment(appointment: {
            startAt: $startAt
            endAt: $endAt
            clientId: $clientId
            staffMemberId: $staffMemberId
        }
        ) {
            startAt
            endAt
            clientId
            staffMemberId
        }
    }
`