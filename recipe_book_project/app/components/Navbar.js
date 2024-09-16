export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <img
            class="profilephoto"
            src="https://static.vecteezy.com/system/resources/previews/014/554/760/original/man-profile-negative-photo-anonymous-silhouette-human-head-businessman-worker-support-illustration-vector.jpg"
            width="50px"
          />
        </li>
        <li>
          <img src="https://i.postimg.cc/2jv0gV3B/logo2.png" width="230px" />
        </li>
        <li>
          <input type="text" placeholder="Buscar..." class="searchbar" />
        </li>
      </ul>
    </nav>
  );
}
