export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const HANDLE_SEARCH_VALUE = "HANDLE_SEARCH_VALUE";
export const SET_SELECTED_SECTION = 'SET_SELECTED_SECTION';
export const STATE_LOADING = 'STATE_LOADING';
export const CLEAR_CATEGORY = 'CLEAR_CATEGORY';

// Set loading state
export const setStateLoading = () => ({
    type: STATE_LOADING,
});

export const setLoadingAction = () => (dispatch) => {
    dispatch(setStateLoading());
};

// Clear errors
export const clearCategory = () => ({
    type: CLEAR_CATEGORY,
});

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

export const setSelectedSection = section => (dispatch) => {
    dispatch(
        {
            type: SET_SELECTED_SECTION,
            payload: {
                section,
            },
        },
    );
};
