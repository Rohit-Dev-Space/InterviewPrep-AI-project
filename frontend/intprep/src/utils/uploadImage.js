import axiosinstance from "./axiosInstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
        const response = await axiosinstance.post('/api/auth/image-upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Image upload failed:", error);
        return { url: '' };
    }
};

export default uploadImage;