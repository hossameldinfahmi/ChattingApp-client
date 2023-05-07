import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import "./Home.css";

function HomePage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) history.push("/chats");
  }, [history]);
  return (
    <>
      <div className="Heading">
        <img src="/logo.png" alt="" />
        <div className="text-base font-light ml-4">
          <span className="font-medium">Topson</span> Messenger{" "}
        </div>
      </div>
      <Container maxW="xl">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
          className="home-page"
        >
          <Container maxW="xl">
            <Box
              bg="white"
              p={3}
              width="100%"
              borderRadius="lg"
              borderWidth="1px"
              className="auth-box"
            >
              <Tabs variant="soft-rounded">
                <TabList mb="1em">
                  <Tab width="50%">Login</Tab>
                  <Tab width="50%">Sign Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <Signup />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </Container>
        </Box>
      </Container>
    </>
  );
}

export default HomePage;
