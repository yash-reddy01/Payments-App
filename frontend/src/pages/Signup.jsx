import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { ButtonWarning } from "../components/ButtonWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();



    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter your information to create an account"}/>
                <InputBox onChange={(e) => {
                    setFirstName(e.target.value);
                }} label={'First Name'} placeholder="John" />
                <InputBox onChange={(e) => {
                    setLastName(e.target.value);
                }} label={'Last Name'} placeholder="Doe" />
                <InputBox onChange={(e) => {
                    setUsername(e.target.value);
                }} label={'Email'} placeholder="example@gmail.com" />
                <InputBox onChange={(e) => {
                    setPassword(e.target.value)
                }} label={'Password'} placeholder="12345" />
                <div className="pt-4">
                    <Button onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                            username,
                            password,
                            firstName,
                            lastName
                        });
                        localStorage.setItem("token", response.data.token);
                        if(response){navigate("/dashboard")}
                    }} label={'Sign up'} />
                </div>
                <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
         </div>
    </div>
}