import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import background from "../../assets/background.webp";
import Button from "../atoms/Button";

const StyledWrapper = styled.div`
    display: grid;
    grid-template-columns: 400px auto;
    gap: 3%;
    padding: 30px 0;

    @media (max-width: 1200px) {
        display: flex;
        flex-direction: column;
    }


`;
const StyledTitle = styled.p`
    font-size: ${({ theme }) => theme.fontSize.l};
    font-weight: 700;
    margin: 5px 0;
`;
const StyledDateCategory = styled.p`
    font-size: ${({ theme }) => theme.fontSize.xs};
    margin-top: 0px;
`;
const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const StyledImage = styled.div`
    background: url(${({ icon }) => icon});
    height: 280px;
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

    @media (max-width: 1200px) {
        margin-bottom: 10px;
    }
`;
const StyledText = styled.div`
    font-size: ${({ theme }) => theme.fontSize.s};
    text-align: justify;
    margin: 10px 0;
    p {
        margin: 0px;
    }
`;

const PostCard = ({ date, category, id, title, content }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, [window.innerWidth]);

    const truncateTitle = () => {
        if (windowWidth > 1720) {
            return 350;
        } if (windowWidth > 1580 && windowWidth <= 1720) {
            return 300;
        } if (windowWidth > 1450 && windowWidth <= 1580) {
            return 250;
        } if (windowWidth > 1200 && windowWidth <= 1450) {
            return 200;
        }
        return 350;
    };

    const truncate = input => (input.length > 350 ? `${input.substring(0, truncateTitle())}...` : input);

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
                <StyledText
                    dangerouslySetInnerHTML={{
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
