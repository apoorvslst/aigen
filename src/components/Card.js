import React from 'react'
import './Cards.css'
export default function Card({onDelete,images,onDeleteOne}) {
  const handledownload=(img,index)=>{
    const link=document.createElement('a');
    link.href=img;
    link.download=`generated-image-${index+1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div
    className="scrollspy-example p-3 rounded"
  data-bs-spy="scroll"
  data-bs-target="#card-navbar"
  data-bs-smooth-scroll="true"
  tabIndex="0"
  /*style={{ maxHeight: '70vh', overflowY: 'auto', backgroundColor: '#f8f9fa' }} */ 
    style={{backgroundColor:'lightgray',borderRadius:'10px',overflowY: 'auto',height:'80vh'}}>
    <div className='text-center mx-3'>
      {images.length > 0 && <button
        className="btn btn-danger"
        type="button"
        id="button-addon2"
        onClick={onDelete}
      >Clear All</button>}
    </div>
    <div className='d-flex flex-wrap justify-content-center'>
      {images.length===0?(
        <p className="text-muted fs-5 text-center my-3">No previously generated images</p>
      ):(
      images.map((img,index) => (
        <div className='img-cont position-relative top-0 end-0 m-2' key={index} >
        <img className='img'
              src={img}
              alt={`Generated ${index}`}
              style={{ width: '150px', height: '150px',borderRadius: '8px' }}      
            />
            <button className='down-btn btn btn-primary'
            onClick={()=>handledownload(img,index)}> 
              ↓
            </button>
            <button className='del-btn btn btn-danger btn-sm'
              onClick={()=>onDeleteOne(index)}>
                X
                </button>
            </div>
      )))}
    </div>
    </div>
  )
}
