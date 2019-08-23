import React from "react";
import styled from "styled-components";
import Type from "./Type";

const Wrapper = styled.section`
  border: solid #808080 1px;
  border-radius: 0.7rem;
  width: 170px;
  height: 170px;
  margin: 0.4rem;
`;

const CardHeading = styled.h2`
  font-size: 0.9rem;
  font-family: Arial;
`;

const PokemonNumber = styled.h3`
  font-size: 0.8rem;
  font-family: Arial;
  font-weight: lighter;
  color: #404040;
`;

const TypeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Image = styled.img`
  max-width: 75px;
`;

function PokemonCard(props) {
  return (
    <div>
      <Wrapper>
        <Image src={props.image} alt={props.name} />
        <CardHeading>{props.name}</CardHeading>
        <PokemonNumber>{props.number}</PokemonNumber>

        <TypeContainer>
          {props.types.map((type, i) => (
            <Type name={type} key={i} />
          ))}
        </TypeContainer>
      </Wrapper>
    </div>
  );
}

export default PokemonCard;
