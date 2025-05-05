import { useState } from "react";
import { useNavigate } from "react-router";
import { usePGlite } from '@electric-sql/pglite-react';
import { addEntry } from "../services/db";

const PatientRegister = () => {
    const db = usePGlite();
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDob] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("female");
    const [doctor, setDoctor] = useState("");
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const currDate = new Date().toISOString().split('T')[0]
        const values = [
          firstName,
          lastName,
          dob,
          email,
          gender,
          doctor,
          currDate
        ];
        setLoading(true);
        await addEntry(db, 'registry', values);
        setLoading(false);
        navigate('/patients');
      } catch (err) {
        setLoading(false);
        setError(true);
        console.log(err);
      }
    };

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
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
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
          <button disabled={isLoading}>Register</button>
        </form>
        {isError && (
          <div>
            <p style={{ color: '#ff0000' }}>
              Something went wrong. Registration failed.
            </p>
          </div>
        )}
      </div>
    );
}

export default PatientRegister;