import { redirect } from "next/navigation";

import { getUserProfile } from "@/api/handlers/users/profile";
import { ROUTES } from "@/utils/constants/routes";

import { LoginForm } from "./component/LogInForm";

export default async function LoginPage() {
  const user = await getUserProfile().catch(() => null);

  if (user?.data.user) redirect(ROUTES.GAMES);

  return <LoginForm />;
}
