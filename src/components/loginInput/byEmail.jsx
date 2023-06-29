import { Box, Button, Flex, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Field, ErrorMessage, Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { setValue } from "../../redux/userSlice";

export const LoginbyEmail = () => {
    const toast = useToast();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const [success, setSuccess] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const loginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email addres format")
            .required("Email is required"),
        password: Yup.string()
            .matches(/^(?=.[A-Z])/, "Password Must Contain 1 Capital")
            // .matches(/^(?=.(\W|_))/, "Password Must Contain 1 Symbol")
            .required("Password is required")
    });

    const handleSubmit = async (data1) => {
        try {
            const response = await Axios.post("https://minpro-blog.purwadhikabootcamp.com/api/auth/login", data1);
            console.log(response.data.isAccountExist);
            dispatch(setValue(response.data.isAccountExist));
            localStorage.setItem("token", response.data.token);
            setSuccess(true);
            toast({
                title: "Welcome!",
                description: "Login Succses!",
                status: 'success',
                duration: 2500,
                isClosable: true,
                position: "top"
            });
            setTimeout(() => {
                navigate("/");
            }, 1000)
            console.log(data1);

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(value, action) => {
                handleSubmit(value);
                if (success) {
                    action.resetForm();
                }
            }}>
            {(props) => {
                return (
                    <Box as={Form}>
                        <Flex justifyContent={"center"}>
                            <VStack>
                                <Field as={Input} name="email" color={"black"} borderRadius={"20px"} border={"2px solid"}
                                    justifyContent={"center"} borderColor={"#408E91"}
                                    w={"400px"} placeholder="Email" size={"md"} />
                                <ErrorMessage
                                    component="box"
                                    name="email"
                                    style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
                            </VStack>
                        </Flex>
                        <Flex mt={"20px"} justifyContent={"center"}>
                            <VStack display={"flex"} justifyContent={"center"}>
                                <Field as={Input} name="password" left={"15px"} borderRadius={"20px"} border={"2px solid"}
                                    justifyContent={"center"} borderColor={"#71B280"}
                                    w={"400px"} placeholder="Password" size={"md"} type={show ? 'text' : 'password'} />
                                <ErrorMessage
                                    component="box"
                                    name="password"
                                    style={{ color: "red", marginLeft: "30px", marginBottom: "-18px", marginTop: "-8px" }} />
                            </VStack>
                            <Button onClick={handleClick} right={"25px"} variant={"unstyled"} mt={"3px"} size='sm'>
                                {show ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </Flex>
                        <Link to="/forgotPassword">
                            <Text mt={"5px"}
                                color={"blue.400"} _hover={{ color: "blue.600" }} fontSize={"10px"} fontStyle={"inherit"}> Forgot Password?</Text>
                        </Link>
                        <Flex mt={"30px"} justifyContent={"center"}>
                            <Button isDisabled={!props.dirty} type="submit" fontFamily={"monospace"} boxShadow='0px 0px 6px black' color={"white"} bgGradient="linear(#71B280, #408E91)" w={"200px"}>
                                Login
                            </Button>
                        </Flex>
                    </Box>
                );
            }}
        </Formik>
    );
}