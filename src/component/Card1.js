import React from 'react'
import './Card1.css'

export default function Card1({detail}) {
 

  return (
    <div>

<div class="card12">
    <div class="align">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
    </div>
<img src={detail.photo} className='photo'></img>
    <h7>{detail.email}</h7><div>{detail.name}</div>
    
    <div>last login at :</div>
    <div>{detail.last}</div>
    <p>

    </p>
</div>

    </div>
  )
}
