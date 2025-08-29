import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router";
function Header() {
  return (
    <div className="navbar min-h-20 p-3  flex gap-2 items-center justify-between ">
      <div className="logo">Messaging app</div>
      <div className="flex  justify-items-center gap-2">
        <ModeToggle />
        <Link to="/">
          <Button variant={"outline"}>Home</Button>
        </Link>
        <Link to="/signup">
          <Button>Get started</Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
