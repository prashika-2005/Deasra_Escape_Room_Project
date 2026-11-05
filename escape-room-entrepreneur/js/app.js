/**
 * ESCAPE ROOM: THE ENTREPRENEUR'S JOURNEY
 * Main Application Orchestrator & Event Router
 * 4-Wall Photorealistic Victorian Chamber Edition
 */

class App {
  constructor() {
    this.currentDialogueScript = null;
    this.currentDialogueLineIdx = 0;
    this.typewriterInterval = null;
    this.lampOn = true;
  }

  init() {
    // 1. Initialize Vintage Room Engine
    if (window.vintageRoomEngine) {
      window.vintageRoomEngine.init();
    }

    // 2. Restore state from MySQL Database API if authenticated
    if (window.gameState && window.gameState.restoreFromDatabase) {
      window.gameState.restoreFromDatabase();
    }

    // 3. Setup HUD & UI Listeners
    this.setupEventListeners();
    this.updateHUD();

    // 4. Launch Title Landing Screen Sequence (3-Second Delayed Pop-up & Let's Begin Button)
    this.initTitleLandingSequence();
  }

  initTitleLandingSequence() {
    const landing = document.getElementById('game-title-landing');
    const storyCard = document.getElementById('title-story-card');
    
    if (landing && storyCard) {
      // 3-Second Pop-up Timer
      setTimeout(() => {
        storyCard.classList.add('revealed');
        if (window.soundEngine) {
          window.soundEngine.playChime();
        }
      }, 3000);
    } else {
      if (!window.gameState.state.player.registered) {
        this.openModal('welcome-modal');
      }
    }
  }

  beginGameFromLanding() {
    if (window.soundEngine) {
      window.soundEngine.playSuccess();
    }

    const landing = document.getElementById('game-title-landing');

    const state = window.gameState ? window.gameState.state : null;
    const player = state ? state.player : null;

    // Pre-fill existing student profile data if available
    if (player) {
      const fullNameEl = document.getElementById('login-full-name');
      const usernameEl = document.getElementById('login-username');
      const emailEl = document.getElementById('login-email');
      const collegeEl = document.getElementById('login-college-name');
      const branchEl = document.getElementById('login-branch');
      const yearEl = document.getElementById('login-year');
      const studentIdEl = document.getElementById('login-student-id');

      if (fullNameEl && (player.fullName || player.name)) fullNameEl.value = player.fullName || player.name;
      if (usernameEl && player.username) usernameEl.value = player.username;
      if (emailEl && player.email) emailEl.value = player.email;
      if (collegeEl && player.collegeName) collegeEl.value = player.collegeName;
      if (branchEl && player.branch) branchEl.value = player.branch;
      if (yearEl && player.yearOfStudy) yearEl.value = player.yearOfStudy;
      if (studentIdEl && player.studentId) studentIdEl.value = player.studentId;
    }

    // 1. Instantly hide the title landing cover so it never blocks the modal
    if (landing) {
      landing.classList.add('fade-out');
      landing.style.display = 'none';
    }

    // 2. Open Student Login & Registration Modal
    this.openModal('student-login-modal');
  }

  async handleLoginSubmit(event) {
    if (event) event.preventDefault();

    const fullName = document.getElementById('login-full-name')?.value.trim();
    const username = document.getElementById('login-username')?.value.trim();
    const email = document.getElementById('login-email')?.value.trim();
    const collegeName = document.getElementById('login-college-name')?.value.trim();
    const branch = document.getElementById('login-branch')?.value;
    const yearOfStudy = document.getElementById('login-year')?.value;
    const studentId = document.getElementById('login-student-id')?.value.trim();

    if (!fullName || !username || !email || !collegeName || !branch || !yearOfStudy || !studentId) {
      this.showToast('Please fill out all required student login details.', 'error');
      return;
    }

    // Save student details to persistent game state
    const player = window.gameState.state.player;
    player.name = fullName;
    player.fullName = fullName;
    player.username = username;
    player.email = email;
    player.collegeName = collegeName;
    player.branch = branch;
    player.yearOfStudy = yearOfStudy;
    player.studentId = studentId;
    player.registered = true;

    // Send Registration to MySQL Backend API!
    if (window.apiService) {
      const res = await window.apiService.register({
        fullName,
        username,
        email,
        avatarId: player.avatarId || 'creator',
        collegeName,
        branch,
        yearOfStudy,
        studentId
      });

      if (res && res.success && res.user) {
        player.id = res.user.id;
        this.showToast(`✅ Registered in Database as ${fullName}!`, 'success');
      } else if (res && res.error) {
        this.showToast(`⚠️ API: ${res.error}`, 'error');
      }
    }

    window.gameState.save();

    if (window.soundEngine) {
      window.soundEngine.playSuccess();
    }

    // Close Login Modal and open Avatar Selection Screen
    this.closeModal('student-login-modal');
    this.openModal('avatar-selection-screen');

    this.showToast(`Welcome ${fullName}! Choose your avatar to proceed.`, 'success');
  }

  setupEventListeners() {
    // Wall Navigation buttons (syncs with vintageRoomEngine)
    document.getElementById('btn-prev-wall')?.addEventListener('click', () => {
      window.vintageRoomEngine.prevWall();
    });

    document.getElementById('btn-next-wall')?.addEventListener('click', () => {
      window.vintageRoomEngine.nextWall();
    });

    // Bottom HUD Action Buttons
    document.getElementById('hud-btn-hint')?.addEventListener('click', () => {
      window.profileReportManager.getHint();
    });

    document.getElementById('hud-btn-inventory')?.addEventListener('click', () => {
      this.openInventory();
    });

    document.getElementById('hud-btn-map')?.addEventListener('click', () => {
      this.openBuildingMap();
    });

    document.getElementById('hud-btn-profile')?.addEventListener('click', () => {
      window.profileReportManager.renderProfile();
    });

    document.getElementById('hud-btn-report')?.addEventListener('click', () => {
      window.profileReportManager.renderReport();
    });

    document.getElementById('hud-btn-audio')?.addEventListener('click', () => {
      const isMuted = window.soundEngine.toggleMute();
      const icon = document.getElementById('audio-btn-icon');
      if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
      this.showToast(isMuted ? 'Audio Muted' : 'Audio Unmuted', 'success');
    });

    // Close buttons for modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) modal.classList.remove('active');
        if (window.soundEngine) window.soundEngine.playClick();
      });
    });
  }

  updateHUD() {
    const state = window.gameState.state;
    const currentWall = window.vintageRoomEngine ? window.vintageRoomEngine.currentWall : 1;

    // Update Wall Indicator Dots
    document.querySelectorAll('.wall-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === currentWall);
    });

    const wallNames = {
      1: 'Wall 1: Entrance & Wall Clock',
      2: 'Wall 2: Notice Board & Study Desk',
      3: 'Wall 3: Exit Door & Flower Painting',
      4: 'Wall 4: Library Bookshelf & Secret Book'
    };
    const wallLabel = document.getElementById('wall-name-label');
    if (wallLabel) wallLabel.textContent = wallNames[currentWall] || `Wall ${currentWall}`;

    // Update XP & Inventory Count
    const xpVal = document.getElementById('hud-xp-val');
    if (xpVal) xpVal.textContent = state.player.xp;

    const invCount = document.getElementById('hud-inv-count');
    if (invCount) invCount.textContent = state.inventory.length;

    if (window.vintageRoomEngine) {
      window.vintageRoomEngine.updateRoomVisuals();
    }
  }

  showToast(message, type = 'normal') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span style="font-size:18px;">${type === 'reward' ? '🎁' : type === 'success' ? '✓' : type === 'error' ? '⚠️' : 'ℹ️'}</span> <span>${message}</span>`;
    container.appendChild(toast);

    if (window.soundEngine && type === 'error') {
      window.soundEngine.playError();
    }

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.style.display = 'flex';
      modal.style.opacity = '1';
      modal.style.visibility = 'visible';
      modal.style.pointerEvents = 'auto';
      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      modal.style.display = 'none';
      modal.style.opacity = '0';
      modal.style.visibility = 'hidden';
      modal.style.pointerEvents = 'none';
    }
  }

  // ==========================================
  // PROFESSOR VANCE DIALOGUE CONTROLLER
  // ==========================================
  startDialogue(dialogueKey, onComplete = null) {
    const diag = window.DIALOGUES[dialogueKey];
    if (!diag) return;

    this.currentDialogueScript = diag;
    this.currentDialogueLineIdx = 0;

    const overlay = document.getElementById('dialogue-overlay');
    const nameEl = document.getElementById('diag-npc-name');
    const roleEl = document.getElementById('diag-npc-role');
    const continueBtn = document.getElementById('diag-continue-btn');

    if (nameEl) nameEl.textContent = diag.npcName;
    if (roleEl) roleEl.textContent = diag.npcRole;

    overlay.classList.add('active');

    const nextLine = () => {
      if (this.currentDialogueLineIdx < diag.lines.length) {
        let line = diag.lines[this.currentDialogueLineIdx];
        if (this.currentDialogueLineIdx === 0 && diag.avatarBranch) {
          const avatarId = window.gameState.state.player.avatarId;
          line = diag.avatarBranch[avatarId] || line;
        }

        this.typewriterEffect(line);
        this.currentDialogueLineIdx++;

        if (this.currentDialogueLineIdx >= diag.lines.length) {
          if (continueBtn) continueBtn.textContent = diag.buttonText || 'Continue';
        } else {
          if (continueBtn) continueBtn.textContent = 'Next →';
        }
      } else {
        overlay.classList.remove('active');
        if (onComplete) onComplete();
      }
    };

    continueBtn.onclick = () => {
      if (window.soundEngine) window.soundEngine.playClick();
      nextLine();
    };

    nextLine();
  }

  typewriterEffect(text) {
    const textEl = document.getElementById('diag-text');
    if (!textEl) return;
    if (this.typewriterInterval) clearInterval(this.typewriterInterval);

    textEl.textContent = '';
    let i = 0;
    this.typewriterInterval = setInterval(() => {
      if (i < text.length) {
        textEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(this.typewriterInterval);
      }
    }, 20);
  }

  // ==========================================
  // VOXEL CHARACTER SELECTION & ONBOARDING
  // ==========================================
  chooseVoxelAvatar(avatarId, avatarName) {
    const avatars = {
      creator: { name: 'The Creator', title: 'Creative • Innovative • Imaginative', desc: 'You see possibilities where others see limitations.', icon: '💡' },
      leader: { name: 'The Leader', title: 'Confident • Decisive • Influential', desc: 'You inspire people and turn ideas into action.', icon: '👑' },
      explorer: { name: 'The Explorer', title: 'Adventurous • Curious • Bold', desc: 'You are always ready to discover what’s next.', icon: '🧭' },
      strategist: { name: 'The Strategist', title: 'Smart • Analytical • Logical', desc: 'You think ahead and find the smartest path.', icon: '♟️' }
    };

    const sel = avatars[avatarId] || avatars.creator;

    // Highlight selected card
    document.querySelectorAll('.avatar-char-card').forEach(card => {
      card.classList.toggle('selected', card.id === `avatar-card-${avatarId}`);
    });

    // Update bottom button text
    const btnText = document.getElementById('avatar-btn-text');
    if (btnText) {
      btnText.textContent = `SELECT AVATAR (${sel.name.toUpperCase()}) →`;
    }

    window.gameState.state.player.avatarId = avatarId;
    window.gameState.state.player.avatarName = sel.name;
    window.gameState.state.player.avatarTitle = sel.title;
    window.gameState.state.player.avatarDesc = sel.desc;
    window.gameState.state.player.avatarIcon = sel.icon;

    if (window.soundEngine) window.soundEngine.playClick();
  }

  confirmVoxelAvatar() {
    const player = window.gameState.state.player;
    if (!player.avatarId) {
      player.avatarId = 'creator';
      player.avatarName = 'The Creator';
      player.avatarTitle = 'Creative • Innovative • Imaginative';
      player.avatarIcon = '💡';
    }

    player.registered = true;
    window.gameState.save();

    if (window.soundEngine) {
      window.soundEngine.playSuccess();
    }

    // Update Lobby Top Avatar Tag
    const tag = document.getElementById('lobby-avatar-name-tag');
    if (tag) {
      tag.textContent = player.avatarName.toUpperCase();
    }

    // 1. Open Building Lobby Concourse first
    this.openModal('building-lobby-screen');

    // 2. Close avatar selection modal
    this.closeModal('avatar-selection-screen');
    this.showToast(`✨ Character Selected: ${player.avatarName}`, 'reward');

    // 3. Immediately launch Professor Vance Welcome Dialogue in the Lobby
    setTimeout(() => {
      this.startDialogue('lobby_intro');
    }, 200);
  }

  enterRoom1FromLobby() {
    if (window.soundEngine) {
      window.soundEngine.playSuccess();
    }
    this.closeModal('building-lobby-screen');
    window.vintageRoomEngine.setWall(1);
    this.showToast('🚪 Stepping through Room 1 Entrance into the Study...', 'success');
  }

  // ==========================================
  // BUILDING MAP & PARCHMENT BLUEPRINT UI
  // ==========================================
  openBuildingMap() {
    if (window.soundEngine) {
      window.soundEngine.playClick();
    }
    this.openModal('map-modal');
  }

  selectMapRoom(zoneId) {
    if (window.soundEngine) {
      window.soundEngine.playClick();
    }

    switch (zoneId) {
      case 'entrance':
        this.closeModal('map-modal');
        this.openModal('building-lobby-screen');
        this.showToast('🏛️ Entrance Lobby & Professor Vance Concourse', 'success');
        break;

      case 'room1':
        this.closeModal('map-modal');
        this.closeModal('building-lobby-screen');
        window.vintageRoomEngine.setWall(1);
        this.showToast('🚪 Inside Room 1: Introduction to deAsra inspireLIFE', 'success');
        break;

      case 'lobby':
        this.closeModal('map-modal');
        window.roomController.openMasteryCorridor();
        break;

      case 'mindset':
        this.closeModal('map-modal');
        window.roomController.enterSpecializedRoom(2);
        break;

      case 'finance':
        this.closeModal('map-modal');
        window.roomController.enterSpecializedRoom(3);
        break;

      case 'branding':
        this.closeModal('map-modal');
        window.roomController.enterSpecializedRoom(4);
        break;

      case 'ideas':
        this.closeModal('map-modal');
        window.roomController.enterSpecializedRoom(5);
        break;

      default:
        this.closeModal('map-modal');
        break;
    }
  }

  // ==========================================
  // INVENTORY DRAWER
  // ==========================================
  openInventory() {
    const inv = window.gameState.state.inventory;
    const grid = document.getElementById('inventory-items-grid');
    if (!grid) return;

    grid.innerHTML = '';
    if (inv.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:24px;">No clues or items collected yet. Explore the room!</div>`;
    } else {
      inv.forEach(item => {
        const slot = document.createElement('div');
        slot.className = 'inventory-slot-card has-item';
        slot.innerHTML = `
          <div class="inv-item-icon">${item.icon}</div>
          <div class="inv-item-name">${item.name}</div>
          <div style="font-size:9px;color:var(--text-muted);">${(item.type || '').replace('_', ' ')}</div>
        `;
        slot.onclick = () => {
          this.showToast(`${item.name}: ${item.desc}`, 'reward');
        };
        grid.appendChild(slot);
      });
    }

    this.openModal('inventory-modal');
  }

  // ==========================================
  // ROOM 1 INTERACTIVE PUZZLE TRIGGERS
  // ==========================================
  openScratchPuzzle() {
    this.openModal('scratch-modal');
    setTimeout(() => {
      if (window.puzzleManager) window.puzzleManager.initScratchCard();
    }, 60);
  }

  openKeypadPuzzle() {
    window.puzzleManager.clearKeypad();
    this.openModal('keypad-modal');
  }

  pullRedBook() {
    window.puzzleManager.pullRedBook();
  }

  openSafeModal() {
    this.openModal('safe-modal');
  }

  openClockPuzzle() {
    window.puzzleManager.initClockModalEvents();
    this.openModal('clock-modal');
  }

  inspectPortraits() {
    this.openModal('portraits-modal');
  }

  inspectFloorNote() {
    this.showToast('📜 Blueprint Clue: "The 3 painting fragments are locked in Drawer 01, the Library Safe, and the Wall Clock!"', 'reward');
  }

  toggleLamp() {
    this.lampOn = !this.lampOn;
    if (window.soundEngine) window.soundEngine.playClick();
    this.showToast(this.lampOn ? "💡 The banker's lamp casts warm illumination across the desk." : "💡 Desk lamp toggled.", 'normal');
  }

  openPaintingPuzzle() {
    if (window.puzzleManager) {
      window.puzzleManager.syncPaintingUI();
    }
    this.openModal('painting-modal');
  }

  openNoticeBoard() {
    this.openModal('notice-board-modal');
  }

  openKnowledgeBox(kbId) {
    window.roomController.startKnowledgeBox(kbId);
  }

  attemptEscape() {
    window.roomController.escapeRoom1();
  }

  openSpecializedRoomModal(roomId) {
    this.openModal(`room-${roomId}-modal`);
  }

  openM3CashflowModal() {
    const iframe = document.getElementById('m3-cashflow-iframe');
    if (iframe) {
      const targetSrc = './M3-personal%20cashflow/index.html';
      if (iframe.src !== targetSrc && !iframe.src.endsWith('M3-personal%20cashflow/index.html')) {
        iframe.src = targetSrc;
      }
    }
    this.openModal('m3-cashflow-iframe-modal');
    this.showToast('💰 Entering Financial Vault Room (M3 Personal Cashflow)...', 'reward');
  }

  closeM3CashflowModal() {
    this.closeModal('m3-cashflow-iframe-modal');
    if (window.roomController) {
      window.roomController.openMasteryCorridor();
    }
  }

  openLearningReport() {
    window.profileReportManager.renderReport();
  }

  restartGame() {
    if (window.soundEngine) {
      window.soundEngine.playClick();
    }
    if (confirm('Start a completely fresh escape run from the beginning? All puzzles will be reset to unsolved.')) {
      window.gameState.reset();
      window.location.reload();
    }
  }
}

window.app = new App();
window.addEventListener('DOMContentLoaded', () => {
  window.app.init();
});
