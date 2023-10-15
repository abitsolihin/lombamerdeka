import { getPosts } from "@/utils/Fetching";


export default async function sitemap() {
    const baseUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}`;

       // Tambahkan entri untuk halaman login dan register
    const additionalPages = [
        { url: `${baseUrl}/login`, lastModified: new Date() },
        { url: `${baseUrl}/register`, lastModified: new Date() },
    ];

    const {post} = await getPosts();

    // Pastikan posts adalah array sebelum mencoba memanggil metode map
    const postUrls = Array.isArray(post)
        ? post.map((post) => {
            return {
                url: `${baseUrl}/lomba/${post.id}`,
                lastModified: new Date(),
            };
        })
        : [];

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
        },
        ...additionalPages,
        ...postUrls,
    ];
}
