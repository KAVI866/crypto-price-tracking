import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
export const Home = () => {
    const{allCoin,currency}=useContext(CoinContext)
    const[displayCoin,setdisplayCoin]=useState([]);
    const [input,setInput]=useState('');
    const inputHandler=(event)=>{
        setInput(event.target.value);
        if(event.target.value ==="")
        {
            setdisplayCoin(allCoin)
        }
    }
    const searchHandler=async(event)=>{
        event.preventDefault();
      const coins=  await allCoin.filter((item)=>{
        return item.name.toLowerCase().includes(input.toLowerCase())
        })
        setdisplayCoin(coins)
    }
    useEffect(()=>{
        setdisplayCoin(allCoin);
    },[allCoin])
  return (
    <div className='home'>
        <div className="hero">
            <h1>Crypto Marketplace</h1>
            <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos.</p>
            <form onSubmit={searchHandler}>
                <input type="text" onChange={inputHandler} list='coinlist' placeholder='Search crypto..' required value={input}/>
                <datalist id='coinlist'>
                    {
                        allCoin.map((item,index)=>(
                            <option key={index} value={item.name}/>
                        ))
                    } 
                </datalist>
                <button type='submit'>Search</button>
            </form>
        </div>
        <div className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>Coins</p>
                <p>Price</p>
                <p style={{textAlign:"center"}}>24H Change</p>
                <p className='market-cap'>Market Cap</p>
            </div>
            {
                displayCoin.slice(0,10).map((item,index)=>(
                    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div >
                           <img src={item.image} alt="" />
                           <p>{item.name + " - " +item.symbol}</p>
                        </div>
                        <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                        <p className={item.price_change_percentage_24h>0 ? "green":"red"}>
                            {Math.floor(item.price_change_percentage_24h*100)/100}
                        </p>
                        <p className='market-cap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}
