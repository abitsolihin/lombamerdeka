import { useRouter, useSearchParams } from "next/navigation";

const useCustomRouter = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const query = {};

    let search = searchParams.get('search');
    let page = searchParams.get('page');
    let limit = searchParams.get('limit');
    let month = searchParams.get('month');
    let year = searchParams.get('year');
    let kategori = searchParams.get('kategori');

    if (search) query.search = search;
    if (page) query.page = parseInt(page);
    if (limit) query.limit = parseInt(limit);
    if (month) query.month = parseInt(month) || new Date().getMonth() + 1;
    if (year) query.year = parseInt(year) || new Date().getFullYear();
    if (kategori) query.kategori = kategori;

    const pushQuery = ({ search, page, limit, month, year, kategori }) => {
        if (search !== undefined) {
            search === '' ? delete query.search : query.search = search;
        }
        if (page !== undefined) {
            page === 1 ? delete query.page : query.page = page;
        }
        if (limit !== undefined) {
            limit === 10 ? delete query.limit : query.limit = limit;
        }
        if (month !== undefined) {
            month === 1 ? delete query.month : (query.month = month || new Date().getMonth() + 1);
        }
        if (year !== undefined) {
            year === 2022 ? delete query.year : (query.year = year || new Date().getFullYear());
        }
        if (kategori !== undefined) {
            kategori === '' ? delete query.kategori : query.kategori = kategori;
        }
        const newQuery = new URLSearchParams(query).toString();

        router.push(`?${newQuery}`)
    }


    return { pushQuery, query };
};

export default useCustomRouter;
