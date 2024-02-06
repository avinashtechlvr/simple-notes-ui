import { useState } from "react"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');

    const { toast } = useToast();

    function handleLogin() {
        // alert(`name: ${loginEmail} \n password: ${loginPassword}`);
        localStorage.setItem('accessToken', 'true');
        toast({title: 'Login Successfull', description: 'you have logged in successfully, Enjoy using the Simple Notes.'})
    }
    function handleRegister() {
        alert(`name: ${registerName} \n email: ${registerEmail} \n password: ${registerPassword}`);
    }
    return (
        <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="signup" >Sign Up</TabsTrigger>
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
                            <Input id="email" value={loginEmail} onChange={(event) => setLoginEmail(event.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)} />
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
                            <Input id="name" type="text" value={registerName} onChange={(event) => setRegisterName(event.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" value={registerEmail} onChange={(event) => setRegisterEmail(event.target.value)} />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="createPassword">Password</Label>
                            <Input id="createPassword" type="password" value={registerPassword} onChange={(event) => setRegisterPassword(event.target.value)} />
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

export default Login;