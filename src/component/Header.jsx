import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, Button, useDisclosure,VStack,
    HStack
} from '@chakra-ui/react';

import { Link } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi"

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button pos={"fixed"}
                top={"4"} 
                left={"4"} 
                zIndex={"overlay"}
                colorScheme={"purple"} 
                p={'0'}
                h={'10'} 
                w={'10'}
                borderRadius={"full"}
                onClick={onOpen}
            >
            <BiMenuAltLeft size={"20"} />
            </Button>


            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>CRYPTO APP</DrawerHeader>
                    <DrawerBody>
                        <VStack alignItems={"flex-start"} >
                            <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                                <Link to ={"/"} >Home</Link>
                            </Button>
                            <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                                <Link to ={"/exchanges"} >Exchanges</Link>
                            </Button>
                            <Button onClick={onClose} variant={"ghost"} colorScheme={"purple"}>
                                <Link to ={"/coins"} >Coins </Link>
                            </Button>
                        </VStack>
                      
                    </DrawerBody>   
                </DrawerContent>
        
            </Drawer>
        </>
    )
};

export default Header;
