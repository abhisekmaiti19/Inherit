import { Center, Heading, Text } from "@chakra-ui/react"
import { useContext } from "react"
import GlobalContext from "../Store/GlobalContext"

const Home = () => {
  return (
    <>
        <Center flexDirection={'column'} gap={5} w={'100%'} pt={5}>
            <Heading>
                Home Component Toiri nei
            </Heading>
            <Text>Login Tep</Text>
            <Text>Okhane Signup tep</Text>
            <Text></Text>
        </Center>
    </>
  )
}

export default Home