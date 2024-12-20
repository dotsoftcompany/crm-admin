import { auth } from '@/api/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export const containerClassName = 'w-full h-full p-4 xl:p-0';

function Login() {
  const { username, password } = useParams();
  console.log(username, password);

  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const signIn = () => {
    try {
      signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full xl:grid xl:grid-cols-3 h-screen overflow-hidden">
      <div className="flex items-center justify-center h-screen xl:h-auto xl:py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@gmail.com"
                required
                value={data.email}
                onChange={handleChange}
                name="email"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <Link
                  to="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link> */}
              </div>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={data.password}
                onChange={handleChange}
                name="password"
                placeholder="password"
              />
            </div>
            <Button className="w-full" onClick={() => signIn()}>
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </div>
      </div>
      <div className="hidden bg-muted xl:block col-span-2">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/crm-system-4fefe.appspot.com/o/cover%2Fcrm-cover.png?alt=media&token=611e8787-6118-454e-aa02-1372d844fe7e"
          alt="Image"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Login;
