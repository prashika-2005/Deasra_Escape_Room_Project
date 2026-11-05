/**
 * ESCAPE ROOM: THE ENTREPRENEUR'S JOURNEY
 * Persistent Game State Manager with LocalStorage Support
 */

const STORAGE_KEY = 'ENTREPRENEUR_ESCAPE_GAME_STATE_V1';

class GameState {
  constructor() {
    this.defaultState = {
      player: {
        id: 'ENTR_' + Math.floor(1000 + Math.random() * 9000),
        name: 'Entrepreneur',
        fullName: 'Entrepreneur',
        username: 'student_player',
        email: 'player@deasra.org',
        collegeName: '',
        branch: '',
        yearOfStudy: '',
        studentId: '',
        avatarId: 'creator',
        avatarName: 'The Creator',
        avatarTitle: 'Creative & Innovative',
        avatarDesc: 'You see possibilities where others see limitations.',
        avatarIcon: '💡',
        xp: 0,
        level: 1,
        registered: false
      },
      currentRoomId: 1,
      currentWall: 1, // 1: Entrance, 2: Desk/Clues, 3: Exit/Painting, 4: Bookshelf
      rooms: {
        1: {
          id: 1,
          name: 'Introduction to deAsra inspireLIFE',
          status: 'available', // available | in_progress | completed
          progress: 0,
          kbsFound: [], // [1, 2, 3]
          quizzesCompleted: [], // [1, 2, 3]
          quizScores: { 1: 0, 2: 0, 3: 0 },
          scratchCompleted: false,
          drawerUnlocked: false,
          redBookPulled: false,
          safeOpened: false,
          clockSolved: false,
          paintingCompleted: false,
          keyAcquired: false,
          escaped: false
        },
        2: {
          id: 2,
          name: 'Entrepreneurial Mindset',
          status: 'locked', // locked | available | in_progress | completed
          progress: 0,
          kbsFound: [],
          quizzesCompleted: [],
          quizScores: { 4: 0 },
          puzzleSolved: false,
          keyAcquired: false,
          escaped: false
        },
        3: {
          id: 3,
          name: 'Personal Finance Management',
          status: 'locked',
          progress: 0,
          kbsFound: [],
          quizzesCompleted: [],
          quizScores: { 5: 0 },
          puzzleSolved: false,
          keyAcquired: false,
          escaped: false
        },
        4: {
          id: 4,
          name: 'Personal Branding',
          status: 'locked',
          progress: 0,
          kbsFound: [],
          quizzesCompleted: [],
          quizScores: { 6: 0 },
          puzzleSolved: false,
          keyAcquired: false,
          escaped: false
        },
        5: {
          id: 5,
          name: 'Problem Solving & Business Idea Generation',
          status: 'locked',
          progress: 0,
          kbsFound: [],
          quizzesCompleted: [],
          quizScores: { 7: 0 },
          puzzleSolved: false,
          keyAcquired: false,
          escaped: false
        }
      },
      inventory: [],
      hintsUsed: 0,
      badges: [
        { id: 'first_clue', name: 'First Discovery', icon: '🔍', desc: 'Discovered your first secret clue', unlocked: false },
        { id: 'kb_master', name: 'Knowledge Seeker', icon: '📚', desc: 'Unlocked 3 Knowledge Boxes', unlocked: false },
        { id: 'puzzle_art', name: 'Art of Innovation', icon: '🖼️', desc: 'Completed the mysterious painting', unlocked: false },
        { id: 'gateway_escape', name: 'Inspire Pioneer', icon: '🏆', desc: 'Escaped Room 1 and unlocked the building', unlocked: false },
        { id: 'entrepreneur_master', name: 'Master Entrepreneur', icon: '👑', desc: 'Completed all specialized training rooms', unlocked: false }
      ],
      settings: {
        audioMuted: false
      }
    };

    // Always start fresh on every launch/run (Zero stale solved states!)
    this.reset();
  }

  load() {
    return JSON.parse(JSON.stringify(this.defaultState));
  }

  save() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {}
  }

  reset() {
    this.state = JSON.parse(JSON.stringify(this.defaultState));
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }

  // Restore user state from MySQL Database API if authenticated
  async restoreFromDatabase() {
    if (!window.apiService || !window.apiService.authToken) return;
    try {
      // 1. Fetch Profile
      const profRes = await window.apiService.fetchProfile();
      if (profRes && profRes.success && profRes.user) {
        const u = profRes.user;
        this.state.player.id = u.id;
        this.state.player.name = u.fullName || u.username;
        this.state.player.fullName = u.fullName;
        this.state.player.username = u.username;
        this.state.player.email = u.email;
        this.state.player.avatarId = u.avatarId || 'creator';
        this.state.player.collegeName = u.collegeName;
        this.state.player.branch = u.branch;
        this.state.player.yearOfStudy = u.yearOfStudy;
        this.state.player.studentId = u.studentId;
        this.state.player.xp = u.totalXp || 0;
        this.state.player.level = Math.floor((u.totalXp || 0) / 300) + 1;
        this.state.player.registered = true;
      }

      // 2. Fetch XP Breakdown
      const xpRes = await window.apiService.fetchXP();
      if (xpRes && xpRes.success && xpRes.xp) {
        this.state.player.xp = xpRes.xp.totalXp || 0;
        this.state.player.level = Math.floor(this.state.player.xp / 300) + 1;
      }

      // 3. Fetch Rooms
      const roomRes = await window.apiService.fetchRooms();
      if (roomRes && roomRes.success && roomRes.rooms) {
        Object.keys(roomRes.rooms).forEach(rId => {
          const remoteRoom = roomRes.rooms[rId];
          if (this.state.rooms[rId]) {
            this.state.rooms[rId].status = remoteRoom.status;
            this.state.rooms[rId].progress = remoteRoom.progress;
            if (remoteRoom.stateData && Object.keys(remoteRoom.stateData).length > 0) {
              Object.assign(this.state.rooms[rId], remoteRoom.stateData);
            }
          }
        });
      }

      // 4. Fetch Inventory
      const invRes = await window.apiService.request('/inventory');
      if (invRes && invRes.success && invRes.inventory) {
        this.state.inventory = invRes.inventory;
      }

      this.save();
      if (window.app) window.app.updateHUD();
    } catch (err) {
      console.warn('Database state restore warning:', err);
    }
  }

  addXP(amount, category = 'ACTIVITY', sourceId = null, sourceName = null) {
    this.state.player.xp += amount;
    this.state.player.level = Math.floor(this.state.player.xp / 300) + 1;
    this.save();
    if (window.app) window.app.updateHUD();

    // Sync with MySQL Database API
    if (window.apiService && window.apiService.authToken) {
      const srcId = sourceId || ('act_' + Date.now());
      const srcName = sourceName || `Activity XP (+${amount})`;
      window.apiService.awardXP(category, amount, srcId, srcName).then(res => {
        if (res && res.success && typeof res.totalXp === 'number') {
          this.state.player.xp = res.totalXp;
          this.state.player.level = Math.floor(res.totalXp / 300) + 1;
          if (window.app) window.app.updateHUD();
        }
      });
    }
    return this.state.player.xp;
  }

  addItem(item) {
    if (!this.state.inventory.some(i => i.id === item.id)) {
      this.state.inventory.push(item);
      this.save();
      if (window.soundEngine) window.soundEngine.playSuccess();
      if (window.app) {
        window.app.showToast(`Collected: ${item.name}`, 'reward');
        window.app.updateHUD();
      }

      // Sync with MySQL Database API
      if (window.apiService && window.apiService.authToken) {
        window.apiService.collectInventoryItem(item.id, item.name, item.type || 'puzzle_item');
      }
      return true;
    }
    return false;
  }

  hasItem(itemId) {
    return this.state.inventory.some(i => i.id === itemId);
  }

  removeItem(itemId) {
    this.state.inventory = this.state.inventory.filter(i => i.id !== itemId);
    this.save();
    if (window.app) window.app.updateHUD();
  }

  unlockBadge(badgeId) {
    const badge = this.state.badges.find(b => b.id === badgeId);
    if (badge && !badge.unlocked) {
      badge.unlocked = true;
      this.addXP(100, 'ACTIVITY', `badge_${badgeId}`, `Unlocked Badge: ${badge.name}`);
      this.save();
      if (window.app) {
        window.app.showToast(`Badge Unlocked: ${badge.name}!`, 'reward');
      }
    }
  }

  unlockSpecializedRooms() {
    // Room 1 completed -> Unlocks Rooms 2, 3, 4, 5
    [2, 3, 4, 5].forEach(id => {
      if (this.state.rooms[id].status === 'locked') {
        this.state.rooms[id].status = 'available';
      }
    });
    this.unlockBadge('gateway_escape');
    this.save();

    // Sync with MySQL Database API
    if (window.apiService && window.apiService.authToken) {
      window.apiService.completeRoom(1);
    }
  }

  updateRoomProgress(roomId) {
    const room = this.state.rooms[roomId];
    if (!room) return 0;
    if (roomId === 1) {
      let score = 0;
      if (room.scratchCompleted) score += 10;
      if (room.drawerUnlocked) score += 15;
      if (room.kbsFound.includes(1)) score += 15;
      if (room.redBookPulled) score += 10;
      if (room.kbsFound.includes(2)) score += 15;
      if (room.clockSolved) score += 10;
      if (room.kbsFound.includes(3)) score += 15;
      if (room.paintingCompleted) score += 10;
      room.progress = Math.min(100, score);
      if (room.escaped) room.progress = 100;
    } else {
      let score = 0;
      if (room.kbsFound.length > 0) score += 40;
      if (room.quizzesCompleted.length > 0) score += 30;
      if (room.puzzleSolved) score += 20;
      if (room.escaped) score = 100;
      room.progress = Math.min(100, score);
    }
    this.save();

    // Sync with MySQL Database API
    if (window.apiService && window.apiService.authToken) {
      window.apiService.syncRoomProgress(roomId, room.status, room.progress, room);
    }
    return room.progress;
  }
}

window.gameState = new GameState();

