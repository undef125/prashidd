import React from 'react'

const page = () => {
  return (
    <>
    <section className='d-flex justify-content-center'  style={{ marginBottom: "20px" }}>

<div className="box1 box" style={{ height: "90vh", width: "50vw"}}>
  <div className="content row gy-5">
    <div className="image">
      <img src="https://i.postimg.cc/bryMmCQB/profile-image.jpg" alt="Profile Image" className='h-50 ' style={{ width: "300px" }}/>
    </div>
    <div className="level">
      <p>PRO</p>
    </div>
    <div className="text">
      <p className="name fs-2">Ethan Rivers</p>
      <p className="job_title fs-5">random@gmail.com</p>
      <p className="job_discription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam atque, ipsam a amet laboriosam eligendi.</p>
    </div>
    <div className="icons">
      <button>
        <ion-icon name="logo-dribbble"></ion-icon>
      </button>
      <button>
        <ion-icon name="logo-instagram"></ion-icon>
      </button>
      <button>
        <ion-icon name="logo-twitter"></ion-icon>
      </button>
      <button>
        <ion-icon name="logo-linkedin"></ion-icon>
      </button>
      <button>
        <ion-icon name="logo-facebook"></ion-icon>
      </button>
      <button>
        <ion-icon name="logo-behance"></ion-icon>
      </button>
    </div>
    <div className="button">
      <div>
        <button className="message" type="button">My events</button>
      </div>
      <div>
        <button className="connect" type="button">Edit</button>
      </div>
    </div>
  </div>
</div>


</section>

<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script></>
  )
}

export default page