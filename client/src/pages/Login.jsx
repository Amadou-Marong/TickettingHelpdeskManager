
import { useState } from "react";
import { LogIn, Mail, Lock } from "lucide-react";
// import Input from "../components/ui/input";
import Button from "../components/ui/Button";
import Label from "../components/ui/Label";
import { Input } from "../components/ui/input";
// import { Link } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with", email, password);
    };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-gray-700">Login</h2>
        <p className="text-gray-400 text-sm font-semibold">Enter your email and password to access your account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input type="password" value={password} id="password" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <Button type="submit">Submit</Button>
          <p className="text-center text-gray-600 text-sm cursor-pointer hover:text-blue-500">
            {/* Don't have an account? <Link to="/register" className="text-blue-500">Sign up</Link> */}
            Don't have an account? <span to="/register" className="text-blue-500">Sign up</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
