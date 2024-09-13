import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><img className="profilephoto"
          src="https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
          width="50px"/></li>
        <li><img src="https://i.postimg.cc/2jv0gV3B/logo2.png" width="230px"/></li>
        <li><input type="text" placeholder="Buscar..." className="searchbar"/></li>
      </ul>
    </nav>
  );
};

export default Navbar;