import { getServerSession } from "next-auth/next";
import { authConfig } from "../configs/auth";
import Image from "next/image";

export default async function Profile() {
  const session = await getServerSession(authConfig);
  return (
    <>
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.image && (
        <Image src={session.user.image} alt="Photo" width={40} height={40} />
      )}
    </>
  );
}
