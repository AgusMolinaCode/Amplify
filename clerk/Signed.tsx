
import { UserButton, SignedIn } from "@clerk/nextjs";

const Signed = () => {
  return (
    
      <SignedIn>
        <UserButton afterSignOutUrl="https://amplify-eight.vercel.app/" />
      </SignedIn>
    
  );
};

export default Signed;
