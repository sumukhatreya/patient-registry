import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { usePGlite } from '@electric-sql/pglite-react';
import { retrieveEntry, updateEntry, deleteEntry } from "../services/db";
import Error from "./Error";

const PatientDetails = () => {
    const db = usePGlite();
    const navigate = useNavigate();
    const { id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("female");
    const [doctor, setDoctor] = useState("");
    const [isDeleting, setDeleting] = useState(false);
    const [isUpdating, setUpdating] = useState(false);
    const [isFormError, setFormError] = useState(false);
    const [isFormLoading, setFormLoading] = useState(false);
    const [isPageError, setPageError] = useState(false);
    const [isPageLoading, setPageLoading] = useState(true);

    useEffect(() => {
      const fetch = async () => {
        const info = await retrieveEntry(db, 'registry', id);
        const {
          first_name,
          last_name,
          date_of_birth,
          email,
          gender,
          primary_physician,
        } = info[0];
        setFirstName(first_name);
        setLastName(last_name);
        setDob(new Date(date_of_birth).toISOString().split('T')[0]);
        setEmail(email);
        setGender(gender.toLowerCase());
        setDoctor(primary_physician);
      };

      fetch()
        .then((res) => setPageLoading(false))
        .catch((res) => setPageError(true));
    }, []);

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        setFormLoading(true);
        if (isUpdating) {
          const values = [
            firstName,
            lastName,
            dob,
            email,
            gender,
            doctor,
          ];
          await updateEntry(db, 'registry', values, id);
        } else if (isDeleting) {
          await deleteEntry(db, 'registry', id);
        }
        
        setFormLoading(false);
        navigate('/patients');
      } catch (err) {
        setFormLoading(false);
        setFormError(true);
        console.log(err);
      }
    };

    if (isPageError) {
        return (
            <div>
                <Error />
            </div>
        );
    }

    if (!isPageLoading) {
        return (
          <div className='create'>
            <form onSubmit={handleSubmit}>
              <label>First name</label>
              <input
                type='text'
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Last name</label>
              <input
                type='text'
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label>Date of birth</label>
              <input
                type='date'
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
              <label>Patient email</label>
              <input
                type='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value='female'>Female</option>
                <option value='male'>Male</option>
                <option value='other'>Other</option>
              </select>
              <label>Primary physician</label>
              <input
                type='text'
                required
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              />
              <div className='button-container'>
                <button
                  className='update-button'
                  disabled={isFormLoading}
                  onClick={() => setUpdating(true)}
                >
                  Update
                </button>
                <button
                  className='delete-button'
                  style={{ backgroundColor: "#e74c3c" }}
                  disabled={isFormLoading}
                  onClick={() => setDeleting(true)}
                >
                  Delete
                </button>
              </div>
            </form>
            {isFormError && (
              <div>
                <p style={{ color: '#ff0000' }}>
                  Something went wrong. Opertaion failed.
                </p>
              </div>
            )}
          </div>
        );
    }

    
}

export default PatientDetails;