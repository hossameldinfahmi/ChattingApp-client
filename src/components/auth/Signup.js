import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

function Signup() {
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleShowPassword = () => {
    setShow(!show);
  };

  const postImage = (pic) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      history.push("/chats");
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "jlyqolzq");
      data.append("cloud_name", "dlkayagta");
      fetch(
        "https://api.cloudinary.com/v1_1/dlkayagta/image/upload",

        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => {
          console.log(res);
          setLoading(false);
          return res.json();
        })
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        });
    } else {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    console.log(pic);
    setLoading(true);
    if (!name || !email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    console.log(name, email, password, pic);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await axios.post(
        "http://localhost:3000/api/user",
        { name, email, password, pic },
        config
      );
      console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/chat");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          onFocus={(e) => {}}
          onBlur={(e) => {}}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <InputRightElement>
            <Button
              colorScheme="gray"
              size="sm"
              onClick={() => handleShowPassword()}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="image">
        <FormLabel>Image</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            postImage(file);
          }}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        color="white"
        onClick={handleSubmit}
        style={{ marginTop: 15 }}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default Signup;
