import queryString from "query-string";

export async function getPosts() {
    const apiKey = process.env.API_KEY; // Gantilah dengan API key Anda yang sebenarnya
    const apiUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/lomba`;

    const res = await fetch(apiUrl, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'x-api-key': apiKey, // Tambahkan header x-api-key dengan nilai API key Anda
        },
    });

    return res.json();
}

export async function getPostsByKategori(searchParams) {
    const urlParams = {
        kategori: searchParams.kategori
    }
    
    let queryURL = queryString.stringify(urlParams)
    
    const apiKey = process.env.API_KEY; // Gantilah dengan API key Anda yang sebenarnya
    const apiUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/lomba?${queryURL}`;

    const res = await fetch(apiUrl, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'x-api-key': apiKey, // Tambahkan header x-api-key dengan nilai API key Anda
        },
    });

    return res.json();
}
export async function getDetailPost(params) {
    
    const apiKey = process.env.API_KEY; // Gantilah dengan API key Anda yang sebenarnya
    const apiUrl = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/lomba/${params}`;

    const res = await fetch(apiUrl, {
        method: 'GET',
        cache: 'no-store',
        headers: {
            'x-api-key': apiKey, // Tambahkan header x-api-key dengan nilai API key Anda
        },
    });

    return res.json();
}