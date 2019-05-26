// things that are reusable and used across different modules

export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResList: document.querySelector('.results__list'),
    searchRes: document.querySelector('.results'),
};

export const elementStrings = {
    loader: 'loader',
};

// attach loader as a child element of the parent
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);

    // if there is a loader then we want to delete it
    // go up to parent element and then remove the child 
    if (loader) loader.parentElement.removeChild(loader);
};