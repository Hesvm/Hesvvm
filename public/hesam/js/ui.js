// Modal & Toast Manager for Shaad Rokh Web App
class UIController {
  constructor() {
    this.modalContainer = null;
    this.toastContainer = null;
    this.initContainers();
    // Auto-open profile sheet immediately on load
    setTimeout(() => this.openProfileSheet(), 50);
  }

  initContainers() {
    const phoneEl = document.querySelector('.phone-container') || document.body;
    let modalEl = document.getElementById('rokh-modal-container');
    if (!modalEl) {
      modalEl = document.createElement('div');
      modalEl.id = 'rokh-modal-container';
      modalEl.className = 'modal-backdrop-hidden';
      phoneEl.appendChild(modalEl);
    } else if (modalEl.parentElement !== phoneEl && phoneEl) {
      phoneEl.appendChild(modalEl);
    }
    this.modalContainer = modalEl;

    if (!document.getElementById('rokh-toast-container')) {
      const toastEl = document.createElement('div');
      toastEl.id = 'rokh-toast-container';
      toastEl.className = 'toast-container';
      document.body.appendChild(toastEl);
      this.toastContainer = toastEl;
    } else {
      this.toastContainer = document.getElementById('rokh-toast-container');
    }
  }

  openProfileSheet() {
    const sheet = document.getElementById('bottom-sheet-container');
    const backdrop = document.getElementById('app-backdrop');
    if (sheet) sheet.classList.add('sheet-open');
    if (backdrop) backdrop.classList.add('backdrop-active');
  }

  closeProfileSheet() {
    const sheet = document.getElementById('bottom-sheet-container');
    const backdrop = document.getElementById('app-backdrop');
    if (sheet) sheet.classList.remove('sheet-open');
    if (backdrop) backdrop.classList.remove('backdrop-active');
  }

  toggleProfileSheet() {
    const sheet = document.getElementById('bottom-sheet-container');
    if (sheet && sheet.classList.contains('sheet-open')) {
      this.closeProfileSheet();
    } else {
      this.openProfileSheet();
    }
  }

  scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update active nav chip
      document.querySelectorAll('.nav-pill-chip').forEach(btn => {
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(sectionId)) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  }

  toggleEditMode(active) {
    if (active) {
      document.body.classList.add("edit-mode-active");
      this.tempHiddenSections = [];
    } else {
      document.body.classList.remove("edit-mode-active");
    }
  }

  cancelEditMode() {
    this.toggleEditMode(false);
    this.tempHiddenSections = [];
    document.querySelectorAll(".section-card").forEach(c => c.classList.remove("hidden-widget"));
    document.getElementById("hidden-tray-items").innerHTML = "";
    this.showToast("تغییرات لغو شد", "info");
  }

  saveEditMode() {
    this.toggleEditMode(false);
    this.showToast("تغییرات با موفقیت ذخیره شد ✓", "success");
  }

  getSectionElement(cardId) {
    let el = typeof cardId === 'string' ? document.getElementById(cardId) : cardId;
    if (!el) return null;
    const body = document.querySelector('.sections-body');
    if (!body) return el;
    let curr = el;
    while (curr && curr.parentElement && curr.parentElement !== body) {
      curr = curr.parentElement;
    }
    return (curr && curr.parentElement === body) ? curr : el;
  }

  toggleWidgetVisibility(cardId) {
    const secEl = this.getSectionElement(cardId);
    if (!secEl) return;
    secEl.classList.add("hidden-widget");
    const tray = document.getElementById("hidden-tray-items");
    const titleEl = secEl.querySelector(".section-title-wrap span:last-child, .section-label span, .network-title span");
    const titleText = titleEl ? titleEl.innerText.trim() : (secEl.id || "این بخش");
    if (tray) {
      const chip = document.createElement("div");
      chip.className = "hidden-restore-chip";
      chip.innerHTML = `<span>+ بازگردانی ${titleText}</span>`;
      chip.onclick = () => {
        secEl.classList.remove("hidden-widget");
        chip.remove();
        this.showToast(`${titleText} بازگردانده شد ✓`, "success");
      };
      tray.appendChild(chip);
    }
    this.showToast(`${titleText} پنهان شد`, "info");
  }

  openCardMenu(cardId, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    this.closeCardMenu();

    const secEl = this.getSectionElement(cardId);
    if (!secEl) return;

    const actualId = secEl.id || cardId;
    const phoneEl = document.querySelector('.phone-container') || document.body;

    const titleEl = secEl.querySelector('.section-title-wrap span:last-child, .section-label span, .network-title span');
    const titleText = titleEl ? titleEl.innerText.trim() : 'این بخش';

    // Helper to determine edit handler for editable cards only
    let editHandler = null;
    if (actualId === 'bio-widget') editHandler = "window.uiController.openEditProfileModal()";
    else if (actualId === 'info-area') editHandler = "window.uiController.openEditProfileModal()";
    else if (actualId === 'clubs-area' || secEl.closest('#clubs-area')) editHandler = "window.uiController.openAddClubModal()";
    else if (actualId === 'passions-area' || secEl.closest('#passions-area') || actualId === 'passions-widget') editHandler = "window.promptAddPassion()";
    else if (actualId === 'orbit-area' || secEl.closest('#orbit-area')) editHandler = "window.uiController.openEditOrbitModal()";
    else if (actualId === 'goal-area' || secEl.closest('#goal-area')) editHandler = "window.uiController.openEditGoalModal()";
    else if (actualId === 'books-area' || secEl.closest('#books-area')) editHandler = "window.uiController.openEditBooksModal()";

    // Create Popover
    const popover = document.createElement('div');
    popover.id = 'card-action-popover';
    popover.className = 'card-popover-menu';

    popover.innerHTML = `
      <div class="popover-backdrop" onclick="window.uiController.closeCardMenu()"></div>
      <div class="popover-content">
        <div class="popover-header-title">مدیریت: ${titleText}</div>
        ${editHandler ? `
          <button class="popover-btn" onclick="${editHandler}; window.uiController.closeCardMenu();">
            <svg class="popover-btn-icon" viewBox="0 0 24 24"><path d="M13.26 3.6 5.05 12.29c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.43-1.51 2.08-3.23-.15-5.33-2.22-2.08-3.9-0.34-5.29 0.19Z"/><path d="M11.89 5.05c.42 2.68 2.6 4.75 5.3 5.03"/><path d="M3 22h18"/></svg>
            <span>ویرایش محتوا</span>
          </button>
        ` : ''}
        <button class="popover-btn" onclick="window.uiController.moveCard('${actualId}', 'up'); window.uiController.closeCardMenu();">
          <svg class="popover-btn-icon" viewBox="0 0 24 24"><path d="m18 15-6-6-6 6"/></svg>
          <span>انتقال به بالا ⬆</span>
        </button>
        <button class="popover-btn" onclick="window.uiController.moveCard('${actualId}', 'down'); window.uiController.closeCardMenu();">
          <svg class="popover-btn-icon" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>
          <span>انتقال به پایین ⬇</span>
        </button>
        <div class="popover-divider"></div>
        <button class="popover-btn text-danger" onclick="window.uiController.toggleWidgetVisibility('${actualId}'); window.uiController.closeCardMenu();">
          <svg class="popover-btn-icon" viewBox="0 0 24 24"><path d="M15.58 12c0 1.98-1.6 3.58-3.58 3.58S8.42 13.98 8.42 12s1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58Z"/><path d="M12 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19C18.82 5.8 15.53 3.73 12 3.73 8.47 3.73 5.18 5.8 2.89 9.4c-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68Z"/></svg>
          <span>پنهان کردن این بخش 👁️</span>
        </button>
      </div>
    `;

    phoneEl.appendChild(popover);

    if (event && event.currentTarget) {
      const btnRect = event.currentTarget.getBoundingClientRect();
      const phoneRect = phoneEl.getBoundingClientRect();
      const contentEl = popover.querySelector('.popover-content');
      if (contentEl) {
        const popoverHeight = 175;
        let top = btnRect.bottom - phoneRect.top + 6;
        if (top + popoverHeight > phoneRect.height && (btnRect.top - phoneRect.top) > popoverHeight) {
          top = btnRect.top - phoneRect.top - popoverHeight - 6;
        }
        const left = btnRect.left - phoneRect.left;
        contentEl.style.top = `${Math.max(10, top)}px`;
        contentEl.style.left = `${Math.max(10, Math.min(left, phoneRect.width - 200))}px`;
      }
    }
  }

  closeCardMenu() {
    const existing = document.getElementById('card-action-popover');
    if (existing) existing.remove();
  }

  moveCard(cardId, direction) {
    const secEl = this.getSectionElement(cardId);
    if (!secEl) return;
    const parent = secEl.parentElement;
    if (!parent) return;

    if (direction === 'up') {
      const prev = secEl.previousElementSibling;
      if (prev && !prev.classList.contains('quick-nav-pills-bar')) {
        parent.insertBefore(secEl, prev);
        this.showToast('بخش به بالا منتقل شد ✓', 'success');
      } else {
        this.showToast('این بخش در بالاترین موقعیت است', 'info');
      }
    } else if (direction === 'down') {
      const next = secEl.nextElementSibling;
      if (next && next.id !== 'hidden-tray') {
        parent.insertBefore(next, secEl);
        this.showToast('بخش به پایین منتقل شد ✓', 'success');
      } else {
        this.showToast('این بخش در پایین‌ترین موقعیت است', 'info');
      }
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-msg">${message}</span>
    `;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-fadeout');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  openModal(contentHtml, title = '') {
    const phoneEl = document.querySelector('.phone-container');
    if (phoneEl && this.modalContainer.parentElement !== phoneEl) {
      phoneEl.appendChild(this.modalContainer);
    }
    this.modalContainer.innerHTML = `
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close-btn" onclick="window.uiController.closeModal()">✕</button>
        </div>
        <div class="modal-body">
          ${contentHtml}
        </div>
      </div>
    `;
    this.modalContainer.className = 'modal-backdrop-visible';
  }

  closeModal() {
    this.modalContainer.className = 'modal-backdrop-hidden';
    this.modalContainer.innerHTML = '';
  }

  openEditProfileModal() {
    const s = window.rokhStore.getState();
    const html = `
      <form id="edit-profile-form" onsubmit="window.uiController.handleSaveProfile(event)">
        <div class="form-group">
          <label class="form-label">نام و نام خانوادگی</label>
          <input type="text" id="input-name" class="form-input" value="${s.user.name}" required />
        </div>
        <div class="form-group">
          <label class="form-label">پایه و مدرسه</label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="input-grade" class="form-input" value="${s.user.grade}" placeholder="مثال: دهم ریاضی" />
            <input type="text" id="input-school" class="form-input" value="${s.user.school}" placeholder="مثال: دبیرستان البرز" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">متن بیوگرافی (رسالت و علایق)</label>
          <textarea id="input-bio" class="form-textarea" rows="3">${s.bio}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">آیکون آواتار</label>
          <div class="avatar-picker-row">
            ${['😎', '🧑‍🚀', '🦁', '🐼', '🦊', '🚀', '🧙‍♂️', '🦉'].map(emoji => `
              <button type="button" class="avatar-pick-btn ${emoji === s.user.avatar ? 'selected' : ''}" onclick="window.uiController.selectAvatar('${emoji}')">${emoji}</button>
            `).join('')}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">مود و ارتعاش روزانه</label>
          <input type="text" id="input-vibe" class="form-input" value="${s.user.vibe}" />
        </div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" onclick="window.uiController.closeModal()">انصراف</button>
          <button type="submit" class="btn btn-primary">ذخیره تغییرات</button>
        </div>
      </form>
    `;
    this.openModal(html, 'ویرایش پروفایل رُخ');
  }

  selectAvatar(emoji) {
    document.querySelectorAll('.avatar-pick-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.innerText.trim() === emoji);
    });
    window._selectedAvatar = emoji;
  }

  handleSaveProfile(event) {
    event.preventDefault();
    const name = document.getElementById('input-name').value;
    const grade = document.getElementById('input-grade').value;
    const school = document.getElementById('input-school').value;
    const bio = document.getElementById('input-bio').value;
    const vibe = document.getElementById('input-vibe').value;
    const avatar = window._selectedAvatar || window.rokhStore.getState().user.avatar;

    window.rokhStore.updateUserInfo({ name, grade, school, vibe, avatar });
    window.rokhStore.updateProfile({ bio });

    this.closeModal();
    this.showToast('پروفایل رُخ با موفقیت به‌روزرسانی شد ✨', 'success');
  }

  openVibeModal() {
    const s = window.rokhStore.getState();
    const currentVibe = (s.user.vibe || '').trim();

    // Extract leading emoji if present, and remaining text
    const emojiMatch = currentVibe.match(/^(\p{Extended_Pictographic}|\p{Emoji_Presentation}|\p{Emoji}\uFE0F?)/u);
    this.selectedVibeEmoji = emojiMatch ? emojiMatch[0] : '⚡';
    this.currentVibeText = emojiMatch ? currentVibe.slice(emojiMatch[0].length).trim() : currentVibe;
    if (!this.currentVibeText && !emojiMatch) {
      this.currentVibeText = 'پر انرژی';
    }

    const emojis = [
      '⚡', '🔥', '📚', '😴', '🎮', '🎧', '🎯', '☕', 
      '🪐', '🧘‍♂️', '😎', '🚀', '🦁', '🍕', '🎨', '✨',
      '🤒', '⚽', '💡', '🎉'
    ];

    const html = `
      <div class="vibe-modal-wrap">
        <!-- Live Preview Pill -->
        <div class="vibe-preview-box">
          <span style="font-size: 11px; color: #64748b; font-weight: 700;">پیش‌نمایش تگ مود شما:</span>
          <div class="vibe-tag" id="vibe-live-tag" style="margin: 0; padding: 5px 14px; font-size: 13px; font-weight: 800; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1.5px solid #e2e8f0;">
            <span id="vibe-live-emoji">${this.selectedVibeEmoji}</span>
            <span id="vibe-live-text">${this.currentVibeText || 'بدون متن'}</span>
          </div>
        </div>

        <!-- Emoji Selector Grid -->
        <div style="margin-top: 14px;">
          <label style="font-size: 12px; font-weight: 800; color: #1e293b; display: block; margin-bottom: 8px;">یک ایموجی انتخاب کن:</label>
          <div class="vibe-emoji-grid">
            ${emojis.map(e => `
              <button type="button" class="vibe-emoji-btn ${e === this.selectedVibeEmoji ? 'selected' : ''}" onclick="window.uiController.selectVibeEmoji('${e}')">
                ${e}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Text Input -->
        <div style="margin-top: 14px;">
          <label style="font-size: 12px; font-weight: 800; color: #1e293b; display: block; margin-bottom: 6px;">متن کوتاه حال‌وهوا:</label>
          <input type="text" id="vibe-text-input" class="form-input" style="font-size: 13px; font-weight: 700;" value="${this.currentVibeText}" placeholder="مثال: پر انرژی، پای درس، مود استراحت..." maxlength="25" oninput="window.uiController.updateVibePreviewText(this.value)" />
        </div>

        <!-- Quick Presets -->
        <div style="margin-top: 12px;">
          <span style="font-size: 11px; color: #94a3b8; font-weight: 700; display: block; margin-bottom: 6px;">پیشنهادهای سریع:</span>
          <div class="vibe-presets-flex">
            <button type="button" class="vibe-preset-chip" onclick="window.uiController.applyVibePreset('⚡', 'پر انرژی')">⚡ پر انرژی</button>
            <button type="button" class="vibe-preset-chip" onclick="window.uiController.applyVibePreset('📚', 'پای درس و مشق')">📚 پای درس</button>
            <button type="button" class="vibe-preset-chip" onclick="window.uiController.applyVibePreset('🎮', 'مود گیمینگ')">🎮 مود گیم</button>
            <button type="button" class="vibe-preset-chip" onclick="window.uiController.applyVibePreset('😴', 'خواب‌آلود')">😴 خواب‌آلود</button>
            <button type="button" class="vibe-preset-chip" onclick="window.uiController.applyVibePreset('🎧', 'غرق در موزیک')">🎧 موزیک تایم</button>
            <button type="button" class="vibe-preset-chip" onclick="window.uiController.applyVibePreset('☕', 'ریلکس و چای')">☕ ریلکس</button>
          </div>
        </div>

        <!-- Actions -->
        <div style="display: flex; gap: 8px; margin-top: 20px;">
          <button type="button" class="btn btn-secondary" style="flex: 1; border-radius: 14px;" onclick="window.uiController.closeModal()">انصراف</button>
          <button type="button" class="btn btn-primary" style="flex: 2; border-radius: 14px; font-weight: 800;" onclick="window.uiController.saveVibeModal()">ذخیره مود ✓</button>
        </div>
      </div>
    `;

    this.openModal(html, '✨ حال و هوای امروز (مود)');
  }

  selectVibeEmoji(emoji) {
    this.selectedVibeEmoji = emoji;
    document.querySelectorAll('.vibe-emoji-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.innerText.trim() === emoji);
    });
    const el = document.getElementById('vibe-live-emoji');
    if (el) el.innerText = emoji;
  }

  updateVibePreviewText(text) {
    this.currentVibeText = text;
    const el = document.getElementById('vibe-live-text');
    if (el) el.innerText = text.trim() || 'بدون متن';
  }

  applyVibePreset(emoji, text) {
    this.selectVibeEmoji(emoji);
    const input = document.getElementById('vibe-text-input');
    if (input) input.value = text;
    this.updateVibePreviewText(text);
  }

  saveVibeModal() {
    const input = document.getElementById('vibe-text-input');
    const text = input ? input.value.trim() : (this.currentVibeText || '').trim();
    const emoji = this.selectedVibeEmoji || '⚡';
    const finalVibe = text ? `${emoji} ${text}` : emoji;

    window.rokhStore.updateUserInfo({ vibe: finalVibe });
    this.closeModal();
    this.showToast('مود و حال‌وهوای شما با موفقیت ثبت شد! ✨', 'success');
  }

  openAddClubModal() {
    const clubsList = [
      { name: 'رئال مادرید', icon: '👑', color: '#3b82f6' },
      { name: 'بارسلونا', icon: '🔵🔴', color: '#1e3a8a' },
      { name: 'پرسپولیس', icon: '🔴', color: '#dc2626' },
      { name: 'استقلال', icon: '🔵', color: '#2563eb' },
      { name: 'سپاهان', icon: '💛', color: '#eab308' },
      { name: 'تراکتور', icon: '🚜', color: '#b91c1c' },
      { name: 'منچسترسیتی', icon: '⚡', color: '#0ea5e9' },
      { name: 'آرسنال', icon: '🔴⚪', color: '#ef4444' }
    ];

    const currentClubs = window.rokhStore.getState().favoriteClubs.map(c => c.name);

    const html = `
      <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">باشگاه‌های محبوبت رو انتخاب کن تا چیپ اون‌ها توی ویترین نمایش داده بشه:</p>
      <div class="clubs-pick-grid">
        ${clubsList.map(club => {
          const isAdded = currentClubs.includes(club.name);
          return `
            <div class="club-selectable ${isAdded ? 'selected' : ''}" onclick="window.uiController.toggleClub('${club.name}', '${club.icon}', '${club.color}')">
              <span style="font-size: 16px;">${club.icon}</span>
              <span style="font-size: 11.5px; font-weight: 700;">${club.name}</span>
              <span class="club-check-icon">${isAdded ? '✓' : '+'}</span>
            </div>
          `;
        }).join('')}
      </div>
      <div class="modal-actions" style="margin-top: 16px;">
        <button type="button" class="btn btn-primary" style="width: 100%;" onclick="window.uiController.closeModal()">تایید و بستن</button>
      </div>
    `;
    this.openModal(html, 'انتخاب باشگاه‌های هواداری');
  }

  toggleClub(name, icon, color) {
    const current = window.rokhStore.getState().favoriteClubs;
    const exists = current.find(c => c.name === name);
    if (exists) {
      window.rokhStore.removeClub(exists.id);
      this.showToast(`${name} از چیپ‌هایت حذف شد`, 'info');
    } else {
      window.rokhStore.addClub({ id: 'club_' + Date.now(), name, icon, color });
      this.showToast(`${name} به چیپ‌های هواداری اضافه شد! ⚽`, 'success');
    }
    this.openAddClubModal(); // re-render modal
  }

  openNodeInfo(name, relation, avatar, friendId = null) {
    const html = `
      <div style="text-align: center; padding: 10px 0;">
        <div style="width: 68px; height: 68px; border-radius: 9999px; background: #f0fdfa; border: 3px solid #2dd4bf; display: flex; align-items: center; justify-content: center; font-size: 34px; margin: 0 auto 12px auto; box-shadow: 0 4px 12px rgba(0,0,0,0.06); overflow: hidden;">
          ${avatar}
        </div>
        <h4 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 4px;">${name}</h4>
        <span style="background: #e0e7ff; color: #4338ca; padding: 3px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700;">${relation}</span>
        <p style="font-size: 12px; color: #64748b; margin-top: 14px; line-height: 1.8;">
          این دوست در منظومه و مدارهای ارتباطی شاد شما قرار دارد. با تغییر نقش یا مدار او می‌توانید سطوح دسترسی و تعامل را مدیریت کنید!
        </p>
        <div style="display: flex; gap: 8px; margin-top: 20px;">
          <button class="btn btn-secondary" style="flex: 1;" onclick="window.uiController.sendWave('${name}')">👋 سلام و احوال‌پرسی</button>
          <button class="btn btn-primary" style="flex: 1.3;" onclick="window.uiController.openOrbitManagerModal(${friendId ? friendId : 'null'})">🪐 مدیریت در منظومه</button>
        </div>
      </div>
    `;
    this.openModal(html, 'مدار دوستی در شاد');
  }

  sendWave(name) {
    this.closeModal();
    this.showToast(`برای ${name} یک سلام گرم فرستادی! 👋`, 'success');
  }

  openAttendanceDayInfo(day, status) {
    let title = `روز ${day} مهر ۱۴۰۳`;
    let msg = '';
    let badge = '';
    if (status === 'present') {
      badge = '<span style="background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 8px; font-size: 11px; font-weight: 700;">حاضر در مدرسه 🔥</span>';
      msg = 'شما در این روز سر کلاس درس حاضر بوده‌اید و شعله پیوستگی حضورتان فعال مانده است.';
    } else if (status === 'absent') {
      badge = '<span style="background: #fee2e2; color: #b91c1c; padding: 2px 8px; border-radius: 8px; font-size: 11px; font-weight: 700;">غایب ✕</span>';
      msg = 'در این روز غیبت ثبت شده است. زنجیره پیوستگی حضورتان قطع شد، اما در روزهای بعد دوباره شروع به تلاش کردید!';
    } else if (status === 'off') {
      badge = '<span style="background: #f1f5f9; color: #64748b; padding: 2px 8px; border-radius: 8px; font-size: 11px; font-weight: 700;">تعطیل رسمی / آخر هفته</span>';
      msg = 'تعطیلات رسمی و استراحت کلاسی، بدون تاثیر منفی در رکورد حضور و غیاب شما.';
    } else {
      badge = '<span style="background: #dbeafe; color: #1d4ed8; padding: 2px 8px; border-radius: 8px; font-size: 11px; font-weight: 700;">امروز</span>';
      msg = 'روز جاری تحصیلی مهرماه.';
    }

    const html = `
      <div style="text-align: center; padding: 8px 0;">
        <div style="font-size: 32px; margin-bottom: 8px;">📅</div>
        <div style="margin-bottom: 10px;">${badge}</div>
        <p style="font-size: 12px; color: #475569; line-height: 1.8;">${msg}</p>
        <div style="margin-top: 18px;">
          <button class="btn btn-primary" style="width: 100%;" onclick="window.uiController.closeModal()">متوجه شدم</button>
        </div>
      </div>
    `;
    this.openModal(html, title);
  }

  setupLongPress(element, callback) {
    if (!element || element.dataset.hasLongPress === 'true') return;
    element.dataset.hasLongPress = 'true';
    
    let pressTimer;
    let isPressing = false;

    const start = (e) => {
      // Don't trigger on right-click
      if (e.type === 'mousedown' && e.button !== 0) return; 
      isPressing = true;
      pressTimer = setTimeout(() => {
        if (!isPressing) return;
        isPressing = false;
        const s = window.rokhStore.getState();
        if (s.viewMode === 'owner') {
          if (navigator.vibrate) navigator.vibrate(50);
          callback(e);
        }
      }, 550); // 550ms for long press
    };

    const cancel = (e) => {
      isPressing = false;
      clearTimeout(pressTimer);
    };

    element.addEventListener('mousedown', start);
    element.addEventListener('touchstart', start, { passive: true });
    
    element.addEventListener('mouseup', cancel);
    element.addEventListener('mouseleave', cancel);
    element.addEventListener('touchend', cancel);
    element.addEventListener('touchcancel', cancel);
    element.addEventListener('touchmove', cancel, { passive: true });
    
    // Prevent context menu on long press
    element.addEventListener('contextmenu', (e) => {
      const s = window.rokhStore.getState();
      if (s.viewMode === 'owner') {
        e.preventDefault();
      }
    });
  }

  openInteractiveNetwork() {
    const s = window.rokhStore.getState();
    const net = s.network;
    
    let allNodes = [
      { id: "me", name: "شما", avatar: s.user.avatar, r: 25 }
    ];
    let allLinks = [];

    const processOrbit = (orbit, radius, orbitId) => {
      orbit.forEach(n => {
        allNodes.push({ id: n.id, name: n.name, avatar: n.avatar, r: radius, orbit: orbitId });
        allLinks.push({ source: "me", target: n.id, value: 5 - orbitId });
      });
    };

    if(net.orbit1) processOrbit(net.orbit1, 16, 1);
    if(net.orbit2) processOrbit(net.orbit2, 14, 2);
    if(net.orbit3) processOrbit(net.orbit3, 12, 3);
    if(net.orbit4) processOrbit(net.orbit4, 10, 4);

    const html = `
      <div id="d3-network-container" style="width: 100%; height: 60vh; background: #f8fafc; border-radius: 16px; overflow: hidden; position: relative; touch-action: none;">
        <svg id="d3-svg" width="100%" height="100%" style="cursor: grab;"></svg>
        <div style="position: absolute; bottom: 12px; right: 12px; pointer-events: none; color: #64748b; font-size: 11px; background: rgba(255,255,255,0.7); padding: 4px 8px; border-radius: 8px;">
          برای جابه‌جایی بکشید و بزرگ‌نمایی کنید 🔍
        </div>
      </div>
    `;
    this.openModal(html, "شبکه دوستی زنده تعاملی 🪐");

    setTimeout(() => {
      if(!window.d3) return;
      const width = document.getElementById("d3-network-container").clientWidth;
      const height = document.getElementById("d3-network-container").clientHeight;
      
      const svg = d3.select("#d3-svg")
        .call(d3.zoom().scaleExtent([0.5, 4]).on("zoom", (event) => {
          g.attr("transform", event.transform);
        }));

      const g = svg.append("g");

      const simulation = d3.forceSimulation(allNodes)
        .force("link", d3.forceLink(allLinks).id(d => d.id).distance(d => d.value * 30))
        .force("charge", d3.forceManyBody().strength(-200))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collide", d3.forceCollide().radius(d => d.r + 5).iterations(2));

      const link = g.append("g")
        .selectAll("line")
        .data(allLinks)
        .enter().append("line")
        .attr("stroke", "#cbd5e1")
        .attr("stroke-width", d => d.value * 0.5)
        .attr("stroke-opacity", 0.6);

      const node = g.append("g")
        .selectAll("g")
        .data(allNodes)
        .enter().append("g")
        .style("cursor", "pointer")
        .call(d3.drag()
            .on("start", (event, d) => {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on("drag", (event, d) => {
              d.fx = event.x;
              d.fy = event.y;
            })
            .on("end", (event, d) => {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }));

      node.append("circle")
        .attr("r", d => d.r)
        .attr("fill", d => d.id === "me" ? "#10b981" : "#fff")
        .attr("stroke", d => d.id === "me" ? "#059669" : "#2dd4bf")
        .attr("stroke-width", 2);

      node.append("text")
        .text(d => d.avatar)
        .attr("text-anchor", "middle")
        .attr("dy", d => d.r * 0.3)
        .style("font-size", d => (d.r * 1.2) + "px")
        .style("pointer-events", "none");

      node.append("text")
        .text(d => d.name)
        .attr("text-anchor", "middle")
        .attr("dy", d => d.r + 14)
        .style("font-size", "10px")
        .style("font-weight", "bold")
        .style("fill", "#475569")
        .style("pointer-events", "none");

      simulation.on("tick", () => {
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
        node
          .attr("transform", d => `translate(${d.x},${d.y})`);
      });
    }, 200);
  }

  initOrbitPanZoom() {
    const container = document.querySelector(".orbit-container");
    const wrapper = document.getElementById("orbit-zoom-wrapper");
    if (!container || !wrapper) return;

    let scale = 1;
    let isPanning = false;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;

    window.uiController.zoomOrbit = (delta) => {
      scale += delta;
      if (scale < 0.5) scale = 0.5;
      if (scale > 3) scale = 3;
      updateTransform();
    };

    const updateTransform = () => {
      wrapper.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    };

    container.addEventListener("mousedown", e => {
      isPanning = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      container.style.cursor = "grabbing";
    });
    
    window.addEventListener("mouseup", () => {
      isPanning = false;
      if (container) container.style.cursor = "grab";
    });

    window.addEventListener("mousemove", e => {
      if (!isPanning) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform();
    });

    container.addEventListener("touchstart", e => {
      if (e.touches.length === 1) {
        isPanning = true;
        startX = e.touches[0].clientX - translateX;
        startY = e.touches[0].clientY - translateY;
      }
    });

    container.addEventListener("touchend", () => {
      isPanning = false;
    });

    container.addEventListener("touchmove", e => {
      if (!isPanning || e.touches.length !== 1) return;
      e.preventDefault();
      translateX = e.touches[0].clientX - startX;
      translateY = e.touches[0].clientY - startY;
      updateTransform();
    }, { passive: false });
    
    container.style.cursor = "grab";
  }

  openLeaguesModal() {
    const leagues = [
      {
        id: 'bronze',
        name: 'لیگ برنز',
        tier: 1,
        icon: '🥉',
        status: 'completed',
        statusLabel: 'گذرانده شده ✓',
        desc: 'اولین سطح رقابت‌های هفتگی شاد'
      },
      {
        id: 'silver',
        name: 'لیگ نقره',
        tier: 2,
        icon: '🥈',
        status: 'completed',
        statusLabel: 'گذرانده شده ✓',
        desc: 'صعود با تلاش و استمرار روزانه'
      },
      {
        id: 'gold',
        name: 'لیگ طلا',
        tier: 3,
        icon: '🥇',
        status: 'completed',
        statusLabel: 'گذرانده شده ✓',
        desc: 'ورود به جمع ۲۵٪ دانش‌آموزان ممتاز'
      },
      {
        id: 'sapphire',
        name: 'لیگ یاقوت',
        tier: 4,
        icon: '🔷',
        status: 'completed',
        statusLabel: 'گذرانده شده ✓',
        desc: 'سطح پیشرفته و حل چالش‌های روزانه'
      },
      {
        id: 'emerald',
        name: 'لیگ زمرد',
        tier: 5,
        icon: '❇️',
        status: 'completed',
        statusLabel: 'گذرانده شده ✓',
        desc: 'ورود به جمع برترین‌های منطقه'
      },
      {
        id: 'diamond',
        name: 'لیگ الماس',
        tier: 6,
        icon: '💎',
        status: 'current',
        statusLabel: 'لیگ فعلی شما 💎',
        desc: 'رتبه ۲ در گروه ۵۰ نفره • در منطقه صعود مستقیم 🔥',
        highlight: true
      },
      {
        id: 'masters',
        name: 'لیگ قهرمانان (مسترز)',
        tier: 7,
        icon: '👑',
        status: 'locked',
        statusLabel: 'قفل شده 🔒',
        desc: 'صعود با حفظ رتبه ۱ تا ۳ در پایان این دوره هفتگی'
      },
      {
        id: 'legendary',
        name: 'لیگ اساطیر شاد',
        tier: 8,
        icon: '🏆',
        status: 'locked',
        statusLabel: 'قفل شده 🔒',
        desc: 'بالاترین تالار افتخار نخبه‌های مدارس سراسر کشور'
      }
    ];

    const leaguesHtml = `
      <div class="leagues-modal-wrap">
        <div class="league-current-banner">
          <div class="lcb-icon-box">💎</div>
          <div class="lcb-info">
            <div class="lcb-title-row">
              <span class="lcb-title">لیگ فعلی: لیگ الماس</span>
              <span class="lcb-tag">سطح ۶ از ۸</span>
            </div>
            <p class="lcb-sub">با ۲,۴۲۰ امتیاز در جایگاه ۲ جدول هستید. با پایان هفته در این رتبه، به لیگ قهرمانان صعود خواهید کرد!</p>
          </div>
        </div>

        <div class="leagues-roadmap-header">
          <span>نقشه سطوح و مسیر پیشرفت</span>
          <span style="font-size: 11px; color: #10b981; font-weight: 700;">۵ سطح گذرانده شده ✓</span>
        </div>

        <div class="leagues-list-container">
          ${leagues.map(l => `
            <div class="league-card-item league-status-${l.status} ${l.highlight ? 'is-active-league' : ''}">
              <div class="lci-icon-wrap">${l.icon}</div>
              <div class="lci-content">
                <div class="lci-header">
                  <span class="lci-name">${l.name}</span>
                  <span class="lci-badge badge-${l.status}">${l.statusLabel}</span>
                </div>
                <p class="lci-desc">${l.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top: 14px;">
          <button class="btn btn-primary" style="width: 100%; padding: 10px; border-radius: 14px; font-weight: 800;" onclick="window.uiController.closeModal()">
            متوجه شدم، بزن بریم رقابت!
          </button>
        </div>
      </div>
    `;

    this.openModal(leaguesHtml, '🏆 سطوح و لیگ‌های هفتگی شاد');
  }

  openOrbitManagerModal(initialFriendId = null) {
    if (initialFriendId) {
      this.selectedOrbitFriendId = Number(initialFriendId);
    } else if (!this.selectedOrbitFriendId) {
      const s = window.rokhStore.getState();
      const first = s.orbitNetwork.orbit1[0] || s.orbitNetwork.orbit2[0];
      this.selectedOrbitFriendId = first ? first.id : 1;
    }

    const html = `<div id="orbit-manager-mount">${this.buildOrbitManagerHtml()}</div>`;
    this.openModal(html, '🪐 مدارهای دوستی در شاد');
    setTimeout(() => this.initOrbitDragAndDrop(), 60);
  }

  openEditOrbitModal() {
    this.openOrbitManagerModal();
  }

  refreshOrbitModalBody() {
    const mount = document.getElementById('orbit-manager-mount');
    if (mount) {
      mount.innerHTML = this.buildOrbitManagerHtml();
      setTimeout(() => this.initOrbitDragAndDrop(), 40);
    }
  }

  selectOrbitFriend(friendId) {
    this.selectedOrbitFriendId = Number(friendId);
    this.refreshOrbitModalBody();
  }

  changeFriendOrbit(friendId, targetOrbitKey) {
    const orbitLabels = {
      orbit1: 'مدار ۱ (صمیمی‌ترین‌ها)',
      orbit2: 'مدار ۲ (هم‌یاران درسی)',
      orbit3: 'مدار ۳ (هم‌کلاسی‌ها)',
      orbit4: 'مدار ۴ (شبکه شاد)'
    };
    const moved = window.rokhStore.moveFriendOrbit(friendId, targetOrbitKey);
    if (moved) {
      this.selectedOrbitFriendId = moved.id;
      this.showToast(`«${moved.name}» به ${orbitLabels[targetOrbitKey] || targetOrbitKey} منتقل شد ✨`, 'success');
      this.refreshOrbitModalBody();
    }
  }

  changeFriendRole(friendId, newRelation) {
    const trimmed = (newRelation || '').trim();
    if (!trimmed) return;
    const updated = window.rokhStore.updateFriendRole(friendId, trimmed);
    if (updated) {
      this.showToast(`نقش «${updated.name}» به «${trimmed}» به‌روز شد ✓`, 'success');
      this.refreshOrbitModalBody();
    }
  }

  handleCustomRoleSubmit(event, friendId) {
    event.preventDefault();
    const input = document.getElementById(`custom-role-input-${friendId}`);
    if (input && input.value.trim()) {
      this.changeFriendRole(friendId, input.value.trim());
    }
  }

  sendChatMessage(friendName) {
    this.showToast(`گفتگو با «${friendName}» در پیام‌رسان شاد باز شد 💬`, 'info');
  }

  initOrbitDragAndDrop() {
    const svg = document.getElementById('orbit-radar-svg');
    if (!svg) return;

    let isDragging = false;
    let draggedFriendId = null;
    let draggedNodeGroup = null;
    let origX = 0, origY = 0;
    let startClientX = 0, startClientY = 0;
    let currentTargetOrbit = null;
    let hasMovedSignificantly = false;

    const getSvgCoords = (clientX, clientY) => {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    };

    const onStart = (e) => {
      const nodeEl = e.target.closest('.orbit-radar-node');
      if (!nodeEl) return;

      draggedFriendId = Number(nodeEl.getAttribute('data-id'));
      if (!draggedFriendId) return;

      isDragging = true;
      hasMovedSignificantly = false;
      draggedNodeGroup = nodeEl;
      draggedNodeGroup.classList.add('is-dragging');

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startClientX = clientX;
      startClientY = clientY;

      origX = Number(nodeEl.getAttribute('data-x')) || 175;
      origY = Number(nodeEl.getAttribute('data-y')) || 175;

      if (e.type === 'touchstart') {
        e.stopPropagation();
      }
    };

    const onMove = (e) => {
      if (!isDragging || !draggedNodeGroup) return;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dist = Math.hypot(clientX - startClientX, clientY - startClientY);

      if (dist > 6) {
        hasMovedSignificantly = true;
        if (e.cancelable) e.preventDefault();
      }

      if (!hasMovedSignificantly) return;

      const svgPt = getSvgCoords(clientX, clientY);
      const dx = Math.round(svgPt.x - origX);
      const dy = Math.round(svgPt.y - origY);

      draggedNodeGroup.setAttribute('transform', `translate(${dx}, ${dy})`);

      // Determine ring based on distance from center (175, 175)
      const r = Math.hypot(svgPt.x - 175, svgPt.y - 175);
      let targetKey = 'orbit4';
      if (r <= 72) targetKey = 'orbit1';
      else if (r <= 110) targetKey = 'orbit2';
      else if (r <= 145) targetKey = 'orbit3';
      else targetKey = 'orbit4';

      currentTargetOrbit = targetKey;

      svg.querySelectorAll('.radar-ring').forEach(ring => {
        if (ring.id === 'ring-' + targetKey) {
          ring.classList.add('drag-hover-ring');
        } else {
          ring.classList.remove('drag-hover-ring');
        }
      });
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      svg.querySelectorAll('.radar-ring').forEach(ring => ring.classList.remove('drag-hover-ring'));

      if (draggedNodeGroup) {
        draggedNodeGroup.classList.remove('is-dragging');
        draggedNodeGroup.removeAttribute('transform');
      }

      if (hasMovedSignificantly && currentTargetOrbit && draggedFriendId) {
        const current = window.rokhStore.getFriend(draggedFriendId);
        if (current && current.orbitKey !== currentTargetOrbit) {
          this.changeFriendOrbit(draggedFriendId, currentTargetOrbit);
        } else {
          this.refreshOrbitModalBody();
        }
      } else if (!hasMovedSignificantly && draggedFriendId) {
        this.selectOrbitFriend(draggedFriendId);
      }

      draggedFriendId = null;
      draggedNodeGroup = null;
      currentTargetOrbit = null;
      hasMovedSignificantly = false;
    };

    svg.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    svg.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    window.addEventListener('touchcancel', onEnd);
  }

  buildOrbitManagerHtml() {
    const s = window.rokhStore.getState();
    const net = s.orbitNetwork;

    const o1 = net.orbit1 || [];
    const o2 = net.orbit2 || [];
    const o3 = net.orbit3 || [];
    const o4 = net.orbit4 || [];

    // Find selected friend
    let currentFriend = window.rokhStore.getFriend(this.selectedOrbitFriendId);
    if (!currentFriend) {
      const fallback = o1[0] || o2[0] || o3[0] || o4[0];
      if (fallback) {
        this.selectedOrbitFriendId = fallback.id;
        currentFriend = window.rokhStore.getFriend(fallback.id);
      }
    }

    const cx = 175;
    const cy = 175;
    const orbitConfigs = [
      { key: 'orbit1', r: 52, label: 'صمیمی‌ترین‌ها', phase: -45 },
      { key: 'orbit2', r: 90, label: 'هم‌یاران', phase: 0 },
      { key: 'orbit3', r: 128, label: 'هم‌کلاسی‌ها', phase: 35 },
      { key: 'orbit4', r: 162, label: 'شبکه مدرسه', phase: 70 }
    ];

    let clipDefs = `
      <clipPath id="radar-user-clip">
        <circle cx="${cx}" cy="${cy}" r="21" />
      </clipPath>
    `;

    let ringsSvg = '';
    orbitConfigs.forEach(cfg => {
      const isInner = cfg.key === 'orbit1';
      ringsSvg += `
        <circle id="ring-${cfg.key}" class="radar-ring ring-${cfg.key}" cx="${cx}" cy="${cy}" r="${cfg.r}" stroke-dasharray="${isInner ? 'none' : '4 3'}" />
        <text x="${cx}" y="${cy + cfg.r - 4}" text-anchor="middle" font-size="8.5px" font-weight="700" fill="${isInner ? '#93c5fd' : '#94a3b8'}" style="pointer-events: none;">${cfg.label}</text>
      `;
    });

    // Friend Nodes with guaranteed non-overlapping circular spacing
    let nodesSvg = '';
    orbitConfigs.forEach(cfg => {
      const friends = net[cfg.key] || [];
      const total = friends.length;

      friends.forEach((friend, idx) => {
        const angle = cfg.phase + (idx * 360 / Math.max(1, total));
        const rad = (angle * Math.PI) / 180;
        const x = Math.round(cx + cfg.r * Math.cos(rad));
        const y = Math.round(cy + cfg.r * Math.sin(rad));
        const isSelected = currentFriend && friend.id === currentFriend.id;
        const nodeR = 17;

        clipDefs += `
          <clipPath id="clip-radar-${friend.id}">
            <circle cx="${x}" cy="${y}" r="${nodeR - 1.5}" />
          </clipPath>
        `;

        nodesSvg += `
          <g class="orbit-radar-node" data-id="${friend.id}" data-x="${x}" data-y="${y}" title="${friend.name} (${friend.relation})">
            ${isSelected ? `<circle cx="${x}" cy="${y}" r="22" fill="none" stroke="#00BA88" stroke-width="2.5" class="radar-selection-ring" />` : ''}
            <circle cx="${x}" cy="${y}" r="${nodeR}" fill="#ffffff" stroke="${isSelected ? '#00BA88' : '#cbd5e1'}" stroke-width="${isSelected ? '2' : '1.5'}" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))" />
            ${friend.avatarImg ? `
              <image href="${friend.avatarImg}" x="${x - nodeR + 1.5}" y="${y - nodeR + 1.5}" width="${(nodeR - 1.5) * 2}" height="${(nodeR - 1.5) * 2}" clip-path="url(#clip-radar-${friend.id})" preserveAspectRatio="xMidYMid slice" />
            ` : `
              <text x="${x}" y="${y + 5}" text-anchor="middle" font-size="${nodeR * 0.9}px" style="user-select:none;">${friend.avatar || '👤'}</text>
            `}
            <text x="${x}" y="${y + nodeR + 10}" text-anchor="middle" font-size="9px" font-weight="${isSelected ? '900' : '700'}" fill="${isSelected ? '#00BA88' : '#334155'}" style="user-select:none; pointer-events: none;">${friend.name.split(' ')[0]}</text>
          </g>
        `;
      });
    });

    const radarSvg = `
      <svg id="orbit-radar-svg" class="orbit-radar-svg" viewBox="0 0 350 350">
        <defs>${clipDefs}</defs>
        
        <!-- Subtle Quadrant Lines -->
        <line x1="${cx}" y1="20" x2="${cx}" y2="330" stroke="#f1f5f9" stroke-width="1.2" stroke-dasharray="3 3" />
        <line x1="20" y1="${cy}" x2="330" y2="${cy}" stroke="#f1f5f9" stroke-width="1.2" stroke-dasharray="3 3" />

        <!-- Clean Sector Category Labels -->
        <text x="${cx}" y="14" text-anchor="middle" font-size="9px" font-weight="700" fill="#94a3b8">المپیاد و علم</text>
        <text x="340" y="${cy + 3.5}" text-anchor="end" font-size="9px" font-weight="700" fill="#94a3b8">درس و مدرسه</text>
        <text x="${cx}" y="344" text-anchor="middle" font-size="9px" font-weight="700" fill="#94a3b8">ورزش و بازی</text>
        <text x="10" y="${cy + 3.5}" text-anchor="start" font-size="9px" font-weight="700" fill="#94a3b8">هنر و فرهنگ</text>

        <!-- Concentric Orbit Rings -->
        ${ringsSvg}

        <!-- Center Node (You) -->
        <g class="radar-center-user" style="cursor: default;">
          <circle cx="${cx}" cy="${cy}" r="26" fill="rgba(0, 186, 136, 0.08)" />
          <circle cx="${cx}" cy="${cy}" r="22" fill="#ffffff" stroke="#00BA88" stroke-width="2.2" />
          <image href="./assets/avatar.png" x="${cx - 21}" y="${cy - 21}" width="42" height="42" clip-path="url(#radar-user-clip)" preserveAspectRatio="xMidYMid slice" />
          <text x="${cx}" y="${cy + 34}" text-anchor="middle" font-size="9.5px" font-weight="800" fill="#1e293b">شما</text>
        </g>

        <!-- Friend Nodes -->
        ${nodesSvg}
      </svg>
    `;

    // Minimalist Selected Friend Detail Card
    let friendCardHtml = '';
    if (currentFriend) {
      const presetRoles = [
        'صمیمی‌ترین رفیق',
        'هم‌یار درسی',
        'هم‌پای المپیاد',
        'هم‌میزی کلاس',
        'کاپیتان فیفا'
      ];

      friendCardHtml = `
        <div class="orbit-friend-card">
          <div class="ofc-header">
            <div class="ofc-avatar-wrap">
              ${currentFriend.avatarImg ? `
                <img src="${currentFriend.avatarImg}" class="ofc-avatar-img" alt="${currentFriend.name}" />
              ` : `
                <span style="font-size: 24px;">${currentFriend.avatar || '👤'}</span>
              `}
            </div>
            <div class="ofc-info">
              <div class="ofc-name-row">
                <span class="ofc-name">${currentFriend.name}</span>
                <span class="ofc-role-badge">${currentFriend.relation}</span>
              </div>
              <p class="ofc-sub-info">${(currentFriend.hours || 2).toLocaleString('fa-IR')} ساعت در هفته • ${currentFriend.bio || 'دانش‌آموز شاد'}</p>
            </div>
          </div>

          <!-- Segmented Orbit Switcher -->
          <div class="ofc-orbit-segmented">
            <button type="button" class="ofc-orbit-tab ${currentFriend.orbitKey === 'orbit1' ? 'active' : ''}" onclick="window.uiController.changeFriendOrbit(${currentFriend.id}, 'orbit1')">
              <span>🪐</span><span>صمیمی</span>
            </button>
            <button type="button" class="ofc-orbit-tab ${currentFriend.orbitKey === 'orbit2' ? 'active' : ''}" onclick="window.uiController.changeFriendOrbit(${currentFriend.id}, 'orbit2')">
              <span>✨</span><span>هم‌یار</span>
            </button>
            <button type="button" class="ofc-orbit-tab ${currentFriend.orbitKey === 'orbit3' ? 'active' : ''}" onclick="window.uiController.changeFriendOrbit(${currentFriend.id}, 'orbit3')">
              <span>🎯</span><span>هم‌کلاسی</span>
            </button>
            <button type="button" class="ofc-orbit-tab ${currentFriend.orbitKey === 'orbit4' ? 'active' : ''}" onclick="window.uiController.changeFriendOrbit(${currentFriend.id}, 'orbit4')">
              <span>🌐</span><span>شبکه</span>
            </button>
          </div>

          <!-- Quick Roles Row -->
          <div class="ofc-roles-row">
            ${presetRoles.map(role => `
              <button type="button" class="ofc-role-chip ${currentFriend.relation === role ? 'active' : ''}" onclick="window.uiController.changeFriendRole(${currentFriend.id}, '${role}')">
                ${role}
              </button>
            `).join('')}
          </div>

          <!-- Single Clean Action Bar -->
          <div class="ofc-action-bar">
            <button type="button" class="btn btn-primary" style="flex: 1; padding: 7px 12px; font-size: 11px; border-radius: 10px;" onclick="window.uiController.sendChatMessage('${currentFriend.name}')">
              💬 ارسال پیام در شاد
            </button>
            <button type="button" class="btn btn-secondary" style="padding: 7px 12px; font-size: 11px; border-radius: 10px;" onclick="window.uiController.sendWave('${currentFriend.name}')">
              👋 سلام
            </button>
          </div>
        </div>
      `;
    }

    return `
      <div class="orbit-manager-wrap">
        <!-- Minimal Summary Strip -->
        <div class="orbit-summary-strip">
          <div class="orbit-summary-item" style="color: #2563eb;"><span>🪐 صمیمی:</span> <b>${o1.length.toLocaleString('fa-IR')}</b></div>
          <div class="orbit-summary-item" style="color: #059669;"><span>✨ هم‌یار:</span> <b>${o2.length.toLocaleString('fa-IR')}</b></div>
          <div class="orbit-summary-item" style="color: #475569;"><span>🎯 هم‌کلاسی:</span> <b>${o3.length.toLocaleString('fa-IR')}</b></div>
          <div class="orbit-summary-item" style="color: #64748b;"><span>🌐 شبکه:</span> <b>${o4.length.toLocaleString('fa-IR')}</b></div>
        </div>

        <!-- Radar Canvas -->
        <div class="orbit-radar-box">
          <div class="radar-drag-hint">👆 آواتارها را بکشید و روی دایره‌ها رها کنید تا جابجا شوند</div>
          ${radarSvg}
        </div>

        <!-- Clean Inspector Card -->
        ${friendCardHtml}
      </div>
    `;
  }

  openEditGoalModal() {
    const s = window.rokhStore.getState();
    const g = s.futureGoal || {};
    const html = `
      <form onsubmit="window.uiController.handleSaveGoal(event)">
        <div class="form-group">
          <label class="form-label">عنوان هدف و رشته</label>
          <input type="text" id="input-goal-title" class="form-input" value="${g.title || ''}" required />
        </div>
        <div class="form-group">
          <label class="form-label">دانشگاه یا مقصد هدف</label>
          <input type="text" id="input-goal-target" class="form-input" value="${g.target || ''}" required />
        </div>
        <div class="form-group">
          <label class="form-label">افق زمانی</label>
          <input type="text" id="input-goal-horizon" class="form-input" value="${g.horizon || 'هدف ۱۴۱۰'}" />
        </div>
        <div class="modal-actions" style="margin-top: 14px;">
          <button type="button" class="btn btn-secondary" onclick="window.uiController.closeModal()">انصراف</button>
          <button type="submit" class="btn btn-primary">ذخیره تغییرات</button>
        </div>
      </form>
    `;
    this.openModal(html, '🎯 ویرایش هدف آینده و دانشگاه');
  }

  handleSaveGoal(e) {
    e.preventDefault();
    const s = window.rokhStore.getState();
    s.futureGoal = {
      title: document.getElementById('input-goal-title').value.trim(),
      target: document.getElementById('input-goal-target').value.trim(),
      horizon: document.getElementById('input-goal-horizon').value.trim()
    };
    window.rokhStore.saveState();
    window.rokhStore.notify();
    this.closeModal();
    this.showToast('هدف آینده با موفقیت به‌روزرسانی شد ✓', 'success');
  }

  openEditBooksModal() {
    const s = window.rokhStore.getState();
    const books = s.books || [];
    const html = `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <p style="font-size: 11.5px; color: #475569; margin: 0;">کتاب‌های برگزیده روی میز مطالعه شما:</p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${books.map((b) => `
            <div style="display: flex; align-items: center; justify-content: space-between; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 8px 12px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <img src="${b.cover}" style="width: 28px; height: 38px; object-fit: cover; border-radius: 4px;" alt="${b.title}" />
                <div>
                  <p style="font-size: 11px; font-weight: 800; color: #0f172a; margin: 0;">${b.title}</p>
                  <span style="font-size: 9.5px; color: #64748b;">${b.author}</span>
                </div>
              </div>
              <span style="font-size: 10px; color: #10b981; font-weight: 700;">سنجاق شده ✓</span>
            </div>
          `).join('')}
        </div>
        <div class="modal-actions" style="margin-top: 10px;">
          <button type="button" class="btn btn-primary" style="width: 100%;" onclick="window.uiController.closeModal()">متوجه شدم</button>
        </div>
      </div>
    `;
    this.openModal(html, '📚 کتاب‌های روی میز مطالعه');
  }

  openSettingsModal() {
    const s = window.rokhStore.getState();
    const isOwner = s.viewMode === 'owner';
    const isLight = s.theme === 'light';

    const html = `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <!-- View mode setting -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 12.5px; font-weight: 800; color: #0f172a; display: block;">حالت نمایش پروفایل</span>
            <span style="font-size: 10px; color: #64748b;">${isOwner ? 'دید صاحب حساب (دسترسی ویرایش)' : 'دید سایر دانش‌آموزان و بازدیدکنندگان'}</span>
          </div>
          <button class="btn btn-secondary" style="font-size: 11px; padding: 5px 12px; border-radius: 999px;" onclick="window.rokhStore.setViewMode('${isOwner ? 'visitor' : 'owner'}'); window.uiController.closeModal(); window.uiController.showToast('حالت نمایش تغییر کرد', 'info');">
            ${isOwner ? 'تغییر به دید بقیه 👁️' : 'تغییر به دید خودم 👤'}
          </button>
        </div>

        <!-- Theme setting -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 12.5px; font-weight: 800; color: #0f172a; display: block;">تم و ظاهر اپلیکیشن</span>
            <span style="font-size: 10px; color: #64748b;">حالت فعلی: ${isLight ? 'تم روشن' : 'تم استاندارد شاد'}</span>
          </div>
          <button class="btn btn-secondary" style="font-size: 11px; padding: 5px 12px; border-radius: 999px;" onclick="window.rokhStore.toggleTheme(); window.uiController.closeModal();">
            ${isLight ? '🌙 تم استاندارد' : '☀️ تم روشن'}
          </button>
        </div>

        <!-- Reset setting -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <span style="font-size: 12.5px; font-weight: 800; color: #0f172a; display: block;">بازنشانی اطلاعات رُخ</span>
            <span style="font-size: 10px; color: #64748b;">برگشت چیدمان و داده‌ها به حالت پیش‌فرض اولیه</span>
          </div>
          <button class="btn btn-secondary" style="font-size: 11px; padding: 5px 12px; border-radius: 999px; color: #ef4444;" onclick="window.rokhStore.resetToDefault(); window.uiController.closeModal(); window.uiController.showToast('پروفایل به حالت اولیه بازگشت', 'info');">
            ↺ ریست داده‌ها
          </button>
        </div>

        <div style="margin-top: 6px;">
          <button class="btn btn-primary" style="width: 100%; border-radius: 12px; padding: 10px; font-weight: 800;" onclick="window.uiController.closeModal()">
            بستن
          </button>
        </div>
      </div>
    `;

    this.openModal(html, '⚙️ تنظیمات پروفایل رُخ');
  }

  openBadgeDetailModal(badgeId) {
    const s = window.rokhStore.getState();
    const b = (s.badges || []).find(item => item.id === badgeId);
    if (!b) return;

    const badgeGraphic = b.image
      ? `<img src="${b.image}" alt="${b.title}" style="width: 100px; height: 100px; object-fit: contain; filter: drop-shadow(0 8px 18px rgba(0,0,0,0.15));" />`
      : (window.getTarteelBadgeSvg ? window.getTarteelBadgeSvg(b.type, b.earned) : '🏆');

    const html = `
      <div style="display: flex; flex-direction: column; align-items: center; text-align: center; gap: 14px; padding: 10px 4px;">
        <div style="width: 100px; height: 100px; display: flex; align-items: center; justify-content: center;">
          ${badgeGraphic}
        </div>

        <div style="display: flex; flex-direction: column; gap: 4px;">
          <h3 style="font-size: 17px; font-weight: 900; color: #0F172A; margin: 0;">${b.title}</h3>
          <span style="font-size: 12px; font-weight: 700; color: #64748B;">${b.sub}</span>
        </div>

        <div style="background: ${b.earned ? '#F0FDF4' : '#F8FAFC'}; border: 1.5px solid ${b.earned ? '#86EFAC' : '#E2E8F0'}; border-radius: 14px; padding: 12px 16px; width: 100%; text-align: right;">
          <p style="font-size: 12px; line-height: 1.8; color: #334155; margin: 0 0 10px 0;">${b.description || ''}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid ${b.earned ? '#DCFCE7' : '#E2E8F0'}; padding-top: 8px; font-size: 11px;">
            <span style="color: #64748B; font-weight: 700;">سطح نشان: <b style="color: #0F172A;">${b.tierName || 'استاندارد'}</b></span>
            <span style="color: #10B981; font-weight: 800;">${b.reward || '+۵۰ امتیاز'}</span>
          </div>
        </div>

        <div style="width: 100%; background: #F1F5F9; border-radius: 12px; padding: 10px 14px; display: flex; flex-direction: column; gap: 6px; text-align: right;">
          <div style="display: flex; justify-content: space-between; font-size: 11px; font-weight: 800;">
            <span style="color: #475569;">وضعیت دستیابی:</span>
            <span style="color: ${b.earned ? '#15803D' : '#D97706'};">${b.earned ? 'کسب شده ✓ (' + (b.date || 'مهر ۱۴۰۴') + ')' : b.ratio + ' (' + b.progress + ')'}</span>
          </div>
          ${!b.earned ? `
            <div style="width: 100%; height: 6px; background: #E2E8F0; border-radius: 999px; overflow: hidden;">
              <div style="width: ${b.progress}; height: 100%; background: linear-gradient(90deg, #3B82F6, #6366F1); border-radius: 999px;"></div>
            </div>
            <span style="font-size: 10px; font-weight: 700; color: #D97706;">⚡ ${b.remaining || ''}</span>
          ` : ''}
        </div>

        <button class="btn btn-primary" style="width: 100%; border-radius: 12px; padding: 11px; font-weight: 800; margin-top: 4px;" onclick="window.uiController.closeModal()">
          بستن
        </button>
      </div>
    `;

    this.openModal(html, `🎖️ جزییات نشان «${b.title}»`);
  }
}

window.uiController = new UIController();


