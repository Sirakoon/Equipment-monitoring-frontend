# Frontend API Integration Guide

## ✅ What Was Updated

### 1. **Login Modal** (`LoginModal.jsx`)
- Now uses `authService` for API login
- Added error handling and loading states
- Real JWT token authentication
- Demo credentials shown

### 2. **Auth Context** (Already set up)
- Stores JWT token in localStorage
- Manages user state across app
- Provides login/logout functions

### 3. **Pages Updated for API Integration**

#### Equipment List (`EquipmentList.jsx`)
- Fetches from `/api/equipments`
- Real-time API data display
- Search and filter functionality

#### Maintenance Plans (`MaintenancePlan.jsx`)
- Fetches from `/api/maintenance-plans`
- Status and priority filtering
- Summary cards with statistics

#### Reports (`Reports.jsx`)
- Fetches from `/api/reports`
- Report type and status filtering
- Download buttons ready

#### Users (`UserManagement.jsx`)
- Fetches from `/api/users`
- User role and status filtering
- Active/inactive status display

#### Breakdown History (`BreakdownHis.jsx`)
- Fetches from `/api/breakdown-history`
- Status tracking (Resolved, In Progress, Open)
- Root cause and solutions displayed

#### Spare Parts (`SparePart.jsx`)
- Fetches from `/api/spare-parts`
- Stock level indicators
- Reorder alerts
- Inventory summary

### 4. **Service Files**
Located in `/src/service/`:
- `authService.js` - Login/logout, token management
- `equipmentService.js` - CRUD for equipment
- `maintenanceService.js` - Maintenance operations
- `breakdownService.js` - Breakdown history
- `sparePartService.js` - Spare parts inventory
- `reportService.js` - Report generation

## 🚀 How to Use

### Step 1: Start Backend
```bash
cd Equipment-monitoring-backend
npm install
npm start
```
Backend runs at: http://localhost:7500

### Step 2: Start Frontend
```bash
cd Equipment-monitoring-frontend
npm install
npm run dev
```
Frontend typically runs at: http://localhost:5173

### Step 3: Login
Click the login button and use:
- Username: `admin`
- Password: `admin123`

Or:
- Username: `tech01`
- Password: `tech123`

## 📡 API Integration Flow

```
Frontend Component
        ↓
Service Layer (equipmentService, etc)
        ↓
API Endpoint (http://localhost:7500/api/...)
        ↓
Backend Controller
        ↓
Mock Data (or Database)
```

## 🔒 Authentication

All API requests include JWT token in header:
```
Authorization: Bearer <token>
```

Token is automatically:
- Obtained from login
- Stored in localStorage
- Sent with every API request

## 📝 Example: Adding a New Page

1. Create page in `/src/pages/NewPage.jsx`
2. Import service: `import { service } from "../service/serviceFile"`
3. Fetch data: `const data = await service.getAll()`
4. Handle loading/error states
5. Display data

## ⚙️ Service Usage Example

```javascript
import { equipmentService } from "../service/equipmentService";

// Get all
const data = await equipmentService.getAll();

// Get by ID
const item = await equipmentService.getById(1);

// Create
const newItem = await equipmentService.create({...});

// Update
const updated = await equipmentService.update(id, {...});

// Delete
await equipmentService.delete(id);
```

## 🎯 Current Status

✅ All pages connected to API
✅ JWT authentication working
✅ Service layer complete
✅ Error handling in place
✅ Loading states implemented
✅ Token management working

## ⏭️ Next Steps

1. **Database Integration**
   - Replace mock data with MSSQL queries
   - Implement proper data persistence

2. **Form Submissions**
   - Add create/edit forms
   - Connect to PUT/POST endpoints

3. **Real-time Updates**
   - Add WebSocket support for live data
   - Implement auto-refresh

4. **Error Boundary**
   - Add error boundary component
   - Better error handling UI

5. **Testing**
   - API endpoint testing
   - Integration tests

## 🐛 Troubleshooting

**API not connecting?**
- Ensure backend is running on port 7500
- Check browser console for errors
- Verify CORS is enabled

**Login fails?**
- Check credentials (admin/admin123 or tech01/tech123)
- Backend must be running
- Check network tab in browser DevTools

**Token errors?**
- Clear localStorage: `localStorage.clear()`
- Login again
- Check token expiry (set to 24h)

## 📚 Files Structure

```
src/
├── Components/
│   ├── LoginModal.jsx          ← Uses authService
│   └── BarNav.jsx
├── context/
│   ├── AuthContext.jsx         ← Manages auth state
│   └── ThemeContext.jsx
├── pages/
│   ├── EquipmentList.jsx       ← Uses equipmentService
│   ├── MaintenancePlan.jsx     ← Uses maintenanceService
│   ├── Reports.jsx            ← Uses reportService
│   ├── UserManagement.jsx      ← Fetches from API
│   ├── BreakdownHis.jsx        ← Uses breakdownService
│   └── SparePart.jsx           ← Uses sparePartService
├── service/
│   ├── authService.js         ← Login/token
│   ├── equipmentService.js    ← Equipment CRUD
│   ├── maintenanceService.js  ← Maintenance CRUD
│   ├── breakdownService.js    ← Breakdown CRUD
│   ├── sparePartService.js    ← Parts CRUD
│   └── reportService.js       ← Reports CRUD
└── api.js                      ← API endpoints config
```

## 🔐 Security Notes

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- CORS enabled for localhost (configure for production)
- Passwords should be hashed in database (use bcrypt)
- Implement rate limiting in production
- Add HTTPS requirement in production

---

**Frontend is now fully integrated with the API!** 🎉
