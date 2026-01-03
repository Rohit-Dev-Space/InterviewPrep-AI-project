export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export const initialGenerator = (title) => {
    if (!title) return "";
    const words = title.split(' ');
    let initials = words[0].charAt(0).toUpperCase();
    return initials.toUpperCase();
}