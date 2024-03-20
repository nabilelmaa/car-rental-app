import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import DarkModeToggle from "./DarkModeToggle"; // Import the DarkModeToggle component

const NavBar = () => (
  <header className="w-full absolute z-10">
    <nav
      className="max-w-[1440px] bg-[#312e81] mx-auto flex justify-between items-center sm:px-16 px-6 py-3.5 bg-transparent rounded-lg"
      style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
    >
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/rahioui-logo.png"
          alt="logo"
          width={120}
          height={120}
          className="object-contain"
        />
      </Link>

      <div className="flex items-center gap-4">
        <DarkModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  </header>
);

export default NavBar;

// import Link from "next/link";
// import Image from "next/image";
// import { UserButton } from "@clerk/nextjs";

// const NavBar = () => (
//   <header className="w-full absolute z-10">
//     <nav
//       className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-3.5 bg-transparent rounded-lg"
//       style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
//     >
//       <Link href="/" className="flex justify-center items-center">
//         <Image
//           src="/rahioui-logo.png"
//           alt="logo"
//           width={120}
//           height={120}
//           className="object-contain"
//         />
//       </Link>

//       <UserButton afterSignOutUrl="/" />
//     </nav>
//   </header>
// );

// export default NavBar;

{
  /* You can conditionally render the "Sign in" button based on the user's authentication status */
}
{
  /* For example, if you want to show a different button when the user is signed in */
}
{
  /* {!user ? (
        <CustomButton
          title="Sign in"
          btnType="button"
          containerStyles="text-[#312e81] rounded-full bg-white min-w-[130px]"
        />
      ) : (
        // Render something else when the user is signed in
        <div>Custom content for signed-in user</div>
      )} */
}
