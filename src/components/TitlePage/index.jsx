import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import './style.css';

export const TitlePage = () => {
  const [name, setName] = useState(localStorage.getItem("userName") || "")
  const [error, setError] = useState(false)
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName")

  // localStorage.clear()
  // localStorage.removeItem()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (name.trim()){
      localStorage.setItem("userName", name.trim())
      navigate("/HomePage")
    } else {
      setError(true)
    }
  }

  return(
    <div className="title-page">
      <div className="title-page__header">
        <h1>Welcome {userName && ` back, ${userName}!`}</h1>
        <p>Track your spending</p>
        <p>Pay what's fair</p>
      </div>

      { !userName
      ?
        <form onSubmit={handleSubmit}>
          <div className="title-page__name">
            <label>zadejte uživatelské jméno</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            <p className="error-text">{error && "Jméno musí být vyplněné"}</p>
          </div>
          <button type="submit" className="title-page__button">Start Spending</button>
        </form>
      :
        <Link to="/HomePage" className="title-page__button">Start Spending</Link>
      }
    </div>
  )
}
