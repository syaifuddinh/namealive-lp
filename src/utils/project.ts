import PROJECT from "@/contents/project.json"

export const getProjectDetail = (id: string) => {
    const data = PROJECT.works.find(item => item.id === id);
    if(!data) return;

    return data;
}

export const getNextProject = (id: string) => {
    const idx = PROJECT.works.findIndex(item => item.id === id);
    if(idx < -1 || idx === PROJECT.works.length - 1) return "#";

    return "/projects/" + PROJECT.works[idx + 1].id;
}


export const getPrevProject = (id: string) => {
    const idx = PROJECT.works.findIndex(item => item.id === id);
    if(idx < -1 || idx === 0) return "#";

    return "/projects/" + PROJECT.works[idx - 1].id;
}