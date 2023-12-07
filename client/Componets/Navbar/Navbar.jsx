import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
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
          <Link href="/home/detail">Detail</Link>
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
