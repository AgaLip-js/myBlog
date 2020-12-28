import moment from "moment-timezone";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import background from "../../assets/background.webp";
import Button from "../atoms/Button";

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: 400px auto;
    gap: 5%;
    padding: 30px 0;
`;
const StyledTitle = styled.p`
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: 700;
    margin-top: 5px;
`;
const StyledDateCategory = styled.p`
    font-size: ${({ theme }) => theme.fontSize.xs};
`;
const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledImage = styled.div`
    background: url(${({ icon }) => icon});
    width: 400px;
    height: 250px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.2), 0 22px 27px -20px rgba(7, 10, 25, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
    :hover {
        opacity: 1;
        box-shadow: 0 15px 45px -5px rgba(7, 10, 25, 0.25);
        -webkit-filter: brightness(1.07);
        filter: brightness(1.07);
        transform: translate(0, -2px);
    }
`;
const StyledText = styled.div`
    font-size: ${({ theme }) => theme.fontSize.s};
    text-align: justify;

`;

const PostCard = ({ date, category, id, title, content }) => {
    const truncate = input => (input.length > 350 ? `${input.substring(0, 350)}...` : input);

    const newDate = moment(date).format("DD/MM/YYYY");

    const mainContent = content.find(ct => ct.type === "text").object;
    return (
        <StyledWrapper>
            <StyledImage icon={background} />
            <StyledContent>
                <StyledDateCategory>
                    {newDate}
                    {' '}
                    -
                    {category}
                </StyledDateCategory>
                <StyledTitle>{title}</StyledTitle>
                {/* eslint-disable-next-line react/no-danger */}
                <StyledText dangerouslySetInnerHTML={{
                    __html: truncate(mainContent),
                }}
                />
                <Link
                    to={`/post/${id}`}
                    style={{
                        width: "fit-content",
                    }}
                >
                    <Button>Czytaj więcej</Button>
                </Link>
            </StyledContent>
        </StyledWrapper>
    );
};
export default PostCard;
