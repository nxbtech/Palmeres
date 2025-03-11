import React from 'react';
import './SubMenuTabletMobile.scss';

const SubMenuTabletMobile = () => {
  return (
    <label htmlFor="sub-menu__check" className="sub-menu-tablet-mobile hide-on-desktop">
      <label htmlFor="sub-menu__check"><i className="sub-menu__close-btn bx bx-x-circle"></i></label>
      <ul className="navbar-mobile__list">
        <li className="navbar-mobile__item"><a href="" className="navbar-mobile__link">HOME</a></li>
        <li className="navbar-mobile__item">
          <a href="" className="navbar-mobile__link">PACKAGES</a>
          <ul className="subnav-mobile__list">
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">SEARCH</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">TOUR PACKAGE</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">DESTINATION</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">TYPOLOGY</a></li>
          </ul>
        </li>
        <li className="navbar-mobile__item">
          <a href="" className="navbar-mobile__link">SHOP</a>
          <ul className="subnav-mobile__list">
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">ARCHIVE</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">SINGLE PRODUCT</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">CART</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">CHECK OUT</a></li>
          </ul>
        </li>
        <li className="navbar-mobile__item">
          <a href="" className="navbar-mobile__link">ABOUT US</a>
          <ul className="subnav-mobile__list">
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">ABOUT US 1</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">ABOUT US 2</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">ABOUT US 3</a></li>
          </ul>
        </li>
        <li className="navbar-mobile__item">
          <a href="" className="navbar-mobile__link">PAGES</a>
          <ul className="subnav-mobile__list">
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">SERVICES</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">AGENCY TOURS</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">TESTIMONIALS</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">PRICES</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">PROMOTIONS</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">FAQ</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">COMING SOON</a></li>
          </ul>
        </li>
        <li className="navbar-mobile__item">
          <a href="" className="navbar-mobile__link">NEWS</a>
          <ul className="subnav-mobile__list">
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">ARCHIVE</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">SINGLE POST</a></li>
          </ul>
        </li>
        <li className="navbar-mobile__item">
          <a href="" className="navbar-mobile__link">CONTACT</a>
          <ul className="subnav-mobile__list">
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">CONTACT 1</a></li>
            <li className="subnav-mobile__item"><a href="" className="subnav-mobile__link">CONTACT 2</a></li>
          </ul>
        </li>
        <li className="navbar-mobile__item">
          <a href="" className="navbar-mobile__link">BOOK NOW</a>
        </li>
      </ul>
    </label>
  );
};

export default SubMenuTabletMobile;