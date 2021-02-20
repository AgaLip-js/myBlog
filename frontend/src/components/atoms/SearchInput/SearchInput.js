import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import history from "../../../templates/history";
import { clearCategory, handleSearchValue } from "../../../redux/actions/globalActions";

const StyledInputContainer = styled.div`
    position:relative;
    float: right;
    margin-right:  ${({ secondary }) => secondary ? '20px' : '0px'};
    :hover > input {
      width: 100%;
    }
    @media (max-width: 900px) {

    margin-right: 6rem;
  }

    display: ${({ secondary }) => secondary ? 'none' : 'block'};
    @media (max-width: 1200px) {
    display: ${({ secondary }) => secondary ? 'block' : 'none'};
    }

`;
const StyledButtonIcon = styled.button`
    position:absolute;
    top:0;
    right:0;
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.primaryBackground};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease;
    border: 1px solid ${({ theme }) => theme.borders};
    :hover {
      background: #92b0c7;

    }
    :active {
      color:${({ theme }) => theme.lightBackground};
    }
`;

const StyledSearchInput = styled.input`
    width: ${({ primary }) => primary ? '0px' : '0px'};
    outline: none;
    display: block;
    border: 1px solid ${({ theme }) => theme.borders};
    box-sizing: border-box;
    padding: ${({ primary }) => primary ? '11.5px 12px' : '11.5px 19px'};
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-left-radius: ${({ secondary }) => secondary ? '20px' : '5px'};
    border-bottom-left-radius:${({ secondary }) => secondary ? '20px' : '5px'};
    background:none;
    transition: all 0.4s ease;
    background: white;
    :focus {
    width: 100%;
    }
    float: right;
  @media (max-width: 350px) {
    font-size: 12px;
  }

  color: ${({ theme }) => theme.primaryText};

  ::placeholder {
      color: ${({ theme }) => theme.primaryTitle};
  }
`;
const SearchIcon = {
    color: "#fff",
    cursor: "pointer",
    backgroundColor: "transparent",
    fontSize: "18px",
};

const SearchInput = ({ primary, secondary }) => {
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    /**
     * Search field handler for posts. It updates the state on every keystroke.
     * @param {object} e - e.target
     * @returns {void}
   */
    const handleSearchField = (e) => {
        setSearchValue(e.target.value);
    };

    const onSearch = () => {
        if (searchValue !== '') {
            dispatch(clearCategory());

            const mainLocation = {
                pathname: '/',
                state: searchValue,
            };

            history.push(mainLocation);
            dispatch(handleSearchValue(searchValue));
            setSearchValue('');
        }
        return false;
    };

    const inputOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <StyledInputContainer secondary={secondary}>
            <StyledSearchInput secondary={secondary} primary={primary} placeholder="Wyszukaj" onChange={handleSearchField} value={searchValue} onKeyDown={inputOnKeyDown} />
            <StyledButtonIcon type="button" onClick={onSearch} secondary={secondary}>
                <FontAwesomeIcon icon={faSearch} style={SearchIcon} />
            </StyledButtonIcon>
        </StyledInputContainer>
    );
};

export default SearchInput;
