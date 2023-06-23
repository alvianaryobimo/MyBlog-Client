import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/homePage/footer";
import Axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export const DetailPage = () => {
    const params = useParams();
    const [data, setData] = useState();
    const getarticel = async (data) => {
        try {
            const response = await Axios.get(`https://minpro-blog.purwadhikabootcamp.com/api/blog/${params.id}`, data);
            setData(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getarticel();
    },);
    console.log(data);
    return (
        <>
            <Navbar />
            <Flex justifyContent={"center"}>
                <Box>
                    <Flex justifyContent={"center"}>
                        <Flex textAlign={"center"} justifyContent={"center"} mt={"100px"} rounded='md'
                            boxShadow='0px 0px 5px black'
                            bgGradient="linear(#408E91, #71B280)" w={"800px"} >
                            <Heading display={"flex"} justifyContent={"center"} fontFamily={"monospace"} fontSize={"35px"} color={"white"} lineHeight={"100px"}>MyBlog | {data?.Category.name}</Heading> <br />
                        </Flex>
                    </Flex>

                    <Flex justifyContent={"center"} >
                        <Flex justifyContent={"center"} mt={"20px"} h={"250px"} w={"800px"} bg={"white"}>
                            <Image src={`https://minpro-blog.purwadhikabootcamp.com/${data?.imageURL}`} >
                            </Image></Flex>
                    </Flex>
                    <Flex justifyContent={"center"}>
                        <Flex w={"1200px"} textAlign={"center"} fontSize={"45px"} fontWeight={"bold"} fontFamily={"monospace"} mt={"13px"} justifyContent={"center"}>
                            <Text>{data?.title}</Text>
                        </Flex>
                    </Flex>
                    <Flex fontSize={"15px"} fontFamily={"monospace"} mt={"0px"} justifyContent={"center"}>
                        <Text>by {data?.User.username}</Text>
                    </Flex>
                    <Flex justifyContent={"center"}>
                        <Flex justifyContent={"center"} mt={"20px"} rounded='md'
                            boxShadow='0px 0px 5px black'
                            bg={"white"} w={"800px"} >
                            <Flex mb={"10px"} mt={"10px"} w={"750px"} >
                                <p lineHeight={"100px"}>
                                    {data?.content}  </p>
                            </Flex>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
            <Box mt={"40px"}>
                <Footer />
            </Box>
        </>
    );
}