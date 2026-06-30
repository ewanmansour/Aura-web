import { useEffect, useState } from "react";
import {
  Calendar,
  Coffee,
  LayoutDashboard,
  LogOut,
  Users
} from "lucide-react";

// Subcomponents import
import LoginForm from "./components/LoginForm.jsx";
import StatsOverview from "./components/StatsOverview.jsx";
import ReservationsTab from "./components/ReservationsTab.jsx";
import MenuTab from "./components/MenuTab.jsx";
import EventsTab from "./components/EventsTab.jsx";
import SpacesTab from "./components/SpacesTab.jsx";
import ItemFormDialog from "./components/ItemFormDialog.jsx";

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("aura_admin_token") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("reservations");

  // Dashboard Stats & Lists
  const [stats, setStats] = useState({ reservations: 0, menuItems: 0, events: 0, spaces: 0 });
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [events, setEvents] = useState([]);
  const [spaces, setSpaces] = useState([]);

  // UI state for forms
  const [editingItem, setEditingItem] = useState(null);
  const [newItemType, setNewItemType] = useState("");
  const [formData, setFormData] = useState({});
  const [apiMessage, setApiMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (token) {
      loadDashboard();
    }
  }, [token]);

  const showMessage = (messageType, messageText) => {
    setApiMessage({ type: messageType, text: messageText });
    setTimeout(() => setApiMessage({ type: "", text: "" }), 4000);
  };

  async function safeJsonFetch(requestPath, fetchOptions = {}, useAuth = false) {
    const headers = { ...fetchOptions.headers };
    if (useAuth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    let response;
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "";
      response = await fetch(`${baseUrl}${requestPath}`, { ...fetchOptions, headers });
    } catch (netErr) {
      throw new Error("Cannot connect to server. Please check if backend is running.");
    }

    if (response.status === 401 || response.status === 403) {
      handleLogout();
      throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
      let errorMsg = `Request failed with status ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson.message) errorMsg = errorJson.message;
      } catch (_) {
        // use default error message
      }
      throw new Error(errorMsg);
    }

    try {
      return await response.json();
    } catch (e) {
      throw new Error("Invalid response format received from server.");
    }
  }

  async function handleLogin(submitEvent) {
    submitEvent.preventDefault();
    setLoginError("");
    try {
      const loginResult = await safeJsonFetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      localStorage.setItem("aura_admin_token", loginResult.token);
      setToken(loginResult.token);
      setUsername("");
      setPassword("");
    } catch (err) {
      setLoginError(err.message);
    }
  }

  function handleLogout() {
    localStorage.removeItem("aura_admin_token");
    setToken("");
  }

  async function loadDashboard() {
    try {
      // Stats
      const statsResult = await safeJsonFetch("/api/admin/stats", {}, true);
      setStats(statsResult);

      // Reservations
      const reservationsResult = await safeJsonFetch("/api/reservations", {}, true);
      setReservations(reservationsResult);

      // Menu
      const menuResult = await safeJsonFetch("/api/menu");
      setMenuItems(menuResult.items || []);

      // Events
      const eventsResult = await safeJsonFetch("/api/events");
      setEvents(eventsResult);

      // Spaces
      const spacesResult = await safeJsonFetch("/api/spaces");
      setSpaces(spacesResult);
    } catch (err) {
      console.error(err);
      showMessage("error", err.message);
    }
  }

  // --- CRUD Actions ---

  async function handleDelete(resourceType, itemId) {
    if (!confirm(`Are you sure you want to delete this ${resourceType}?`)) return;
    try {
      let requestUrl = "";
      if (resourceType === "reservation") requestUrl = `/api/reservations/${itemId}`;
      else if (resourceType === "menu") requestUrl = `/api/menu/${itemId}`;
      else if (resourceType === "event") requestUrl = `/api/events/${itemId}`;
      else if (resourceType === "space") requestUrl = `/api/spaces/${itemId}`;

      const deleteResult = await safeJsonFetch(requestUrl, { method: "DELETE" }, true);
      showMessage("success", deleteResult.message);
      loadDashboard();
    } catch (err) {
      showMessage("error", err.message);
    }
  }

  async function handleSave(submitEvent) {
    submitEvent.preventDefault();
    try {
      let requestUrl = "";
      let httpMethod = "POST";
      const isEditing = !!editingItem;
      const resourceType = isEditing ? editingItem.type : newItemType;
      const itemId = isEditing ? editingItem._id : "";

      if (resourceType === "menu") {
        requestUrl = isEditing ? `/api/menu/${itemId}` : "/api/menu";
        httpMethod = isEditing ? "PUT" : "POST";
      } else if (resourceType === "event") {
        requestUrl = isEditing ? `/api/events/${itemId}` : "/api/events";
        httpMethod = isEditing ? "PUT" : "POST";
      } else if (resourceType === "space") {
        requestUrl = isEditing ? `/api/spaces/${itemId}` : "/api/spaces";
        httpMethod = isEditing ? "PUT" : "POST";
      }

      const saveResult = await safeJsonFetch(requestUrl, {
        method: httpMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      }, true);

      showMessage("success", saveResult.message);
      setEditingItem(null);
      setNewItemType("");
      setFormData({});
      loadDashboard();
    } catch (err) {
      showMessage("error", err.message);
    }
  }

  function openEdit(resourceType, targetItem) {
    setNewItemType("");
    setEditingItem({ type: resourceType, ...targetItem });
    setFormData({ ...targetItem });
  }

  function openAdd(resourceType) {
    setEditingItem(null);
    setNewItemType(resourceType);
    if (resourceType === "menu") {
      setFormData({ title: "", category: "hot drinks", price: 50, available: true });
    } else if (resourceType === "event") {
      setFormData({
        title: "",
        category: "Workshop",
        date: new Date().toISOString().slice(0, 10),
        time: "7:00 PM",
        price: 200,
        location: "Aura Garden",
        description: "",
        imageTone: "sage",
        imageUrl: "",
        bookingLink: ""
      });
    } else if (resourceType === "space") {
      setFormData({
        name: "",
        slug: "",
        capacity: "2-4 people",
        hourlyRate: 150,
        deposit: 100,
        features: "Wi-Fi, AC",
        description: "",
        imageUrl: ""
      });
    }
  }

  function handleFieldChange(fieldName, fieldValue) {
    setFormData((current) => ({ ...current, [fieldName]: fieldValue }));
  }

  function handleCloseForm() {
    setNewItemType("");
    setEditingItem(null);
    setFormData({});
  }

  // --- Auth guard render check ---
  if (!token) {
    return (
      <LoginForm
        username={username}
        password={password}
        loginError={loginError}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      {/* Header section */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-aura-cream/10 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-4xl text-white">Aura Admin Panel</h1>
          <p className="mt-1 text-sm text-aura-blush">
            {stats.demoMode ? (
              <span className="text-aura-clay font-semibold">
                Demo Mode (MongoDB disconnected - changes temporary)
              </span>
            ) : (
              "Database Connected"
            )}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 rounded-md border border-aura-cream/15 bg-aura-cream/5 px-4 py-2 text-sm text-aura-cream transition hover:bg-aura-cream/20 hover:text-white"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>

      {/* Global Alert Notification */}
      {apiMessage.text && (
        <div
          className={`mb-6 rounded-md p-3.5 text-sm ${
            apiMessage.type === "success" ? "bg-green-500/15 text-green-100" : "bg-red-500/15 text-red-100"
          }`}
        >
          {apiMessage.text}
        </div>
      )}

      <StatsOverview stats={stats} />

      {/* Tabs and Content container */}
      <div className="grid gap-6 lg:grid-cols-[200px_1fr]">
        {/* Sidebar Tabs */}
        <div className="flex flex-row flex-wrap gap-2 lg:flex-col">
          <button
            onClick={() => {
              setActiveTab("reservations");
              handleCloseForm();
            }}
            className={`flex items-center gap-2.5 rounded-md px-4 py-2.5 text-sm transition ${
              activeTab === "reservations" ? "bg-aura-cream text-aura-deep" : "hover:bg-aura-cream/10"
            }`}
          >
            <LayoutDashboard className="h-4 w-4" /> Reservations
          </button>
          <button
            onClick={() => {
              setActiveTab("menu");
              handleCloseForm();
            }}
            className={`flex items-center gap-2.5 rounded-md px-4 py-2.5 text-sm transition ${
              activeTab === "menu" ? "bg-aura-cream text-aura-deep" : "hover:bg-aura-cream/10"
            }`}
          >
            <Coffee className="h-4 w-4" /> Menu Items
          </button>
          <button
            onClick={() => {
              setActiveTab("events");
              handleCloseForm();
            }}
            className={`flex items-center gap-2.5 rounded-md px-4 py-2.5 text-sm transition ${
              activeTab === "events" ? "bg-aura-cream text-aura-deep" : "hover:bg-aura-cream/10"
            }`}
          >
            <Calendar className="h-4 w-4" /> Events
          </button>
          <button
            onClick={() => {
              setActiveTab("spaces");
              handleCloseForm();
            }}
            className={`flex items-center gap-2.5 rounded-md px-4 py-2.5 text-sm transition ${
              activeTab === "spaces" ? "bg-aura-cream text-aura-deep" : "hover:bg-aura-cream/10"
            }`}
          >
            <Users className="h-4 w-4" /> Spaces
          </button>
        </div>

        {/* Main workspace */}
        <div className="glass-panel min-h-[400px] rounded-xl p-5 md:p-8">
          {newItemType || editingItem ? (
            <ItemFormDialog
              editingItem={editingItem}
              newItemType={newItemType}
              formData={formData}
              onFieldChange={handleFieldChange}
              onClose={handleCloseForm}
              onSave={handleSave}
            />
          ) : (
            <>
              {activeTab === "reservations" && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="font-display text-2xl text-white">All Reservation Requests</h2>
                    <span className="rounded-full bg-aura-cream/10 px-3 py-1 text-xs text-white">
                      {reservations.length} total
                    </span>
                  </div>
                  <ReservationsTab
                    reservations={reservations}
                    onDelete={(itemId) => handleDelete("reservation", itemId)}
                  />
                </div>
              )}

              {activeTab === "menu" && (
                <MenuTab
                  menuItems={menuItems}
                  onAdd={() => openAdd("menu")}
                  onEdit={(item) => openEdit("menu", item)}
                  onDelete={(itemId) => handleDelete("menu", itemId)}
                />
              )}

              {activeTab === "events" && (
                <EventsTab
                  events={events}
                  onAdd={() => openAdd("event")}
                  onEdit={(item) => openEdit("event", item)}
                  onDelete={(itemId) => handleDelete("event", itemId)}
                />
              )}

              {activeTab === "spaces" && (
                <SpacesTab
                  spaces={spaces}
                  onAdd={() => openAdd("space")}
                  onEdit={(item) => openEdit("space", item)}
                  onDelete={(itemId) => handleDelete("space", itemId)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
