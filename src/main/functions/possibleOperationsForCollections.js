export default (collectionType, role) => {
    if(collectionType === "tournaments" || collectionType === "participated"){
        if(role === "ROLE_ADMIN"){
            return ["Accept","Cancel","Ban","Unlock","Delete","Search"];
        }
        else if(role === "ROLE_ORGANIZER"){
            return ["Add","Report","Search"];
        }
        else if(role === "ROLE_ACCEPTED"){
            return ["Report","Search"];
        }
        else{
            return ["Search"];
        }
    }
    if(collectionType === "organized"){
        if(role === "ROLE_ADMIN"){
            return ["Accept","Cancel","Ban","Unlock","Delete","Search"];
        }
        else if(role === "ROLE_ORGANIZER"){
            return ["Add","Report","Delete","Search"];
        }
        else if(role === "ROLE_ACCEPTED"){
            return ["Report","Search"];
        }
        else{
            return ["Search"];
        }
    }
    else if(collectionType === "users"){
        if(role === "ROLE_ADMIN"){
            return ["Accept","Cancel","Ban","Unlock","Advance","Degrade","Delete","Search"];
        }
        else if(role === "ROLE_ORGANIZER"){
            return ["Report","Search"];
        }
        else if(role === "ROLE_ACCEPTED"){
            return ["Report","Search"];
        }
        else{
            return ["Search"];
        }
    }
    else if(collectionType === "games"){
        if(role === "ROLE_ADMIN"){
            return ["Accept","Cancel","Ban","Unlock","Delete","Add","Search"];
        }
        else if(role === "ROLE_ORGANIZER"){
            return ["Add","Report","Search"];
        }
        else if(role === "ROLE_ACCEPTED"){
            return ["Report","Search"];
        }
        else{
            return ["Search"];
        }
    }
    else return ["Search"];
};