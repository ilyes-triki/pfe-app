import React from 'react';
import './Footer.css';
import {
  FacebookFilled,
  LinkedinFilled,
  YoutubeFilled,
  InstagramFilled,
} from '@ant-design/icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Acuity Brands, Inc. All rights reserved.</p>
        <a href="#">Site Terms</a>
        <a href="#">Privacy Statement</a>
        <a href="#">Do Not Sell or Share My Personal Information</a>
        <a href="#">Exercise My Rights</a>
      </div>
      <div className="footer-social">
        <a href="#">
          <FacebookFilled />
        </a>
        <a href="#">
          <LinkedinFilled />
        </a>
        <a href="#">
          <YoutubeFilled />
        </a>
        <a href="#">
          <InstagramFilled />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
