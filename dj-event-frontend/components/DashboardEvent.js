// Dependencies
import Link from 'next/link'

// Components

// Style
import styled from 'styled-components'

// Icon
import {FaPencilAlt, FaTimes} from 'react-icons/fa'

const DashboardEvent = ({evt, handleDelete}) => {
  return (
    <Event>
      <h4>
        <Link href={`/events/${evt.slug}`}>
          <a>{evt.name}</a> 
        </Link>
      </h4>
        <Link href={`/events/edit/${evt.id}`}>
          <EventEdit>
            <FaPencilAlt/>
            <span> Edit Events</span>
          </EventEdit>
        </Link>
        <EventDelete onClick={() => handleDelete(evt.id)}>
          <FaTimes />
          <span> Delete</span>
        </EventDelete>
    </Event>
  )
}

export default DashboardEvent

const Event = styled.div`
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px #ddd solid;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  h4{
    margin-bottom: 10px;
    flex: 2;
  }
`;

const EventEdit = styled.div`
  margin: 10px;
  cursor: pointer;
  `;

const EventDelete = styled.div`
  cursor: pointer;
  margin: 10px;
  color: red;
`;
