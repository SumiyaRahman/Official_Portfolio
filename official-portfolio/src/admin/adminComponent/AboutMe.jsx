import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const AboutMe = () => {
    const [designation, setDesignation] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);      

    const { data: aboutData, refetch } = useQuery({
        queryKey: ['aboutMe'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/about-me');
            return res.data;
        }
    });

    console.log(aboutData);

    const handleImageUpload = async (e) => {
        const imageFile = e.target.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);
        
        try {
            setLoading(true);
            const response = await axios.post(
                `https://api.imgbb.com/1/upload`,
                formData,
                {
                    params: {
                        key: import.meta.env.VITE_IMGBB_API_KEY,
                    },
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setImage(response.data.data.url);
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updateData = {
            designation,
            description,
            image
        };

        try {
            await axios.patch(`http://localhost:3000/about-me/${aboutData[0]._id}`, updateData);
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error updating about data:', error);
        }
    };

    console.log(aboutData);

    const openModal = () => {
        setDesignation(aboutData[0]?.designation || '');
        setDescription(aboutData[0]?.description || '');
        setImage(aboutData[0]?.image || '');
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">About Me Information</h2>
            
            {aboutData ? (
                <div className="bg-base-200 p-6 rounded-lg mb-6">
                    <img src={aboutData[0].image} alt="Profile" className="w-48 h-48 object-cover rounded-lg mb-4"/>
                    <h3 className="text-xl font-semibold mb-2">{aboutData[0].designation}</h3>
                    <p className="text-base-content">{aboutData[0].description}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <button onClick={openModal} className="btn btn-primary">
                Update Information
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-2xl">
                        <h3 className="text-xl font-bold mb-4">Update About Me</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Designation</label>
                                <input
                                    type="text"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="input input-bordered w-full"
                                    placeholder="Enter your designation"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="textarea textarea-bordered w-full h-32"
                                    placeholder="Enter description about yourself"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium mb-2">Profile Image</label>
                                <input
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="file-input file-input-bordered w-full"
                                    accept="image/*"
                                />
                                {loading && <span className="text-sm">Uploading image...</span>}
                                {image && <img src={image} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg"/>}
                            </div>

                            <div className="flex justify-end gap-4">
                                <button 
                                    type="button" 
                                    className="btn btn-ghost"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary"
                                    disabled={loading}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutMe;