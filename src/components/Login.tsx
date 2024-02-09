import { useEffect, useState } from "react";
import axios from "axios";
import qs from 'qs';

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { useLoadingStore } from "stores/useLoadingStore";
import LoadingModal from "./Loading";

interface LoginProps {
    loginHandler: () => void
}
interface ValidationErrors {
    email: string;
    password: string;
    isValid: boolean;
}
interface ValidationRegisterErrors {
    name: string;
    email: string;
    password: string;
    isValid: boolean;
}


const Login: React.FC<LoginProps> = ({ loginHandler }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [errors, setErrors] = useState<ValidationErrors>({ email: '', password: '', isValid: true });
    const [registerErrors, setRegisterErrors] = useState<ValidationRegisterErrors>({ name: '', email: '', password: '', isValid: true });

    // const [isLoading, setIsLoading] = useState(false);
    const { isLoading, toggleLoading } = useLoadingStore();
    const { toast } = useToast();
    const [tabValue, setTabValue] = useState("login");

    useEffect(() => {
        if (tabValue == "signup") {
            setLoginEmail("");
            setLoginPassword("");
            setErrors({ email: '', password: '', isValid: true });
        } else {
            setRegisterEmail("");
            setRegisterName("");
            setRegisterPassword("");
            setRegisterErrors({ name: '', email: '', password: '', isValid: true })
        }
    }, [tabValue]);

    const validateCredentials = (email: string, password: string): ValidationErrors => {
        let errors: ValidationErrors = {
            email: '',
            password: '',
            isValid: true,
        };

        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            errors.email = 'Email cannot be empty.';
            errors.isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            errors.email = 'Please enter a valid email address.';
            errors.isValid = false;
        }

        if (!password) {
            errors.password = 'Password cannot be empty.';
            errors.isValid = false;
        }
        return errors;
    }
    const validateRegisterCredentials = (email: string, password: string, name: string): ValidationRegisterErrors => {
        let errors: ValidationRegisterErrors = {
            name: '',
            email: '',
            password: '',
            isValid: true,
        };
        const trimmedName = name.trim();
        if (!trimmedName) {
            errors.name = 'Name cannot be empty.';
            errors.isValid = false;
        }
        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            errors.email = 'Email cannot be empty.';
            errors.isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
            errors.email = 'Please enter a valid email address.';
            errors.isValid = false;
        }

        if (!password) {
            errors.password = 'Password cannot be empty.';
            errors.isValid = false;
        }
        return errors;
    }
    async function handleLogin() {
        toggleLoading(true);
        const validationErrors = validateCredentials(loginEmail, loginPassword);
        setErrors(validationErrors);
        if (errors.isValid && loginEmail != "" && loginPassword != "") {
            try {
                const response = await axios.post('https://simplenotes-rc6n6dj1.b4a.run/user/login',
                    qs.stringify({ username: loginEmail, password: loginPassword }),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                );
                // console.log('Response', response);
                if (response.status != 200) {
                    throw new Error(response.data.detail);
                }
                //toast({ title: 'Login Successful', description: 'You have been logged in successfully, Enjoy using the Simple Notes.' })

                localStorage.setItem('accessToken', response.data.access_token);
                const isLoggedIn = true;
                if (!isLoggedIn) {
                    toggleLoading(false);
                    throw new Error('Failed to fetch user data');
                }
                // TODO : set loading screen
                // setTimeout(() => setProgressValue(70), 3000);
                toggleLoading(false);
                loginHandler();

            } catch (error: unknown) {
                toggleLoading(false);
                let mes = `${error}`
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        let detail = error.response.data;
                        // console.log(detail)
                        mes = detail.detail;
                    }
                }
                toast({ title: 'Login Error', description: mes })
                console.log(`Login Error: ${error}`);
            }
        } else {
            toggleLoading(false);
        }
    }
    async function handleRegister() {
        const validationErrors = validateRegisterCredentials(registerEmail, registerPassword, registerName);
        setRegisterErrors(validationErrors);
        if (registerErrors.isValid && registerName != "") {
            try {
                const response = await axios.post('https://simplenotes-rc6n6dj1.b4a.run/user/register',
                    { name: registerName, email: registerEmail, password: registerPassword });
                // console.log('Response', response);
                setRegisterEmail('');
                setRegisterName('');
                setRegisterPassword('');
                toast({
                    title: 'Registered Successfully',
                    description: 'Try logging in using registered email and password!!!'
                });

            } catch (error: unknown) {
                let mes = `${error}`
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        let detail = error.response.data;
                        // console.log(detail)
                        mes = detail.detail;
                    }
                }
                toast({ title: 'Register Error', description: mes })
                console.log(`Register Error: ${error}`);
            }
        }

    }
    if (isLoading) {
        return <LoadingModal />
    } else {
        return (
            <Tabs defaultValue={tabValue} className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" onClick={() => setTabValue("login")}>Log In</TabsTrigger>
                    <TabsTrigger value="signup" onClick={() => setTabValue("signup")}>Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Login to your account using registered email and password.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">

                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} />
                                {errors.email != "" && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} />
                                {errors.password != "" && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleLogin}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Sign Up</CardTitle>
                            <CardDescription>
                                Fill the form and hit the signup button to get started...
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" value={registerName} onChange={(event) => setRegisterName(event.target.value)} className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} />
                                {registerErrors.name != "" && <p className="mt-2 text-sm text-red-600">{registerErrors.name}</p>}

                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={registerEmail} onChange={(event) => setRegisterEmail(event.target.value)} className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} />
                                {registerErrors.email != "" && <p className="mt-2 text-sm text-red-600">{registerErrors.email}</p>}

                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="createPassword">Password</Label>
                                <Input id="createPassword" type="password" value={registerPassword} onChange={(event) => setRegisterPassword(event.target.value)} className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`} />
                                {registerErrors.password != "" && <p className="mt-2 text-sm text-red-600">{registerErrors.password}</p>}

                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleRegister} >Sign Up</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        );
    }

}

export default Login;