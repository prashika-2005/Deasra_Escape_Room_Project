/**
 * ESCAPE ROOM: THE ENTREPRENEUR'S JOURNEY
 * Central API Client Helper (communicates with Node.js + Express + MySQL Backend)
 */

class ApiService {
  constructor() {
    this.baseUrl = 'http://localhost:5000/api';
    this.authToken = localStorage.getItem('ENTREPRENEUR_AUTH_TOKEN') || null;
  }

  setToken(token) {
    this.authToken = token;
    if (token) {
      localStorage.setItem('ENTREPRENEUR_AUTH_TOKEN', token);
    } else {
      localStorage.removeItem('ENTREPRENEUR_AUTH_TOKEN');
    }
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    try {
      const response = await fetch(url, { ...options, headers });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `API Error (${response.status})`);
      }
      return data;
    } catch (err) {
      console.warn(`[API Sync Warning] ${endpoint}:`, err.message);
      return { success: false, error: err.message };
    }
  }

  // Auth APIs
  async register(studentData) {
    const res = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(studentData)
    });
    if (res.success && res.token) {
      this.setToken(res.token);
    }
    return res;
  }

  async login(credentials) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res.success && res.token) {
      this.setToken(res.token);
    }
    return res;
  }

  async fetchProfile() {
    return await this.request('/users/profile');
  }

  // Room Progress APIs
  async fetchRooms() {
    return await this.request('/rooms');
  }

  async syncRoomProgress(moduleId, status, progressPct, stateData) {
    return await this.request(`/rooms/${moduleId}/progress`, {
      method: 'PUT',
      body: JSON.stringify({ status, progressPct, stateData })
    });
  }

  async completeRoom(moduleId) {
    return await this.request(`/rooms/${moduleId}/complete`, {
      method: 'POST'
    });
  }

  // Puzzle Validation API
  async validatePuzzle(puzzleId, answer, extraData = {}) {
    return await this.request('/puzzles/validate', {
      method: 'POST',
      body: JSON.stringify({ puzzleId, answer, extraData })
    });
  }

  // XP & Leaderboard APIs
  async awardXP(xpCategory, amount, sourceId, sourceName) {
    return await this.request('/xp/award', {
      method: 'POST',
      body: JSON.stringify({ xpCategory, amount, sourceId, sourceName })
    });
  }

  async fetchXP() {
    return await this.request('/xp');
  }

  async fetchLeaderboard() {
    return await this.request('/leaderboard');
  }

  // Inventory & Shop APIs
  async collectInventoryItem(itemId, itemName, itemType) {
    return await this.request('/inventory/collect', {
      method: 'POST',
      body: JSON.stringify({ itemId, itemName, itemType })
    });
  }

  async purchaseShopItem(itemCode) {
    return await this.request('/shop/purchase', {
      method: 'POST',
      body: JSON.stringify({ itemCode })
    });
  }
}

window.apiService = new ApiService();
