import Link from "next/link";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>
        <Link href="/home">POKEMON</Link>
      </h1>
      <ul>
        <li>
          <Link href="/home">Home</Link>
        </li>
        <li>
          <Link href="/home/create">Create</Link>
        </li>
        <li>
          <Link href="/home/user">User</Link>
        </li>
        <li>
          <Link href="/home/favorite">Favorite</Link>
        </li>
        <li>
          <Link href="/home/about">About</Link>
        </li>
        <li>
          <Link href="/">Salir</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
