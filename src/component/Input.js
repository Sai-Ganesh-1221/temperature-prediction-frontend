
 import React from 'react'
 import './Input.css'
 
 export default function Input(props) {
   return (
    <div className="container">
    <input
      required
      type="text"
      name={props.name}
      className="input"
      value={props.data}
      onChange={props.onChange}
    />
    <label className="label">{props.label}</label>
  </div>
   )
 }
 