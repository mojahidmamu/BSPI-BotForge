import React from 'react';

const Footer = () => {
    return (
        <div>
            <h2 className='mt-10'>THis is footer.... </h2>

                 

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                            <input type="text" name="name" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your full name" />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-2">Profile Photo *</label>
                            <input type="file" name="photo" accept="image/*" required onChange={handleFileChange}
                                className="w-full px-4 py-2 border rounded-lg" />
                            <p className="text-xs text-gray-500 mt-1">Max 2MB, JPG/PNG only</p>
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Roll Number *</label>
                            <input 
                                type="text" 
                                name="roll" 
                                required 
                                onChange={handleChange}
                                pattern="[0-9]{6}"
                                maxLength="6"
                                minLength="6"
                                title="Roll number must be exactly 6 digits"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="e.g., 123456" 
                            />
                            <p className="text-xs text-gray-500 mt-1">🔢 6 digit number only (e.g., 123456)</p>
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Registration Number *</label>
                            <input 
                                type="text" 
                                name="registration" 
                                required 
                                onChange={handleChange}
                                pattern="[0-9]{10}"
                                maxLength="10"
                                minLength="10"
                                title="Registration number must be exactly 10 digits"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="e.g., 2020123456" 
                            />
                            <p className="text-xs text-gray-500 mt-1">🔢 10 digit number only (e.g., 2020123456)</p>
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Department *</label>
                            <select name="department" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option value="">Select Department</option>
                                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">CGPA *</label>
                            <input type="number" step="0.01" name="cgpa" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Last Semester or Final CGPA" min="0" max="4" />
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Gmail *</label>
                            <input type="email" name="email" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="example@gmail.com" />
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                            <input type="tel" name="phone" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="01XXX XXXXXX" />
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">District *</label>
                            <input type="text" name="district" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="Your District" />
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Session *</label>
                            <input type="text" name="session" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="e.g., 2020-2021" />
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Blood Group</label>
                            <select name="department" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500">
                                <option value="">Select Blood Group</option>
                                {blood.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                            </select>
                        </div> */}

                        {/* <div>
                            <label className="block text-sm font-medium mb-2">Skills / Expertise *</label>
                            <input type="text" name="skills" required onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                placeholder="React, Node.js, Python, etc." />
                        </div> */}
                    </div>

                    {/* Terms & Conditions */}
                    {/* <div className="border-t pt-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                                className="mt-1 w-5 h-5 text-purple-600 rounded" />
                            <div>
                                <span className="font-semibold">I confirm that all information provided is true and accurate.</span>
                                <p className="text-sm text-gray-500">I have read and agreed to all the rules, regulations, and commitments mentioned above.</p>
                            </div>
                        </label>
                    </div> */}

                    {/* Submit Button */}
                    {/* <button type="submit" disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50">
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>

                    {message && (
                        <div className={`p-3 rounded-lg text-center ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message.text}
                        </div>
                    )} */}
            </form>
        </div>
    );
};

export default Footer;