import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const user = {
    username: '',
    password: ''
  }
  const navigate = useNavigate()
  const [loginForm, setLoginForm] = useState(false)
  const [formData, setFormData] = useState(user)
  const handleInput = (e) => {
    const { name, value } = e.target
    setFormData((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        'https://shy-pink-boa-sari.cyclic.app/user/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      )

      if (response.ok) {
        const data = await response.json()
        console.log(data)
        localStorage.setItem('token', data)
        navigate('/catalogue')

      } else {
        const loginResponse = await response.json()
        console.log('res', loginResponse)

        console.error('Login failed')
      }
    } catch (error) {
      console.error('An error occurred during login:', error)
    }
  }
  return (
    <div className="loginPageContainer">
      {!loginForm ? (
        <div className="loginBox">
          <h2 className="loginH2">User Type</h2>
          <div className="loginButtonContainer">
            <button
              className="loginButton"
              onClick={() => navigate('/catalogue')}
            >
              Guest
            </button>
            <button
              className="loginButton"
              onClick={() => setLoginForm(!loginForm)}
            >
              Admin
            </button>
          </div>
        </div>
      ) : (
        <div className="loginBox">
          <h2 className="loginH2">Login</h2>
          <label htmlFor="username"> Please enter username</label>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleInput}
              className="loginInput"
              placeholder="Username"
              type="text"
              name="username"
              value={formData.username}
            />
            <label htmlFor="password"> Please enter password</label>
            <input
              onChange={handleInput}
              className="loginInput"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              //   onChange={handleInput}
            />
          <div className="buttonContainer">
            <button
              className="deleteButton"
              onClick={() => {
                setLoginForm(!loginForm)
                setFormData(user)
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="deleteButton"
              disabled={formData.username === '' || formData.password === ''}
            >
              Login
            </button>
          </div>
          </form>
        </div>
      )}
    </div>
  )
}
export default Login
