import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
   <div>
    <UserButton afterSignOutUrl="/" />
    <h1>Welcome to My App</h1>
   </div>
  );
}
