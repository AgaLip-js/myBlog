import React, { useState, useRef } from "react";
import { usePopper } from "react-popper";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { useCloseOutsideClick } from "../../hooks/useCloseOutsideClick";

const PopperContainer = styled.div`
    border-radius: 100px;
    background-color: white;
    padding: 10px;
    text-align: center;
    z-index: 100;
    /* border: 1px solid lightgray; */
    box-shadow: 0 0 0 1px rgb(119 116 116 / 25%), 1px 4px 6px 1px rgb(53 53 53 / 17%);
    ${({ arrow }) => arrow
        && css`
            #arrow {
                position: absolute;
                width: 10px;
                height: 10px;
                &:after {
                    content: " ";
                    background-color: gray;
                    position: absolute;
                    left: 0;
                    top: -25px;
                    transform: rotate(45deg);
                    width: 10px;
                    height: 10px;
                }
            }

            &[data-popper-placement^="top"] > #arrow {
                bottom: -30px;
                :after {
                }
            }
        `}
`;

const Popover = ({ option, arrow, children, showPopper, setShowPopper, customClick, additionalRefs }) => {
    const [arrowRef, setArrowRef] = useState(null);
    const popperRef = useRef(null);

    let components = children;
    if (!Array.isArray(children)) components = [];
    let ParentContainer;
    let PopoverBody;
    if (Array.isArray(children) && children.length) [ParentContainer, PopoverBody] = components;

    let parentProps = {
    };
    if (option === `click` && !customClick) {
        parentProps = {
            onClick: () => {
                setShowPopper(!showPopper);
            },
        };
    } else if (option === `hover`) {
        parentProps = {
            onMouseEnter: () => setShowPopper(!showPopper),
            onMouseLeave: () => setShowPopper(!showPopper),
        };
    }

    const { styles, attributes } = usePopper(ParentContainer && ParentContainer.ref ? ParentContainer.ref.current : null, popperRef.current, {
        modifiers: [
            {
                name: "arrow",
                options: {
                    element: arrowRef,
                },
            },
            {
                name: "offset",
                options: {
                    offset: [0, 10],
                },
            },
        ],
    });

    let refsToIgnoreInOutsideClick = [ParentContainer && ParentContainer.ref ? ParentContainer.ref.current : null];
    if (additionalRefs.length > 0) {
        refsToIgnoreInOutsideClick = [
            ...refsToIgnoreInOutsideClick,
            ...additionalRefs.map((e) => {
                if (e && e.current) return e.current;
                return undefined;
            }),
        ];
    }

    useCloseOutsideClick(showPopper ? popperRef : null, setShowPopper, refsToIgnoreInOutsideClick);

    if (components.length !== 2) {
        throw String("Popover must contain two components!");
    }

    if (ParentContainer && !ParentContainer.ref) {
        throw String("First component must have a reference! If this is a functional component then read about forwardRef.");
    }

    return (
        <>
            {React.cloneElement(children[0], {
                ...parentProps,
            })}
            {showPopper ? (
                <PopperContainer arrow={arrow} ref={popperRef} style={styles.popper} {...attributes.popper}>
                    <div ref={setArrowRef} style={styles.arrow} id="arrow" />
                    {PopoverBody}
                </PopperContainer>
            ) : null}
        </>
    );
};

Popover.propTypes = {
    option: PropTypes.oneOf(["hover", "click"]).isRequired,
    children: PropTypes.oneOfType([PropTypes.array]),
    arrow: PropTypes.bool,
    showPopper: PropTypes.bool,
    customClick: PropTypes.bool,
    setShowPopper: PropTypes.func,
    additionalRefs: PropTypes.oneOfType([PropTypes.array]),
};

Popover.defaultProps = {
    customClick: false,
    arrow: false,
    showPopper: false,
    additionalRefs: [],
};

export default Popover;
