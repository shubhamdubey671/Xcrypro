import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../index";
import {
  Container,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
  const [exchange, setExchange] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchExchange = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        console.log(data);
        setExchange(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchExchange();
  }, []);

  if (error)
    return (
      <ErrorComponent message={"Error while fethcing exchanges requests"} />
    );
  
  return (
    <Container maxW={"95%"} >
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchange.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const ExchangeCard = ({ name, img, rank, url, id }) => (
  <a href={url} target={"blank"}>
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
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
