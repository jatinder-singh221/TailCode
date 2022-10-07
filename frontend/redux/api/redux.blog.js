export const blogTitleStatus = async (title) => {
    try {
        const location = process.env.NEXT_PUBLIC_API_URL + `/blog/${title}/blog`
        const api = await fetch(location)
        return api.status
    } catch (error) {
        return 500
    }
}