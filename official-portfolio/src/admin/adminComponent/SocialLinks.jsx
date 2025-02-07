import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const SocialLinks = () => {
    const [socialLinks, setSocialLinks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const iconMap = {
        'GitHub': <FaGithub className="w-6 h-6" />,
        'LinkedIn': <FaLinkedin className="w-6 h-6" />,
        'Twitter': <FaTwitter className="w-6 h-6" />,
        'Facebook': <FaFacebook className="w-6 h-6" />,
        'Instagram': <FaInstagram className="w-6 h-6" />,
        'Gmail': <SiGmail className="w-6 h-6" />
    };

    const { data: socialLinksData, refetch } = useQuery({
        queryKey: ['socialLinks'],
        queryFn: async () => {
            const res = await axios.get('https://official-portfolio-server.vercel.app/social-links');
            return res.data;
        }
    });

    const handleAddLink = () => {
        setSocialLinks([...socialLinks, { name: '', url: '', logo: '' }]);
    };

    const handleRemoveLink = (index) => {
        const newLinks = socialLinks.filter((_, i) => i !== index);
        setSocialLinks(newLinks);
    };

    const handleLinkChange = (index, field, value) => {
        const newLinks = [...socialLinks];
        newLinks[index][field] = value;
        setSocialLinks(newLinks);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (socialLinksData?.length > 0) {
                await axios.patch(`https://official-portfolio-server.vercel.app/social-links/${socialLinksData[0]._id}`, { links: socialLinks });
            } else {
                await axios.post('https://official-portfolio-server.vercel.app/social-links', { links: socialLinks });
            }
            setIsModalOpen(false);
            refetch();
        } catch (error) {
            console.error('Error updating social links:', error);
        }
    };

    const openModal = () => {
        if (socialLinksData?.length > 0) {
            setSocialLinks(socialLinksData[0].links || []);
        } else {
            setSocialLinks([]);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Social Links</h2>
            
            {socialLinksData?.length > 0 ? (
                <>
                    <div className="bg-base-200 p-6 rounded-lg mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            {socialLinksData[0].links?.map((link, index) => (
                                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    {iconMap[link.name] || <img src={link.logo} alt={link.name} className="w-6 h-6 mr-2" />}
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <button onClick={openModal} className="btn btn-primary">
                        Update Links
                    </button>
                </>
            ) : (
                <button onClick={openModal} className="btn btn-primary">
                    Add Social Links
                </button>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-base-100 p-6 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">
                            {socialLinksData?.length > 0 ? 'Update' : 'Add'} Social Links
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-6">
                                {socialLinks.map((link, index) => (
                                    <div key={index} className="border p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium">Social Link #{index + 1}</h4>
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveLink(index)}
                                                className="btn btn-error btn-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Name</label>
                                                <select
                                                    value={link.name}
                                                    onChange={(e) => handleLinkChange(index, 'name', e.target.value)}
                                                    className="select select-bordered w-full"
                                                >
                                                    <option value="">Select Platform</option>
                                                    <option value="GitHub">GitHub</option>
                                                    <option value="LinkedIn">LinkedIn</option>
                                                    <option value="Twitter">Twitter</option>
                                                    <option value="Facebook">Facebook</option>
                                                    <option value="Instagram">Instagram</option>
                                                    <option value="Gmail">Gmail</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-medium mb-2">URL</label>
                                                <input
                                                    type="url"
                                                    value={link.url}
                                                    onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                                    className="input input-bordered w-full"
                                                    placeholder="Enter profile URL"
                                                />
                                            </div>
                                            
                                            {link.name === 'Other' && (
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">Logo URL</label>
                                                    <input
                                                        type="url"
                                                        value={link.logo}
                                                        onChange={(e) => handleLinkChange(index, 'logo', e.target.value)}
                                                        className="input input-bordered w-full"
                                                        placeholder="Enter logo image URL"
                                                    />
                                                    {link.logo && <img src={link.logo} alt="Logo Preview" className="mt-2 w-10 h-10 object-cover"/>}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button 
                                type="button" 
                                onClick={handleAddLink}
                                className="btn btn-secondary w-full"
                            >
                                Add Another Social Link
                            </button>

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
                                >
                                    {socialLinksData?.length > 0 ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialLinks;
