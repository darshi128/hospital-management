import React from 'react'

const Biography = ({ imageUrl }) => {
  return (
    <div className='container biography'>
      <div className='banner'>
      <img src={imageUrl} alt="aboutimg" />
      </div>
      <div className='banner'>
        <p>Biography</p>
        <h3>Who we are</h3>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, perspiciatis. Vero quaerat quibusdam repellat magnam illo hic cupiditate minus totam laborum dolores, nobis possimus rerum?</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur praesentium quam necessitatibus, recusandae expedita eius!</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p>Lorem, ipsum dolor.</p>
      </div>
    </div>
  )
}

export default Biography