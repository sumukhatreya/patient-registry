import { Link } from "react-router";

const PatientList = ({ entries, title }) => {
    return (
      <div className='entry-list'>
        <h2>{title}</h2>
        {entries.map((entry) => (
          <div className='entry-preview' key={entry.id}>
            <Link to={`/patients/${entry.id}`}>
              <h5>Patient name:</h5>
              <h2>
                {entry.first_name} {entry.last_name}
              </h2>
              <h5>Primary physician:</h5>
              <h2>{entry.primary_physician}</h2>
              <h5>Registration date:</h5>
              <h4>
                {new Date(entry.registration_date).toISOString().split('T')[0]}
              </h4>
            </Link>
          </div>
        ))}
      </div>
    );
}

export default PatientList;