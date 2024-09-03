import { auth, signOut } from "@/auth";
import { Button } from "@nextui-org/react";
import { FaRegSmile } from "react-icons/fa";

export default async function Home() {
  const session = await auth()
  return (
    <main>
      <form action={async () => {
        'use server'

        await signOut()
      }}>
        <Button
          type="submit"
          color="primary"
          variant="bordered"
          startContent={<FaRegSmile size={20} />}>
          Click me
        </Button>
      </form>
    </main>
  );
}
