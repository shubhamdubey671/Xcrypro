import React from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Heading,
    HStack,
    Image,
    Text,
    VStack,
  } from "@chakra-ui/react";
const CoinCart = ({ name, img, symbol, price, id,currencySymbol=" ₹ " }) => (
  <Link to={`/coin/${id}`}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s  "}
      m={"4"}
      css={{
        "&:hover": {
          transform: " scale(1.2)",
        },
      }}
    >
      <Image
        src={img}
        h={"10"}
        w={"10"}
        objectFit={"contain"}
        alt={"Exchanges"}
      />

      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </Link>
);
export default CoinCart;
