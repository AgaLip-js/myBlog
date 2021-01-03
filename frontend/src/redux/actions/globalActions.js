export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const HANDLE_SEARCH_VALUE = "HANDLE_SEARCH_VALUE";

export const setSelectedCategory = category => (dispatch) => {
    dispatch(
        {
            type: SET_SELECTED_CATEGORY,
            payload: {
                category,
            },
        },
    );
};

export const handleSearchValue = searchText => (dispatch) => {
    dispatch(
        {
            type: HANDLE_SEARCH_VALUE,
            payload: {
                searchText,
            },
        },
    );
};
