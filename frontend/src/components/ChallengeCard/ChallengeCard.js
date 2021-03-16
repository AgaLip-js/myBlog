import React, { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
margin: 4em auto;
`;
const StyledInnerContainer = styled.div`
    position: relative;
    width: 40vw;
    height: 100%;
`;
const StyledContent = styled.div`
    position: relative;
    opacity: ${({ active }) => active ? '1' : '0'};
    width: 80%;
    margin: 0 auto;
    display: ${({ active }) => active ? 'block !important' : 'none'};
    /* right: ${({ active }) => active ? '10%' : '0'}; */
    transition: .5s ease-in-out;

    &:nth-child(2) {
    /* top: 2em;
    left: 10%;
    position: absolute; */
    }


`;

const StyledCard = styled.div`
 position: relative;
    background: #fff;
    border-radius: 5px;
    padding: 2em 0;
    height: 100%;
    box-sizing: border-box;
    transition: .3s ease;
    box-shadow: 0 3px 10px -2px rgba(0,0,0,0.35);

    &:first-child {
        background: ${({ theme }) => theme.lightBackground};
        height: 8px;
        border-radius: 5px 5px 0 0;
        padding: 0;
        box-shadow: none;
        margin: 0 10px;
        height:  ${({ inActive, step }) => (inActive && step === 2) ? '0' : '8px'};
    }
`;
const StyledProgressContainer = styled.div`
        background:  ${({ theme }) => theme.borders};
        height: 6px;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-radius: 0 0 5px 5px;
`;
const StyledStep = styled.div`
        background-color: ${({ theme }) => theme.primaryBackground};
        height: 6px;
        border-radius: 0 0 5px 5px;
        width: ${({ step }) => step === 2 ? '100%' : '50%'};
        transition: .3s ease;

`;
const StyledButton = styled.div`
    color: ${({ theme }) => theme.primaryBackground};
    text-decoration: none;
    position: relative;
    cursor: ${({ active }) => active && 'pointer'};
    margin-top: 10px;
    z-index:99;
    width: fit-content;

    &::before {
        content: '';
        position: absolute;
        bottom: 1px;
        left: 0;
        width: 0%;
        border-bottom: 2px solid  ${({ theme }) => theme.primaryBackground};
        transition: 0.3s;
        z-index:99;
    }

    &:hover::before {
        width: 100%;
    }
`;

const ChallengeCard = ({ content }) => {
    const [step, setStep] = useState(1);

    return (
        content && content.length > 1
            ? (
                <StyledContainer>
                    <StyledInnerContainer>
                        <StyledCard inActive step={step} />
                        <StyledCard>
                            <StyledContent active={step === 1}>
                                <h1>Wyzwanie</h1>
                                {/* eslint-disable-next-line react/no-danger */}
                                <div dangerouslySetInnerHTML={{
                                    __html: content[0].object,
                                }}
                                />
                                <StyledButton active={step === 1} onClick={() => setStep(2)}>Zobacz odpowiedź &rarr;</StyledButton>
                            </StyledContent>
                            <StyledContent active={step === 2}>
                                <h1>Odpowiedź</h1>
                                {/* eslint-disable-next-line react/no-danger */}
                                <div dangerouslySetInnerHTML={{
                                    __html: content[1].object,
                                }}
                                />
                                <StyledButton active={step === 2} onClick={() => setStep(1)}>Powrót do wyzwania &rarr;</StyledButton>
                            </StyledContent>

                            <StyledProgressContainer>
                                <StyledStep step={step} />
                            </StyledProgressContainer>
                        </StyledCard>
                    </StyledInnerContainer>
                </StyledContainer>
            ) : (
                <p />
            )
    );
};

export default ChallengeCard;
