let navigateFn;

export const setNavigator = (nav) => {
    navigateFn = nav;
};

export const navigate = (path) => {
    if (navigateFn) navigateFn(path);
};
