import { ToastNotification } from "@/components/toast/toast";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
interface Props {
  searchParams: {
    logout?: string;
    login?: string;
    error?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const session = await getServerSession(authOptions);

  const resolvedSearchParams = await searchParams;
  const { login, logout, error } = resolvedSearchParams;
  return (
    <div>
      {login && <ToastNotification message='Successfully logged in' type='success' />}
      {logout && <ToastNotification message='Successfully logged out' type='success' />}

      <main>
        <p>username: {session?.user.name}</p>
        <p>email: {session?.user.email}</p>
        
      </main>
    </div>
  );
}
