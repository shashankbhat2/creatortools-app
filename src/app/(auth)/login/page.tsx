import LoginForm from "~/components/forms/login.form";
import RegisterForm from "~/components/forms/register.form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function LoginPage() {
  return (
    <main className="my-auto flex min-h-screen flex-col items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="flex w-full flex-col">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}
