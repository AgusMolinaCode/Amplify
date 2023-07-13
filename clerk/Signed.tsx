
import { UserButton, SignedIn } from "@clerk/nextjs";

const Signed = () => {
  return (
    
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    
  );
};

export default Signed;
