import React from 'react'

const Item = (props) => {
  return (
    <div className='main_item' >
        <img src={props.img}/>
        <p className='title'>{props.title}</p>
    </div>
  )
}

export default Item