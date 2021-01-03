import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled, { css } from "styled-components";

const PositionButton = styled.button`
    display: flex;
    > svg {
        font-size: ${({ iconHeight }) => iconHeight};
        ${({ iconWidth }) => iconWidth && `width: ${iconWidth} !important;`};
        margin: auto;
    }
    ${({ icon, iconPosition }) => {
        if (icon) {
            if (iconPosition === "right") {
                return css`
                    flex-direction: row-reverse;
                    > p {
                        margin: auto;
                        margin-right: 5px;
                    }
                `;
            }
            if (iconPosition === "top") {
                return css`
                    flex-direction: column;
                    > p {
                        margin: auto;
                        margin-top: 5px;
                    }
                `;
            }
            if (iconPosition === "bottom") {
                return css`
                    flex-direction: column-reverse;
                    > p {
                        margin: auto;
                        margin-bottom: 5px;
                    }
                `;
            }
            return css`
                flex-direction: row;
                > p {
                    margin: auto;
                    margin-left: 5px;
                }
            `;
        }
        return css``;
    }}
`;

const StyledButtonNoHover = styled(PositionButton)`
    width: fit-content;
    height: fit-content;
    padding: 5px;
    margin: auto;
    outline: none;
    cursor: pointer;
    background: none;
`;

const NoBorderButton = styled(StyledButtonNoHover)`
    border: none;
    display: flex;
`;

const ButtonIconTitle = ({ icon, iconSize, color, iconTransform, title }) => (
    <>
        {icon && <FontAwesomeIcon color={color} icon={icon} size={iconSize} transform={iconTransform} />}
        {title && (
            <p sizeType="body" size="m">
                {title}
            </p>
        )}
    </>
);

const IconButton = ({ ...props }) => (
    <NoBorderButton {...props}>
        <ButtonIconTitle {...props} />
    </NoBorderButton>
);

export default IconButton;
