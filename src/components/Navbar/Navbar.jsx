import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  const{setCurrency}=useContext(CoinContext);
  const currencyHandle=(event)=>{
    switch(event.target.value){
      case "usd":
        {
          setCurrency({
            name:"usd",
            symbol:"$"
          });
          break;
        }
      case "eur":
        {
          setCurrency({
            name:"eur",
            symbol:"€"
          });
          break;
        }
      case "inr":
        {
          setCurrency({
            name:"inr",
            symbol:"₹"
          });
          break;
        }
        default:
        {
          setCurrency({
            name:"usd",
            symbol:"$"
          });
          break;
        }
    }
  }
  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img className='logo' src={logo} alt="" />
      </Link>
        <ul>
          <Link to={'/'}>Home</Link>
        </ul>
        <div className='nav-right'>
          <select onChange={currencyHandle}>
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
          </select>
        </div>
    </div>
  )
}
