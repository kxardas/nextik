import { ToastNotification } from "@/components/toast/toast";
interface Props {
  searchParams: {
    logout?: string;
    login?: string;
    error?: string;
  };
}

export default async function Home({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const { login, logout, error } = resolvedSearchParams;
  return (
    <div>
      {login && <ToastNotification message='Successfully logged in' type='success' />}
      {logout && <ToastNotification message='Successfully logged out' type='success' />}
    </div>
  );
}
