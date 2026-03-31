import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Ticket,
  User,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  MessageSquare,
  ChevronRight,
  X,
  Send,
} from "lucide-react";
import { supportService } from "../service/supportService";

function Support() {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [stats, setStats] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Fetch tickets on component mount
  useEffect(() => {
    fetchTickets();
    fetchStatistics();
  }, []);

  // Apply filters whenever query or filters change
  useEffect(() => {
    applyFilters();
  }, [tickets, searchQuery, statusFilter, priorityFilter]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await supportService.getAll();
      setTickets(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await supportService.getStatistics();
      setStats(response.data);
    } catch (err) {
      console.log("Error fetching statistics");
    }
  };

  const applyFilters = () => {
    let filtered = [...tickets];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.ticketNumber.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.priority === priorityFilter);
    }

    setFilteredTickets(filtered);
  };

  const handleCreateTicket = async (formData) => {
    try {
      setLoading(true);
      setError("");
      await supportService.create(formData);
      setShowCreateForm(false);
      fetchTickets();
      fetchStatistics();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (ticketId) => {
    if (!newComment.trim()) return;
    try {
      await supportService.addComment(ticketId, newComment);
      setNewComment("");
      // Refresh ticket
      const response = await supportService.getById(ticketId);
      setSelectedTicket(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseTicket = async (ticketId, resolution) => {
    try {
      await supportService.closeTicket(ticketId, resolution);
      fetchTickets();
      setSelectedTicket(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "text-red-600 bg-red-100 dark:bg-red-950/30 dark:text-red-400";
      case "in-progress":
        return "text-amber-600 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400";
      case "resolved":
        return "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400";
      case "closed":
        return "text-gray-600 bg-gray-100 dark:bg-gray-950/30 dark:text-gray-400";
      default:
        return "text-blue-600 bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return "text-red-600 bg-red-100 dark:bg-red-950/30";
      case "high":
        return "text-orange-600 bg-orange-100 dark:bg-orange-950/30";
      case "medium":
        return "text-amber-600 bg-amber-100 dark:bg-amber-950/30";
      case "low":
        return "text-blue-600 bg-blue-100 dark:bg-blue-950/30";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-950/30";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "open":
        return <AlertCircle size={16} />;
      case "in-progress":
        return <Clock size={16} />;
      case "resolved":
        return <CheckCircle size={16} />;
      default:
        return <Ticket size={16} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-4 md:p-6 transition-colors duration-500">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 dark:text-sky-400 mb-2">
                💬 Support
              </p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-zinc-100">
                Support Tickets
              </h1>
            </div>

            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-xl font-semibold bg-sky-600 text-white hover:bg-sky-700 transition-all"
            >
              <Plus size={18} />
              New Ticket
            </button>
          </div>

          {/* Statistics */}
          {stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <StatCard title="Total" value={stats.total} color="blue" />
              <StatCard title="Open" value={stats.open} color="red" />
              <StatCard title="In Progress" value={stats.inProgress} color="amber" />
              <StatCard title="Resolved" value={stats.resolved} color="emerald" />
              <StatCard title="High Priority" value={stats.highPriority} color="orange" />
            </div>
          )}
        </div>

        {/* Search & Filters */}
        <div className="mb-6 space-y-4">
          {error && (
            <div className="p-4 rounded-xl bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tickets by title, number, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 placeholder:text-gray-500"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100"
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Tickets List or Detail View */}
        {selectedTicket ? (
          <TicketDetailView
            ticket={selectedTicket}
            onBack={() => setSelectedTicket(null)}
            onAddComment={handleAddComment}
            onCloseTicket={handleCloseTicket}
            newComment={newComment}
            setNewComment={setNewComment}
          />
        ) : (
          <TicketsList
            tickets={filteredTickets}
            loading={loading}
            onSelectTicket={setSelectedTicket}
          />
        )}

        {/* Create Ticket Form Modal */}
        {showCreateForm && (
          <CreateTicketModal
            onClose={() => setShowCreateForm(false)}
            onSubmit={handleCreateTicket}
          />
        )}
      </div>
    </div>
  );
}

// Components
function StatCard({ title, value, color }) {
  const colorClasses = {
    blue: "text-blue-600 bg-blue-100 dark:bg-blue-950/30 dark:text-blue-400",
    red: "text-red-600 bg-red-100 dark:bg-red-950/30 dark:text-red-400",
    amber: "text-amber-600 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400",
    emerald: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400",
    orange: "text-orange-600 bg-orange-100 dark:bg-orange-950/30 dark:text-orange-400",
  };

  return (
    <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
      <p className="text-sm text-gray-500 dark:text-zinc-400">{title}</p>
      <p className={`text-2xl font-bold mt-2 ${colorClasses[color]}`}>{value}</p>
    </div>
  );
}

function TicketsList({ tickets, loading, onSelectTicket }) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
        <p className="text-gray-500 dark:text-zinc-400 mt-4">Loading tickets...</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-zinc-700 p-12 text-center">
        <Ticket size={40} className="mx-auto text-gray-300 dark:text-zinc-700 mb-4" />
        <p className="text-gray-500 dark:text-zinc-400">No tickets found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onSelect={onSelectTicket}
        />
      ))}
    </div>
  );
}

function TicketCard({ ticket, onSelect }) {
  return (
    <button
      onClick={() => onSelect(ticket)}
      className="w-full text-left rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:shadow-lg transition-all hover:border-sky-300 dark:hover:border-sky-700"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs font-semibold text-gray-500 dark:text-zinc-400">
              {ticket.ticketNumber}
            </span>
            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300">
              {ticket.category}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-100 mb-1">
            {ticket.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-zinc-400 line-clamp-2">
            {ticket.description}
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <User size={14} />
              {ticket.userName}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(ticket.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${ticket.status === "open"
              ? "text-red-600 bg-red-100 dark:bg-red-950/30 dark:text-red-400"
              : ticket.status === "in-progress"
                ? "text-amber-600 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400"
                : "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400"
            }`}
          >
            {ticket.status === "open" && <AlertCircle size={12} />}
            {ticket.status === "in-progress" && <Clock size={12} />}
            {ticket.status === "resolved" && <CheckCircle size={12} />}
            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace("-", " ")}
          </span>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              ticket.priority === "critical"
                ? "text-red-600 bg-red-100 dark:bg-red-950/30"
                : ticket.priority === "high"
                  ? "text-orange-600 bg-orange-100 dark:bg-orange-950/30"
                  : ticket.priority === "medium"
                    ? "text-amber-600 bg-amber-100 dark:bg-amber-950/30"
                    : "text-blue-600 bg-blue-100 dark:bg-blue-950/30"
            }`}
          >
            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
          </span>
          <ChevronRight size={18} className="text-gray-300 dark:text-zinc-700 mt-2" />
        </div>
      </div>
    </button>
  );
}

function TicketDetailView({
  ticket,
  onBack,
  onAddComment,
  onCloseTicket,
  newComment,
  setNewComment,
}) {
  const [closeReason, setCloseReason] = useState("");
  const [showCloseForm, setShowCloseForm] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 mb-6"
      >
        <ChevronRight size={18} className="rotate-180" />
        Back to Tickets
      </button>

      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mb-2">
              {ticket.ticketNumber}
            </p>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">
              {ticket.title}
            </h2>
          </div>
          <div className="flex gap-2">
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${
                ticket.status === "open"
                  ? "text-red-600 bg-red-100 dark:bg-red-950/30 dark:text-red-400"
                  : ticket.status === "in-progress"
                    ? "text-amber-600 bg-amber-100 dark:bg-amber-950/30 dark:text-amber-400"
                    : "text-emerald-600 bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400"
              }`}
            >
              {ticket.status}
            </span>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded-full ${
                ticket.priority === "critical"
                  ? "text-red-600 bg-red-100 dark:bg-red-950/30"
                  : ticket.priority === "high"
                    ? "text-orange-600 bg-orange-100 dark:bg-orange-950/30"
                    : "text-blue-600 bg-blue-100 dark:bg-blue-950/30"
              }`}
            >
              {ticket.priority}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <InfoItem label="Reported By" value={ticket.userName} />
          <InfoItem label="Category" value={ticket.category} />
          <InfoItem label="Created" value={new Date(ticket.createdAt).toLocaleDateString()} />
          <InfoItem label="Assigned To" value={ticket.assignedTo || "Unassigned"} />
        </div>

        <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-zinc-800">
          <p className="text-sm text-gray-600 dark:text-zinc-300">{ticket.description}</p>
        </div>

        {ticket.resolution && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-2">
              RESOLUTION
            </p>
            <p className="text-sm text-emerald-700 dark:text-emerald-300">{ticket.resolution}</p>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="border-t border-gray-200 dark:border-zinc-800 pt-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
          <MessageSquare size={20} />
          Comments
        </h3>

        {ticket.comments && ticket.comments.length > 0 && (
          <div className="space-y-4 mb-6">
            {ticket.comments.map((comment) => (
              <div
                key={comment.id}
                className="p-4 rounded-xl bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-gray-800 dark:text-zinc-100">
                    {comment.author}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-zinc-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-gray-700 dark:text-zinc-300">{comment.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment Form */}
        {ticket.status !== "closed" && (
          <div className="space-y-3">
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 placeholder:text-gray-500 resize-none"
              rows="3"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => onAddComment(ticket.id)}
                disabled={!newComment.trim()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={16} />
                Send Comment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Close Ticket Button */}
      {ticket.status !== "closed" && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800">
          {!showCloseForm ? (
            <button
              onClick={() => setShowCloseForm(true)}
              className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition-all"
            >
              Close Ticket
            </button>
          ) : (
            <div className="space-y-3">
              <textarea
                placeholder="Resolution..."
                value={closeReason}
                onChange={(e) => setCloseReason(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 resize-none"
                rows="3"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => onCloseTicket(ticket.id, closeReason)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all"
                >
                  Confirm Close
                </button>
                <button
                  onClick={() => {
                    setShowCloseForm(false);
                    setCloseReason("");
                  }}
                  className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 dark:text-zinc-400 font-semibold mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 dark:text-zinc-100">{value}</p>
    </div>
  );
}

function CreateTicketModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "bug",
    priority: "medium",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="rounded-xl bg-white dark:bg-zinc-900 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-zinc-100">
            Create Support Ticket
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100"
              placeholder="Brief description of your issue"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100 resize-none"
              rows="5"
              placeholder="Detailed description of the problem"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100"
              >
                <option value="bug">Bug</option>
                <option value="feature">Feature Request</option>
                <option value="performance">Performance</option>
                <option value="inquiry">Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-800 dark:text-zinc-100"
              placeholder="your@email.com"
            />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200 dark:border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gray-200 dark:bg-zinc-800 text-gray-800 dark:text-zinc-100 font-semibold hover:bg-gray-300 dark:hover:bg-zinc-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-all"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Support;
