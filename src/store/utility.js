export const updateObject = (oldProject, updatedItems) => {
    return {
        ...oldProject,
        ...updatedItems
    }
};