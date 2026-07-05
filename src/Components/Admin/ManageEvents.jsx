import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { Plus, Edit2, Trash2, X, Check, Calendar, MapPin, Tag } from 'lucide-react';

const ManageEvents = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        venue: '',
        type: 'Competition',
        description: '',
        status: 'upcoming'
    });

    const types = ['Competition', 'Workshop', 'Seminar', 'Other'];

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/events');
            setEvents(res.data.data);
        } catch (error) {
            console.error('Error fetching events:', error);
            toast.error('Failed to load events');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (event = null) => {
        if (event) {
            setEditingEvent(event);
            setFormData({
                title: event.title,
                date: event.date,
                venue: event.venue,
                type: event.type,
                description: event.description || '',
                status: event.status
            });
        } else {
            setEditingEvent(null);
            setFormData({
                title: '',
                date: '',
                venue: '',
                type: 'Competition',
                description: '',
                status: 'upcoming'
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingEvent(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingEvent
                ? `http://localhost:5000/api/admin/events/${editingEvent._id}`
                : 'http://localhost:5000/api/admin/events';
            const method = editingEvent ? 'put' : 'post';
            const response = await axios[method](url, formData, {
                headers: { 'X-User-Email': user?.email }
            });
            toast.success(editingEvent ? 'Event updated!' : 'Event created!');
            handleCloseModal();
            fetchEvents();
        } catch (error) {
            console.error('Error saving event:', error);
            toast.error(error.response?.data?.error || 'Failed to save event');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this event?')) return;
        try {
            await axios.delete(`http://localhost:5000/api/admin/events/${id}`, {
                headers: { 'X-User-Email': user?.email }
            });
            toast.success('Event deleted');
            fetchEvents();
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete event');
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'upcoming' ? 'completed' : 'upcoming';
        try {
            await axios.put(`http://localhost:5000/api/admin/events/${id}`, { status: newStatus }, {
                headers: { 'X-User-Email': user?.email }
            });
            toast.success(`Event marked as ${newStatus}`);
            fetchEvents();
        } catch (error) {
            console.error('Status toggle error:', error);
            toast.error('Failed to update status');
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Events</h1>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    Add New Event
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : events.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No events created yet.</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                        >
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        event.status === 'upcoming'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {event.status}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleStatus(event._id, event.status)}
                                            className="p-1 text-blue-500 hover:text-blue-700 transition"
                                            title="Toggle status"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleOpenModal(event)}
                                            className="p-1 text-purple-500 hover:text-purple-700 transition"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event._id)}
                                            className="p-1 text-red-500 hover:text-red-700 transition"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mt-2">{event.title}</h3>
                                <div className="mt-3 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</p>
                                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.venue}</p>
                                    <p className="flex items-center gap-2"><Tag className="w-4 h-4" /> {event.type}</p>
                                    {event.description && <p className="text-xs text-gray-500">{event.description}</p>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{editingEvent ? 'Edit Event' : 'Create New Event'}</h2>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Date *</label>
                                <input
                                    type="text"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., May 15-17, 2024"
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Venue *</label>
                                <input
                                    type="text"
                                    name="venue"
                                    value={formData.venue}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Type *</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                                >
                                    {types.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Description (optional)</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Status</label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"
                                >
                                    {editingEvent ? 'Update' : 'Create'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;