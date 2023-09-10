'use client'

import Multiselect from 'multiselect-react-dropdown';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const FormPost = () => {
    const router = useRouter()

    const [formData, setFormData] = useState({
        title: '',
        deskripsi: '',
        tatacara: '',
        videourl: '',
        kategori: [],
        image: null,
    });
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('title', formData.title);
            form.append('deskripsi', formData.deskripsi);
            form.append('tatacara', formData.tatacara);
            form.append('videourl', formData.videourl);
            form.append('kategori', JSON.stringify(selectedCategories));
            form.append('image', formData.image);

            const response = await fetch('/api/lomba', {
                method: 'POST',
                body: form,
            });

            if (response.ok) {
                console.log('Post berhasil disimpan');
                setFormData({
                    title: '',
                    deskripsi: '',
                    tatacara: '',
                    videourl: '',
                    kategori: [],
                    image: null,
                });
                router.push('/lomba')
            } else {
                console.error('Gagal mengirim data');
            }
        } catch (error) {
            console.error('Gagal mengirim data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setFormData({
            ...formData,
            image: imageFile,
        });
    };

    const handleCategoryChange = (selectedList) => {
        setSelectedCategories(selectedList);
    };

    const state = {
        options: [{ name: 'Trend TikTok', id: 1 }, { name: 'Dewasa', id: 2 }, { name: 'Anak-Anak', id: 3 }]
    }

    return (
        <form onSubmit={handleSubmit} className='border-2 border-solid border-gray-900 p-4 rounded bg-primary w-[370px] sm:w-[700px]'>
            <h1 className='text-[32px] sm:text-[48px]'>Buat Postingan</h1>
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-bold">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input mt-1 block w-full p-2 bg-primary border-solid border-[1px] border-[#000000] rounded-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="deskripsi" className="block text-gray-700 font-bold">
                    Deskripsi
                </label>
                <textarea
                    id="deskripsi"
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    className="form-input mt-1 block w-full p-2 bg-primary border-solid border-[1px] border-[#000000] rounded-md resize-none h-[100px]"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="tatacara" className="block text-gray-700 font-bold">
                    Tata Cara
                </label>
                <textarea
                    id="tatacara"
                    name="tatacara"
                    value={formData.tatacara}
                    onChange={handleInputChange}
                    className="form-input mt-1 block w-full p-2 bg-primary border-solid border-[1px] border-[#000000] rounded-md resize-none h-[100px]"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="videourl" className="block text-gray-700 font-bold">
                    Video URL
                </label>
                <input
                    type="text"
                    id="videourl"
                    name="videourl"
                    value={formData.videourl}
                    onChange={handleInputChange}
                    className="form-input mt-1 block w-full p-2 bg-primary border-solid border-[1px] border-[#000000] rounded-full"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="kategori" className="block text-gray-700 font-bold">
                    Kategori
                </label>
                <Multiselect
                    options={state.options}
                    selectedValues={selectedCategories}
                    onSelect={handleCategoryChange}
                    displayValue='name'
                    disablePreSelectedValues={false}
                    avoidHighlightFirstOption={true}
                    style={{
                        chips: {
                            background: '#000000',
                            borderRadius: '15px',
                            'margin': '0 5px 0 0',
                        },
                        multiselectContainer: {
                            color: '#000000'
                        },
                        searchBox: {
                            border: 'none',
                            borderBottom: '0px solid blue',
                            borderRadius: '0px',
                            'padding': '5px',
                            'display': 'flex',
                            'align-items': 'center',
                        }
                    }}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-bold">
                    Gambar
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-input mt-1 block w-full"
                    required
                />
            </div>
            <button
                type="submit"
                className="bg-transparent border-[1px] border-solid border-[#000000] py-2 px-4 rounded hover:bg-black hover:text-primary"
            >
                Kirim
            </button>
        </form>
    );
};

export default FormPost;