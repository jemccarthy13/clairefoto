import { Link } from "@mui/material";

/**
 * The Header component renders the title and navigation bar,
 * displayed at the top of every web page.
 *
 * @returns JSX.Element for the header.
 */
export default function Header(): JSX.Element {
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
