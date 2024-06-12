import { getServerSession } from "next-auth/next";
import { authConfig } from "../configs/auth";

export default async function Profile() {
  const session = await getServerSession(authConfig);
  return (
    <>
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.image && <img src={session.user.image} alt="" />}
    </>
  );
}
