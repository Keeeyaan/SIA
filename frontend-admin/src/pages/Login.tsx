import LoginForm from "@/components/LoginForm";
import Wrapper from "@/components/Wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  return (
    <Wrapper
      title="Login"
      className="h-screen flex justify-center items-center"
    >
      <Card className="w-[400px]">
        <CardHeader>
          <div className="flex justify-center items-center gap-2 mb-2">
            {/* <img src="/logo.png" className="w-[50px] h-[50px] mb-2" /> */}
            <h1 className="font-semibold text-3xl">UCnian Guide Bot</h1>
          </div>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default Login;
