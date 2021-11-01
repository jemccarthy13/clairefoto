import { Link } from "@mui/material";

export default function Header() {
  return (
    <div className="my-header">
      <div style={{ float: "right" }}>
        <Link href="/#/signin" underline={"hover"}>
          Sign In
        </Link>
      </div>
      <div>
        <header className="centerText">Claire-Marie</header>
        <h2 className="centerText h2-compressed">Photography | Fotografie</h2>
      </div>
      <div className="centerText linkbar">
        <Link href="/#/" underline="hover">
          Home
        </Link>
        <Link href="/#/couples" underline="hover">
          Couples
        </Link>
        <Link href="/#/maternity" underline="hover">
          Maternity
        </Link>
        <Link href="/#/family" underline="hover">
          Family
        </Link>
        <Link href="/#/portraits" underline="hover">
          Portraits
        </Link>
        <Link href="/#/pricing" underline="hover">
          Pricing
        </Link>
        <Link href="/#/contact" underline="hover">
          Contact
        </Link>
      </div>
    </div>
  );
}
