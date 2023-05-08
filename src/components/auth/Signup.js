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
  FormErrorMessage,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

import "./signup.css";

function Signup() {
  const toast = useToast();
  const { setUser } = ChatState();

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [picError, setPicError] = useState("");
  const history = useHistory();

  const handleShowPassword = () => {
    setShow(!show);
  };

  const postImage = (pic) => {
    setLoading(true);

    if (!pic) {
      setPicError("Please select an image.");
      setLoading(false);
      return;
    }

    if (pic.size > 1 * 1024 * 1024) {
      setPicError(
        "Image size is too large. Please select an image that is smaller than 1MB."
      );
      setLoading(false);
      return;
    }

    if (pic.type !== "image/jpeg" && pic.type !== "image/png") {
      setPicError("Please select a valid image file (JPEG or PNG).");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "jlyqolzq");
    data.append("cloud_name", "dlkayagta");
    fetch("https://api.cloudinary.com/v1_1/dlkayagta/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => {
        setLoading(false);
        return res.json();
      })
      .then((data) => {
        setPic(data.url.toString());
        setLoading(false);
        toast({
          title: "Image uploaded successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state variables
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setPicError("");

    // Input validation
    if (!name.trim()) {
      setNameError("Please enter your name.");
      return;
    }

    if (pic.size > 1 * 1024 * 1024) {
      setPicError(
        "Image size is too large. Please select an image that is smaller than 1MB."
      );
      setLoading(false);
      return;
    }
    if (!email.trim()) {
      setEmailError("Please enter your email.");
      return;
    }

    if (name.length < 3) {
      setNameError("Name must be at least 3 characters long.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (password.length < 3) {
      setPasswordError("Password must be at least 3 characters long.");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Please enter a password.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const data = await axios.post(
        "https://topson-messenger.onrender.com/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // Clear input fields
      setName("");
      setEmail("");
      setPassword("");
      setPic("");

      setLoading(false);
      history.push("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Registration Failed",
        description: error.response.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired isInvalid={nameError}>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <FormErrorMessage>{nameError}</FormErrorMessage>
      </FormControl>
      <FormControl id="email" isRequired isInvalid={emailError}>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          onFocus={(e) => {}}
          onBlur={(e) => {}}
          value={email}
        />
        <FormErrorMessage>{emailError}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" isRequired isInvalid={passwordError}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            value={password}
          />
          <InputRightElement></InputRightElement>
        </InputGroup>
        <FormErrorMessage>{passwordError}</FormErrorMessage>
      </FormControl>
      <FormControl id="image" isInvalid={picError}>
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
        <FormErrorMessage>{picError}</FormErrorMessage>
      </FormControl>
      <Button
        className="singupBTN"
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
