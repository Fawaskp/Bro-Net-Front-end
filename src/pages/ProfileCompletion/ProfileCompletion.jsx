import React from 'react'
import Navbar from '../../components/Navbar'
import './ProfileCompletion.css'

function ProfileCompletion() {
  return (
    <>
      <Navbar />

      <main>
        <div className="main-card">
          <div className="main-card-head">
            <h4>Complete Profile</h4>
            <i className="bi bi-info-circle" style={{ color: '#6366f1' }}></i>
          </div>

          <div className="user-image-container">
            <div className="user-image"></div>
            <i className="bi bi-plus-circle-fill add-image-icon"></i>
            <div style={{ width: '100%', height: '80px' }}></div>
          </div>

          <div className="main-input-container">
            <div className="input-container">
              <input type="text" placeholder="Full name" />
              <input type="text" placeholder="Username" />
            </div>

            <div className="input-container">
              <input type="email" placeholder="E-mail" />
              <input className="date-input" type="date" placeholder="dob" />
            </div>

            <div className="input-container extra-margin">
              <select name="stack" id="">
                <option value="">Select Stack</option>
                <option value="django">Django</option>
              </select>

              <select name="education" id="">
                <option value="">Select Education</option>
                <option value="django">Django</option>
              </select>
            </div>

            <div className="input-container">
              <select name="stack" id="">
                <option value="">Select Stack</option>
                <option value="django">Django</option>
              </select>

              <select name="education" id="">
                <option value="">Select Education</option>
                <option value="django">Django</option>
              </select>
            </div>

            <div className="btn-container">
              <button className="primary-btn">Submit</button>
            </div>
          </div>
        </div>
      </main>


    </>

  )
}

export default ProfileCompletion
