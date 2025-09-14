import React from 'react'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p>&copy; {new Date().getFullYear()} Food App. All Right Reserved</p>
        <div className='footer-links'>
          <a href='/home' className='footer-link'>Terms of service</a>
          <a href='/home' className='footer-link'>Privacy Policy</a>
          <a href='/home' className='footer-link'>Contact US</a>


        </div>
      </div>
    </footer>
  )
}

export default Footer