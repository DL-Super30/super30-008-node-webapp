
import { useState } from "react";
import axios from "axios";

export default function Leadsmodal({ onClose }) {
    const [formData, setFormData] = useState({
        name: "",
        cc: "91",
        phone: "",
        email: "",
        feeQuoted: "",
        leadStatus: "Not Contacted",
        leadSource: "",
        stack: "",
        course: "",
        classMode: "",
        followUpDate: "",
        description: "",
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(""); // New state for success message

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.phone) newErrors.phone = "Phone number is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid.";
        // Add more validations as needed
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("Submitting form data:", formData);

        try {
            const response = await axios.post("http://localhost:3000/leads", formData);
            console.log("Server response:", response);
            if (response.status === 201) {
                console.log("Lead created successfully");
                setSuccessMessage("Lead created successfully!"); // Set success message
                setTimeout(() => {
                    setSuccessMessage(""); // Clear message after 3 seconds
                    onClose(); // Close form after success message
                }, 3000);
            } else {
                console.error("Unexpected response status:", response.status);
                alert("Unexpected server response. Please try again.");
            }
        } catch (error) {
            console.error("Error creating lead:", error);
            const errorMessage = error.response?.data?.message || error.message || "Unknown error occurred.";
            alert(`There was an error submitting the form: ${errorMessage}`);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-semibold mb-4">Create Lead</h2>

                {/* Display success message */}
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-200 text-green-800 rounded">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* Left Side Form Inputs */}
                    <div>
                        <label className="block text-sm">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                        <label className="block text-sm mt-2">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Phone"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

                        <label className="block text-sm mt-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

                        <label className="block text-sm mt-2">Fee Quoted</label>
                        <input
                            type="text"
                            name="feeQuoted"
                            value={formData.feeQuoted}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Fee Quoted"
                        />
                    </div>

                    {/* Right Side Form Inputs */}
                    <div>
                        <label className="block text-sm">Lead Status</label>
                        <select
                            name="leadStatus"
                            value={formData.leadStatus}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Not Contacted">Not Contacted</option>
                            <option value="Attempted">Attempted</option>
                            <option value="Warm Lead">Warm Lead</option>
                            <option value="Cold Lead">Cold Lead</option>
                        </select>

                        <label className="block text-sm mt-2">Lead Source</label>
                        <input
                            type="text"
                            name="leadSource"
                            value={formData.leadSource}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Lead Source"
                        />

                        <label className="block text-sm mt-2">Stack</label>
                        <input
                            type="text"
                            name="stack"
                            value={formData.stack}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Stack"
                        />

                        <label className="block text-sm mt-2">Next FollowUp</label>
                        <input
                            type="date"
                            name="followUpDate"
                            value={formData.followUpDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-sm">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Description"
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="col-span-2 flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}
