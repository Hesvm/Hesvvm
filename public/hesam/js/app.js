// App Rendering Engine for Shaad Rokh Profile

  // =========================================================================
  // TARTEEL AI 3D BADGES SVG GENERATOR & RENDERER (رفرنس رسمی ترتیل)
  // =========================================================================
  window.getTarteelBadgeSvg = function(type, earned) {
    if (type === 'gold') {
      return `
        <svg viewBox="0 0 100 100" class="tarteel-svg-icon">
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FDE047"/>
              <stop offset="45%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#B45309"/>
            </linearGradient>
            <linearGradient id="goldRim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FEF3C7"/>
              <stop offset="100%" stop-color="#78350F"/>
            </linearGradient>
            <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#F59E0B" flood-opacity="0.4"/>
            </filter>
          </defs>
          <path d="M50 6 L84 20 C84 58 50 84 50 94 C50 84 16 58 16 20 Z" fill="url(#goldRim)" filter="url(#goldGlow)"/>
          <path d="M50 11 L79 23 C79 54 50 78 50 87 C50 78 21 54 21 23 Z" fill="url(#goldGrad)"/>
          <path d="M50 11 L79 23 C79 54 50 78 50 87 Z" fill="rgba(255,255,255,0.22)"/>
          <circle cx="50" cy="46" r="17" fill="#78350F" opacity="0.25"/>
          <path d="M50 32 L53.5 42 L64 42.5 L55.5 48.5 L58.5 59 L50 53 L41.5 59 L44.5 48.5 L36 42.5 L46.5 42 Z" fill="#FFFBEB"/>
          <!-- 3D Banner Ribbon -->
          <path d="M24 78 L50 72 L76 78 L71 89 L50 83 L29 89 Z" fill="#78350F"/>
          <path d="M28 77 L50 72 L72 77 L68 86 L50 81 L32 86 Z" fill="#F59E0B"/>
          <text x="50" y="82" font-size="7.5" font-weight="900" fill="#78350F" text-anchor="middle" font-family="Vazirmatn, sans-serif">طلایی</text>
        </svg>
      `;
    } else if (type === 'emerald') {
      return `
        <svg viewBox="0 0 100 100" class="tarteel-svg-icon">
          <defs>
            <linearGradient id="emGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#6EE7B7"/>
              <stop offset="45%" stop-color="#10B981"/>
              <stop offset="100%" stop-color="#047857"/>
            </linearGradient>
            <linearGradient id="emRim" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#D1FAE5"/>
              <stop offset="100%" stop-color="#064E3B"/>
            </linearGradient>
            <filter id="emGlow">
              <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#10B981" flood-opacity="0.35"/>
            </filter>
          </defs>
          <polygon points="50,6 88,27 88,73 50,94 12,73 12,27" fill="url(#emRim)" filter="url(#emGlow)"/>
          <polygon points="50,11 83,29 83,70 50,89 17,70 17,29" fill="url(#emGrad)"/>
          <polygon points="50,11 83,29 83,70 50,89" fill="rgba(255,255,255,0.18)"/>
          <circle cx="50" cy="48" r="16" fill="#064E3B" opacity="0.25"/>
          <path d="M46 34 L54 34 L54 43 L62 57 C63 59 61 62 58 62 L42 62 C39 62 37 59 38 57 L46 43 Z" fill="#ECFDF5"/>
          <path d="M40 55 L60 55 L58 60 L42 60 Z" fill="#34D399"/>
          <!-- 3D Ribbon -->
          <path d="M24 78 L50 72 L76 78 L71 89 L50 83 L29 89 Z" fill="#064E3B"/>
          <path d="M28 77 L50 72 L72 77 L68 86 L50 81 L32 86 Z" fill="#10B981"/>
          <text x="50" y="82" font-size="7.5" font-weight="900" fill="#ECFDF5" text-anchor="middle" font-family="Vazirmatn, sans-serif">زمردی</text>
        </svg>
      `;
    } else if (type === 'ruby') {
      return `
        <svg viewBox="0 0 100 100" class="tarteel-svg-icon">
          <defs>
            <linearGradient id="rubyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FCA5A5"/>
              <stop offset="45%" stop-color="#EF4444"/>
              <stop offset="100%" stop-color="#991B1B"/>
            </linearGradient>
            <linearGradient id="flameInner" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#FEF08A"/>
              <stop offset="100%" stop-color="#F97316"/>
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill="#7F1D1D" filter="drop-shadow(0 5px 12px rgba(239,68,68,0.4))"/>
          <circle cx="50" cy="50" r="40" fill="url(#rubyGrad)"/>
          <path d="M50 18 C50 18 64 33 64 47 C64 60 53 70 50 70 C47 70 36 60 36 47 C36 33 50 18 50 18 Z" fill="url(#flameInner)"/>
          <path d="M50 34 C50 34 57 43 57 50 C57 57 53 62 50 62 C47 62 43 57 43 50 C43 43 50 34 50 34 Z" fill="#FFFBEB"/>
          <!-- 3D Ribbon -->
          <path d="M24 78 L50 72 L76 78 L71 89 L50 83 L29 89 Z" fill="#7F1D1D"/>
          <path d="M28 77 L50 72 L72 77 L68 86 L50 81 L32 86 Z" fill="#EF4444"/>
          <text x="50" y="82" font-size="7.5" font-weight="900" fill="#FFFBEB" text-anchor="middle" font-family="Vazirmatn, sans-serif">یاقوتی</text>
        </svg>
      `;
    } else if (type === 'sapphire') {
      return `
        <svg viewBox="0 0 100 100" class="tarteel-svg-icon" style="filter: drop-shadow(0 4px 10px rgba(0,0,0,0.18));">
          <defs>
            <linearGradient id="saphGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#93C5FD"/>
              <stop offset="50%" stop-color="#3B82F6"/>
              <stop offset="100%" stop-color="#1E3A8A"/>
            </linearGradient>
          </defs>
          <polygon points="50,6 82,18 94,50 82,82 50,94 18,82 6,50 18,18" fill="#1E3A8A"/>
          <polygon points="50,11 78,21 89,50 78,79 50,89 22,79 11,50 22,21" fill="url(#saphGrad)"/>
          <path d="M30 38 C38 36 47 38 50 42 C53 38 62 36 70 38 L70 62 C62 60 53 62 50 65 C47 62 38 60 30 62 Z" fill="#EFF6FF"/>
          <!-- 3D Golden Padlock Overlay -->
          <circle cx="50" cy="50" r="20" fill="rgba(15, 23, 42, 0.8)" stroke="#F59E0B" stroke-width="2"/>
          <rect x="42" y="47" width="16" height="13" rx="3" fill="#F59E0B"/>
          <path d="M45 47 L45 41 C45 38 55 38 55 41 L55 47" stroke="#F59E0B" stroke-width="2.5" fill="none"/>
          <circle cx="50" cy="52.5" r="1.5" fill="#78350F"/>
          <path d="M50 54 L50 57" stroke="#78350F" stroke-width="1.5"/>
        </svg>
      `;
    } else if (type === 'amethyst') {
      return `
        <svg viewBox="0 0 100 100" class="tarteel-svg-icon" style="filter: drop-shadow(0 4px 10px rgba(0,0,0,0.18));">
          <defs>
            <linearGradient id="ameGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#C4B5FD"/>
              <stop offset="50%" stop-color="#8B5CF6"/>
              <stop offset="100%" stop-color="#4C1D95"/>
            </linearGradient>
          </defs>
          <polygon points="50,8 90,50 50,92 10,50" fill="#4C1D95"/>
          <polygon points="50,13 85,50 50,87 15,50" fill="url(#ameGrad)"/>
          <circle cx="50" cy="33" r="3.5" fill="#EDE9FE"/>
          <circle cx="33" cy="50" r="3.5" fill="#EDE9FE"/>
          <circle cx="67" cy="50" r="3.5" fill="#EDE9FE"/>
          <circle cx="50" cy="67" r="3.5" fill="#EDE9FE"/>
          <path d="M50 33 L33 50 L50 67 L67 50 Z" stroke="#EDE9FE" stroke-width="1.5" fill="none"/>
          <!-- 3D Golden Padlock Overlay -->
          <circle cx="50" cy="50" r="20" fill="rgba(15, 23, 42, 0.8)" stroke="#F59E0B" stroke-width="2"/>
          <rect x="42" y="47" width="16" height="13" rx="3" fill="#F59E0B"/>
          <path d="M45 47 L45 41 C45 38 55 38 55 41 L55 47" stroke="#F59E0B" stroke-width="2.5" fill="none"/>
          <circle cx="50" cy="52.5" r="1.5" fill="#78350F"/>
          <path d="M50 54 L50 57" stroke="#78350F" stroke-width="1.5"/>
        </svg>
      `;
    } else {
      // amber
      return `
        <svg viewBox="0 0 100 100" class="tarteel-svg-icon" style="filter: drop-shadow(0 4px 10px rgba(0,0,0,0.18));">
          <defs>
            <linearGradient id="ambGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#FDE68A"/>
              <stop offset="50%" stop-color="#F59E0B"/>
              <stop offset="100%" stop-color="#78350F"/>
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="44" fill="#78350F"/>
          <circle cx="50" cy="50" r="40" fill="url(#ambGrad)"/>
          <circle cx="50" cy="40" r="12" fill="#FEF3C7"/>
          <path d="M22 68 L44 48 L56 58 L78 38 L88 68 Z" fill="#78350F"/>
          <!-- 3D Golden Padlock Overlay -->
          <circle cx="50" cy="50" r="20" fill="rgba(15, 23, 42, 0.8)" stroke="#F59E0B" stroke-width="2"/>
          <rect x="42" y="47" width="16" height="13" rx="3" fill="#F59E0B"/>
          <path d="M45 47 L45 41 C45 38 55 38 55 41 L55 47" stroke="#F59E0B" stroke-width="2.5" fill="none"/>
          <circle cx="50" cy="52.5" r="1.5" fill="#78350F"/>
          <path d="M50 54 L50 57" stroke="#78350F" stroke-width="1.5"/>
        </svg>
      `;
    }
  };

  // State for Badges Filter
  window.currentBadgeFilter = window.currentBadgeFilter || 'all';

  window.setBadgesFilter = function(filterMode) {
    window.currentBadgeFilter = filterMode;
    window.renderBadgesSection();
  };

  window.renderBadgesSection = function() {
    const badgesSection = document.getElementById('badges-area');
    if (!badgesSection) return;
    const s = window.rokhStore.getState();
    const badges = s.badges || [];

    const cardsHtml = badges.map(b => {
      const badgeImgHtml = b.image
        ? `<img src="${b.image}" alt="${b.title}" class="tarteel-crest-img" />`
        : window.getTarteelBadgeSvg(b.type, b.earned);

      if (b.earned) {
        return `
          <div class="badge-card-tarteel earned" onclick="window.uiController.openBadgeDetailModal(${b.id})" title="کلیک برای مشاهده جزییات و پاداش">
            <div class="tarteel-icon-wrap">
              ${badgeImgHtml}
            </div>
            <div class="tarteel-card-meta">
              <h4 class="tarteel-badge-title">${b.title}</h4>
              <span class="tarteel-badge-sub">${b.sub}</span>
              <span class="tarteel-earned-pill">کسب شده ✓</span>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="badge-card-tarteel locked" onclick="window.uiController.openBadgeDetailModal(${b.id})" title="کلیک برای مشاهده مأموریت‌های بازگشایی">
            <div class="tarteel-icon-wrap" style="position: relative;">
              <div class="tarteel-locked-img-wrap">
                ${badgeImgHtml}
              </div>
              <div class="tarteel-locked-badge-lock-icon">
                🔒
              </div>
            </div>
            <div class="tarteel-card-meta">
              <h4 class="tarteel-badge-title">${b.title}</h4>
              <span class="tarteel-badge-sub">${b.sub}</span>
              <div class="tarteel-locked-progress">
                <div class="tarteel-prog-track">
                  <div class="tarteel-prog-fill" style="width: ${b.progress};"></div>
                </div>
                <div class="tarteel-prog-info">
                  <span>${b.ratio || ''}</span>
                  <span>${b.progress}</span>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }).join('');

    badgesSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M6 9a6 6 0 1 0 12 0c0-3.31-2.69-6-6-6S6 5.69 6 9Z"/><path d="m9 14.5-2.5 7.5 5.5-3 5.5 3-2.5-7.5"/></svg>
            <span>مدال‌ها و افتخارات شاد</span>
          </span>
          <span class="section-more-link" onclick="window.uiController.showToast('ویترین جامع نشان‌های افتخار شبکه دانش‌آموزی شاد', 'info')">همه ۲۴ نشان ›</span>
        </span>

        <!-- Tarteel 3D Badges Grid -->
        <div class="badges-grid-tarteel" style="margin-top: 10px;">
          ${cardsHtml}
        </div>
      </div>
    `;
  };

  // =========================================================================
  // SCALABLE FRIENDSHIP ORBIT & TIERED ROSTER SYSTEM (شبکه ۳۰۰ دانش‌آموز)
  // =========================================================================
  window.currentOrbitView = window.currentOrbitView || 'orbit';
  window.currentOrbitLevel = window.currentOrbitLevel || 0; // 0: all, 1, 2, 3, 4

  window.setOrbitViewMode = function(mode) {
    window.currentOrbitView = mode;
    window.renderOrbitSection();
  };

  window.setOrbitLevelFilter = function(lvl) {
    window.currentOrbitLevel = lvl;
    window.renderOrbitSection();
  };

  window.renderOrbitSection = function() {
    const orbitSection = document.getElementById('orbit-area');
    if (!orbitSection) return;
    const s = window.rokhStore.getState();
    const o1 = s.orbitNetwork.orbit1 || [];
    const o2 = s.orbitNetwork.orbit2 || [];
    const o3 = s.orbitNetwork.orbit3 || [];
    const o4 = s.orbitNetwork.orbit4 || [];

    const isOrbitView = window.currentOrbitView === 'orbit';

    let contentHtml = '';

    if (isOrbitView) {
      // Visual Radar Orbit View
      const hl1 = window.currentOrbitLevel === 1 ? 'highlighted' : '';
      const hl2 = window.currentOrbitLevel === 2 ? 'highlighted' : '';
      const hl3 = window.currentOrbitLevel === 3 ? 'highlighted' : '';
      const hl4 = window.currentOrbitLevel === 4 ? 'highlighted' : '';

      let spotlightText = {
        title: 'مدار ۱: حلقهٔ صمیمی‌ترین‌ها (۴ دوست نزدیک)',
        sub: 'میانگین گفتگو: ۶.۲ ساعت در هفته • فعالیت مشترک: کانون نجوم و المپیاد کامپیوتر'
      };
      if (window.currentOrbitLevel === 2) {
        spotlightText = {
          title: 'مدار ۲: هم‌یاران درسی و ورزشی (۸ دانش‌آموز)',
          sub: 'هم‌پایان شطرنج، مسابقات رباتیک و آزمایشگاه فیزیک دبیرستان'
        };
      } else if (window.currentOrbitLevel === 3) {
        spotlightText = {
          title: 'مدار ۳: هم‌پایه‌های دهم ریاضی البرز (۳۶ نفر)',
          sub: 'هم‌کلاسی‌های پایه دهم در کانال رسمی کلاس و تمرین‌های هفتگی'
        };
      } else if (window.currentOrbitLevel === 4) {
        spotlightText = {
          title: 'مدار ۴: کل شبکه دبیرستان ماندگار البرز (۱۸۰+ دانش‌آموز)',
          sub: 'پایه‌های دهم تا دوازدهم فعال در لیگ‌ها و تشکل‌های دانش‌آموزی'
        };
      }

      contentHtml = `
        <div class="orbit-radar-canvas" title="شبکهٔ مداری دانش‌آموزان">
          <div class="orbit-radar-ring r-4 ${hl4}"></div>
          <div class="orbit-radar-ring r-3 ${hl3}"></div>
          <div class="orbit-radar-ring r-2 ${hl2}"></div>
          <div class="orbit-radar-ring r-1 ${hl1}"></div>

          <!-- Center User Avatar (Hesam) -->
          <div class="radar-center-avatar" title="حسام موسوی‌زاده (مرکز مدار)">
            <img src="./assets/avatar.png" style="width:100%; height:100%; object-fit:cover;" alt="حسام" />
          </div>

          <!-- Orbit 1 Nodes (Close Friends) -->
          ${o1[0] ? `
            <div class="orbit-student-node" style="top: 130px; right: 198px;" onclick="window.uiController.openOrbitManagerModal(${o1[0].id})" title="${o1[0].name}">
              <img src="${o1[0].avatarImg}" class="orbit-node-photo" style="width: 34px; height: 34px; border-color: #F59E0B;" alt="${o1[0].name}" />
              <span class="orbit-node-name-pill">${o1[0].name.split(' ')[0]}</span>
            </div>
          ` : ''}
          ${o1[1] ? `
            <div class="orbit-student-node" style="top: 130px; left: 198px;" onclick="window.uiController.openOrbitManagerModal(${o1[1].id})" title="${o1[1].name}">
              <img src="${o1[1].avatarImg}" class="orbit-node-photo" style="width: 34px; height: 34px; border-color: #F59E0B;" alt="${o1[1].name}" />
              <span class="orbit-node-name-pill">${o1[1].name.split(' ')[0]}</span>
            </div>
          ` : ''}
          ${o1[2] ? `
            <div class="orbit-student-node" style="top: 172px; right: 165px;" onclick="window.uiController.openOrbitManagerModal(${o1[2].id})" title="${o1[2].name}">
              <img src="${o1[2].avatarImg}" class="orbit-node-photo" style="width: 32px; height: 32px; border-color: #F59E0B;" alt="${o1[2].name}" />
              <span class="orbit-node-name-pill">${o1[2].name.split(' ')[0]}</span>
            </div>
          ` : ''}
          ${o1[3] ? `
            <div class="orbit-student-node" style="top: 172px; left: 165px;" onclick="window.uiController.openOrbitManagerModal(${o1[3].id})" title="${o1[3].name}">
              <img src="${o1[3].avatarImg}" class="orbit-node-photo" style="width: 32px; height: 32px; border-color: #F59E0B;" alt="${o1[3].name}" />
              <span class="orbit-node-name-pill">${o1[3].name.split(' ')[0]}</span>
            </div>
          ` : ''}

          <!-- Orbit 2 Nodes (Study Partners) -->
          ${o2[0] ? `
            <div class="orbit-student-node" style="top: 86px; right: 170px;" onclick="window.uiController.openOrbitManagerModal(${o2[0].id})" title="${o2[0].name}">
              <img src="${o2[0].avatarImg}" class="orbit-node-photo" style="width: 29px; height: 29px; border-color: #0EA5E9;" alt="${o2[0].name}" />
              <span class="orbit-node-name-pill">${o2[0].name.split(' ')[0]}</span>
            </div>
          ` : ''}
          ${o2[1] ? `
            <div class="orbit-student-node" style="top: 86px; left: 170px;" onclick="window.uiController.openOrbitManagerModal(${o2[1].id})" title="${o2[1].name}">
              <img src="${o2[1].avatarImg}" class="orbit-node-photo" style="width: 29px; height: 29px; border-color: #0EA5E9;" alt="${o2[1].name}" />
              <span class="orbit-node-name-pill">${o2[1].name.split(' ')[0]}</span>
            </div>
          ` : ''}
          ${o2[2] ? `
            <div class="orbit-student-node" style="top: 110px; right: 236px;" onclick="window.uiController.openOrbitManagerModal(${o2[2].id})" title="${o2[2].name}">
              <img src="${o2[2].avatarImg}" class="orbit-node-photo" style="width: 27px; height: 27px; border-color: #0EA5E9;" alt="${o2[2].name}" />
              <span class="orbit-node-name-pill">${o2[2].name.split(' ')[0]}</span>
            </div>
          ` : ''}
          ${o2[3] ? `
            <div class="orbit-student-node" style="top: 110px; left: 236px;" onclick="window.uiController.openOrbitManagerModal(${o2[3].id})" title="${o2[3].name}">
              <img src="${o2[3].avatarImg}" class="orbit-node-photo" style="width: 27px; height: 27px; border-color: #0EA5E9;" alt="${o2[3].name}" />
              <span class="orbit-node-name-pill">${o2[3].name.split(' ')[0]}</span>
            </div>
          ` : ''}

          <!-- Orbit 3 Nodes (Grade Peers) -->
          ${o3[0] ? `
            <div class="orbit-student-node" style="top: 50px; right: 180px;" onclick="window.uiController.openOrbitManagerModal(${o3[0].id})" title="${o3[0].name}">
              <img src="${o3[0].avatarImg}" class="orbit-node-photo" style="width: 26px; height: 26px; border-color: #6366F1;" alt="${o3[0].name}" />
              <span class="orbit-node-name-pill">${o3[0].name.split(' ')[0]}</span>
            </div>
          ` : ''}
          ${o3[1] ? `
            <div class="orbit-student-node" style="top: 50px; left: 180px;" onclick="window.uiController.openOrbitManagerModal(${o3[1].id})" title="${o3[1].name}">
              <img src="${o3[1].avatarImg}" class="orbit-node-photo" style="width: 26px; height: 26px; border-color: #6366F1;" alt="${o3[1].name}" />
              <span class="orbit-node-name-pill">${o3[1].name.split(' ')[0]}</span>
            </div>
          ` : ''}
          ${o3[2] ? `
            <div class="orbit-student-node" style="top: 72px; right: 260px;" onclick="window.uiController.openOrbitManagerModal(${o3[2].id})" title="${o3[2].name}">
              <img src="${o3[2].avatarImg}" class="orbit-node-photo" style="width: 25px; height: 25px; border-color: #6366F1;" alt="${o3[2].name}" />
              <span class="orbit-node-name-pill">${o3[2].name.split(' ')[0]}</span>
            </div>
          ` : ''}
          ${o3[3] ? `
            <div class="orbit-student-node" style="top: 72px; left: 260px;" onclick="window.uiController.openOrbitManagerModal(${o3[3].id})" title="${o3[3].name}">
              <img src="${o3[3].avatarImg}" class="orbit-node-photo" style="width: 25px; height: 25px; border-color: #6366F1;" alt="${o3[3].name}" />
              <span class="orbit-node-name-pill">${o3[3].name.split(' ')[0]}</span>
            </div>
          ` : ''}

          <!-- Orbit Overflow Cluster (+200 more students visible on zoom) -->
          <div class="orbit-student-node orbit-overflow-node" style="top: 35px; left: 24px;" onclick="window.uiController.showToast('بیش از ۲۰۰ دانش‌آموز دیگر در این بخش قرار دارند. برای مشاهده کامل روی نقشه بزرگ‌نمایی کنید 🔍', 'info')" title="بیش از ۲۰۰ دانش‌آموز دیگر">
            <div class="orbit-cluster-bubble">
              <span class="orbit-cluster-plus">+۲۰۰</span>
              <span class="orbit-cluster-text">نفر</span>
            </div>
          </div>
        </div>
      `;
    } else {
      // Tiered Roster View (حل قطعی مقیاس ۳۰۰ دانش‌آموز)
      contentHtml = `
        <div class="orbit-roster-view">
          <!-- Tier 1: صمیمی‌ترین‌ها -->
          <div class="roster-group-card">
            <div class="roster-group-header">
              <span class="roster-group-title">
                <span style="color: #F59E0B;">⭐</span>
                <span>مدار ۱: حلقهٔ صمیمی‌ترین‌ها (${o1.length.toLocaleString('fa-IR')} نفر)</span>
              </span>
              <span style="font-size: 10px; color: #64748B; font-weight: 700;">تعامل روزانه</span>
            </div>
            <div class="close-friends-row">
              ${o1.map(f => `
                <div class="close-friend-mini-card" onclick="window.uiController.openOrbitManagerModal(${f.id})">
                  <img src="${f.avatarImg}" class="close-friend-thumb" alt="${f.name}" />
                  <div class="close-friend-meta">
                    <span class="close-friend-name">${f.name}</span>
                    <span class="close-friend-role">${f.relation}</span>
                    <span style="font-size: 9px; color: #64748B;">⚡ ${f.hours.toLocaleString('fa-IR')} ساعت گفتگو</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Tier 2: هم‌یاران المپیاد و بازی -->
          <div class="roster-group-card">
            <div class="roster-group-header">
              <span class="roster-group-title">
                <span style="color: #0EA5E9;">🎯</span>
                <span>مدار ۲: هم‌یاران درسی و ورزشی (${o2.length.toLocaleString('fa-IR')} نفر)</span>
              </span>
              <span style="font-size: 10px; color: #64748B; font-weight: 700;">پروژه‌های تیمی</span>
            </div>
            <div class="classmates-pills-wrap">
              ${o2.map(f => `
                <div class="classmate-chip-btn" onclick="window.uiController.openOrbitManagerModal(${f.id})">
                  <img src="${f.avatarImg}" class="classmate-chip-img" alt="${f.name}" />
                  <span>${f.name}</span>
                  <span style="font-size: 9px; color: #0EA5E9; font-weight: 800;">(${f.relation.split(' ')[0]})</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Tier 3: هم‌پایه‌های دهم ریاضی -->
          <div class="roster-group-card">
            <div class="roster-group-header">
              <span class="roster-group-title">
                <span style="color: #6366F1;">🏫</span>
                <span>مدار ۳: هم‌پایه‌های دهم البرز (${(36).toLocaleString('fa-IR')} نفر)</span>
              </span>
              <span style="font-size: 10px; color: #6366F1; font-weight: 700;">کلاس ۱۰/۱ و ۱۰/۲</span>
            </div>
            <div class="classmates-pills-wrap">
              ${o3.map(f => `
                <div class="classmate-chip-btn" onclick="window.uiController.openOrbitManagerModal(${f.id})">
                  <img src="${f.avatarImg}" class="classmate-chip-img" alt="${f.name}" />
                  <span>${f.name}</span>
                </div>
              `).join('')}
              <div class="classmate-chip-btn" style="background: #EEF2FF; color: #4F46E5; font-weight: 800;" onclick="window.uiController.showToast('مشاهده فهرست ۳۶ هم‌پایه دهم دبیرستان البرز', 'info')">
                + ۲۴ هم‌پایه دیگر ›
              </div>
            </div>
          </div>

          <!-- Tier 4: کل دبیرستان ماندگار البرز -->
          <div class="school-stack-card">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="avatar-stack-group">
                <img src="./assets/student_boy_1.jpg" class="avatar-stack-item" />
                <img src="./assets/student_boy_2.jpg" class="avatar-stack-item" />
                <img src="./assets/student_boy_3.jpg" class="avatar-stack-item" />
                <img src="./assets/student_boy_4.jpg" class="avatar-stack-item" />
              </div>
              <div style="display: flex; flex-direction: column; text-align: right;">
                <span style="font-size: 12px; font-weight: 800; color: #0F172A;">شبکه دبیرستان ماندگار البرز</span>
                <span style="font-size: 9.5px; color: #64748B;">۱۸۰+ دانش‌آموز فعال در شاد</span>
              </div>
            </div>
            <button class="btn btn-secondary" style="font-size: 11px; padding: 5px 12px; border-radius: 999px;" onclick="window.uiController.showToast('فهرست دانش‌آموزان دبیرستان البرز در شاد', 'info')">
              مشاهده همه
            </button>
          </div>
        </div>
      `;
    }

    orbitSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/></svg>
            <span>شبکهٔ دوستی در شاد</span>
          </span>
        </span>

        <!-- Filter Chips Row -->
        <div class="orbit-filter-chips-row">
          <button class="orbit-filter-chip ${window.currentOrbitLevel === 0 ? 'active' : ''}" onclick="window.setOrbitLevelFilter(0)">
            <span>همه مدارها (+۲۰۰ نفر)</span>
          </button>
          <button class="orbit-filter-chip ${window.currentOrbitLevel === 1 ? 'active' : ''}" onclick="window.setOrbitLevelFilter(1)">
            <span style="color: #F59E0B;">●</span>
            <span>مدار ۱: صمیمی (${o1.length.toLocaleString('fa-IR')})</span>
          </button>
          <button class="orbit-filter-chip ${window.currentOrbitLevel === 2 ? 'active' : ''}" onclick="window.setOrbitLevelFilter(2)">
            <span style="color: #0EA5E9;">●</span>
            <span>مدار ۲: هم‌یاران (${o2.length.toLocaleString('fa-IR')})</span>
          </button>
          <button class="orbit-filter-chip ${window.currentOrbitLevel === 3 ? 'active' : ''}" onclick="window.setOrbitLevelFilter(3)">
            <span style="color: #6366F1;">●</span>
            <span>مدار ۳: هم‌پایه (${(36).toLocaleString('fa-IR')})</span>
          </button>
          <button class="orbit-filter-chip ${window.currentOrbitLevel === 4 ? 'active' : ''}" onclick="window.setOrbitLevelFilter(4)">
            <span style="color: #94A3B8;">●</span>
            <span>مدار ۴: البرز (${(132).toLocaleString('fa-IR')}+)</span>
          </button>
        </div>

        ${contentHtml}
      </div>
    `;
  };

function renderApp() {
  const s = window.rokhStore.getState();
  const isOwner = s.viewMode !== 'visitor';
  const isLight = s.theme === 'light';

  // Apply Theme to body
  if (isLight) {
    document.body.classList.add('theme-light');
  } else {
    document.body.classList.remove('theme-light');
  }

  // Update switcher buttons UI
  const ownerBtn = document.getElementById('btn-view-owner');
  const visitorBtn = document.getElementById('btn-view-visitor');
  if (ownerBtn && visitorBtn) {
    ownerBtn.classList.toggle('active', isOwner);
    visitorBtn.classList.toggle('active', !isOwner);
  }

  const themeBtn = document.getElementById('btn-theme-switch');
  if (themeBtn) {
    themeBtn.innerHTML = isLight ? '🌙 تم اصلی' : '☀️ تم روشن';
  }

  // 0. Sheet Header Actions (Settings + Edit)
  const sheetActionContainer = document.getElementById('sheet-action-right');
  if (sheetActionContainer) {
    const editBtnHtml = isOwner 
      ? `<button class="sheet-icon-btn" onclick="window.uiController.toggleEditMode(true)" title="ویرایش چیدمان"><svg class="isax-icon" style="width:19px; height:19px;" viewBox="0 0 24 24"><path d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2"/><path d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-1.98-3.58-1.34-4.94.02Z"/><path d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94"/></svg></button>`
      : '';

    const settingsBtnHtml = `
      <button class="sheet-icon-btn" onclick="window.uiController.openSettingsModal()" title="تنظیمات رُخ">
        <svg class="isax-icon" style="width:19px; height:19px;" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>
      </button>
    `;

    sheetActionContainer.innerHTML = settingsBtnHtml + editBtnHtml;
  }

  // 1. Header Banner (Clean - No duplicate pills over cover)
  const bannerContainer = document.getElementById('banner-area');
  if (bannerContainer) {
    bannerContainer.innerHTML = `
      <div class="banner-image"></div>
    `;
  }

  // 2. Identity Info (Directly on white app canvas, no container)
  const identitySection = document.getElementById('identity-area');
  if (identitySection) {
    const mutualsHtml = s.user.mutualFriends.map(f => `
      <span style="background-color: ${f.color};">${f.initial}</span>
    `).join('');

    identitySection.innerHTML = `
      <div class="profile-identity-top-row">
        <div class="avatar-wrapper">
          <div class="avatar-circle" id="user-avatar-circle" ${isOwner ? 'onclick="window.uiController.openEditProfileModal()" title="کلیک برای تغییر آواتار"' : ''}>
            ${s.user.avatar}
          </div>
          <div class="vibe-tag" ${isOwner ? 'onclick="window.uiController.openVibeModal()" title="کلیک برای تنظیم حال‌وهوا و مود"' : `onclick="window.uiController.showToast('مود فعلی: ${s.user.vibe}', 'info')"`}>
            <span>${s.user.vibe}</span>
          </div>
        </div>

        <div class="profile-identity-text-col">
          <div class="user-name-row">
            <h1 class="user-name" id="user-display-name">${s.user.name}</h1>
          </div>
          <p class="user-subtext" id="user-school-info">${s.user.school || 'دبیرستان ماندگار البرز'} • ${s.user.grade || 'دهم ریاضی'}</p>
        </div>
      </div>

      <!-- Student Stats Ribbon (نوار اعتبار، جایگاه رشد و امتیاز فعالیت شاد) -->
      <div class="shad-stats-card">
        <div class="shad-stat-col" onclick="window.uiController.showToast('اعتبار شاد: ۲۴۰ سکه برای جوایز دانش‌آموزی', 'info')">
          <div class="shad-stat-icon-wrap" style="background:#FFFBEB;">
            <img src="./assets/coin.png" class="coin-icon" alt="سکه" />
          </div>
          <div class="shad-stat-info">
            <span class="shad-stat-value">${s.user.credits.toLocaleString('fa-IR')}</span>
            <span class="shad-stat-label">سکه اعتبار</span>
          </div>
        </div>
        
        <div class="shad-stat-divider"></div>
        
        <div class="shad-stat-col" onclick="window.uiController.openLeaguesModal()">
          <div class="shad-stat-icon-wrap" style="background:#F0F9FF;">
            <span style="font-size:16px;">💎</span>
          </div>
          <div class="shad-stat-info">
            <span class="shad-stat-value">سطح ${s.user.level.toLocaleString('fa-IR')}</span>
            <span class="shad-stat-label">لیگ الماس</span>
          </div>
        </div>
        
        <div class="shad-stat-divider"></div>
        
        <div class="shad-stat-col" onclick="window.uiController.showToast('امتیاز فعالیت علمی و پرورشی در دبیرستان البرز', 'info')">
          <div class="shad-stat-icon-wrap" style="background:#ECFDF5;">
            <span style="font-size:16px; color:#00A86B;">⚡</span>
          </div>
          <div class="shad-stat-info">
            <span class="shad-stat-value">${(1420).toLocaleString('fa-IR')}</span>
            <span class="shad-stat-label">امتیاز فعالیت</span>
          </div>
        </div>
      </div>

      <div class="mutual-row" style="display: none;">
        <div class="mutual-avatars">
          ${mutualsHtml}
        </div>
        <span class="mutual-text">${s.user.mutualFriends[0].name}، ${s.user.mutualFriends[1].name} و ${s.user.mutualsCount.toLocaleString('fa-IR')} دوست مشترک دیگر</span>
      </div>
    `;
  }

  // 3. Bio Section
  const bioSection = document.getElementById('bio-content');
  if (bioSection) {
    bioSection.innerHTML = `<p class="bio-text">${s.bio}</p>`;
  }
  const bioEditBtn = document.getElementById('bio-edit-btn');
  if (bioEditBtn) {
    bioEditBtn.style.display = isOwner ? 'inline-block' : 'none';
  }

  // 3.5 Info Widgets (Grade, School, Birthdate, Relation)
  const infoSection = document.getElementById('info-area');
  if (infoSection) {
    infoSection.innerHTML = `
      <div class="section-card student-id-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m0 14H5V8h14v10Z"/></svg>
            <span>شناسنامه دانش‌آموزی</span>
          </span>
        </span>
        <div class="student-id-grid">
          <div class="info-widget-card">
            <div class="info-widget-emoji" style="background:#E6F7F0; color:#008756;">🎒</div>
            <div class="info-widget-text-col">
              <span class="info-widget-header">پایه تحصیلی</span>
              <span class="info-widget-value">${s.user.grade || 'نامشخص'}</span>
            </div>
          </div>
          <div class="info-widget-card">
            <div class="info-widget-emoji" style="background:#F0F9FF; color:#0284C7;">🏫</div>
            <div class="info-widget-text-col">
              <span class="info-widget-header">دبیرستان</span>
              <span class="info-widget-value">${s.user.school || 'نامشخص'}</span>
            </div>
          </div>
          <div class="info-widget-card">
            <div class="info-widget-emoji" style="background:#FFF7ED; color:#EA580C;">🎂</div>
            <div class="info-widget-text-col">
              <span class="info-widget-header">تاریخ تولد</span>
              <span class="info-widget-value">${s.user.birthdate || 'نامشخص'}</span>
            </div>
          </div>
          <div class="info-widget-card">
            <div class="info-widget-emoji" style="background:#F5F3FF; color:#7C3AED;">🤝</div>
            <div class="info-widget-text-col">
              <span class="info-widget-header">رابطه ما</span>
              <span class="info-widget-value">${s.user.relation || 'نامشخص'}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 4. Clubs Section (Chips with Add button)
  const clubsSection = document.getElementById('clubs-area');
  if (clubsSection) {
    const chipsHtml = s.favoriteClubs.map(c => `
      <span class="club-chip">
        <img src="${c.logo}" class="club-chip-logo" alt="${c.name}" />
        <span>${c.name}</span>
      </span>
    `).join('');

    clubsSection.innerHTML = `
      <div class="section-label">
        <span class="section-title-wrap">
          <svg class="isax-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="m6 12 3 5h6l3-5-3-5H9L6 12Z"/><path d="M9 7 6 3.5M15 7l3-3.5M15 17l3 3.5M9 17l-3 3.5M12 2v5M12 17v5"/></svg>
          <span>تیم‌های محبوب من</span>
        </span>
      </div>
      <div class="football-chips-box">
        ${chipsHtml}
      </div>
    `;
  }

  // 5. Attendance & Streak 31-Day Calendar
  const calSection = document.getElementById('calendar-area');
  if (calSection) {
    let daysHtml = '';
    const dayNames = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    const daysHeaderHtml = dayNames.map(d => `<span>${d}</span>`).join('');

    for (let day = 1; day <= 31; day++) {
      let statusClass = '';
      let statusKey = 'future';
      let streakClass = '';

      let isPresent = s.attendance.presentDays.includes(day);
      let isOff = s.attendance.offDays.includes(day) || ((day - 1) % 7 === 5) || ((day - 1) % 7 === 6); // Thu/Fri

      if (day === s.attendance.today) {
        statusClass = 'day-today';
        statusKey = 'today';
      } else if (isPresent) {
        statusClass = 'day-present';
        statusKey = 'present';
        
        let prevPresent = s.attendance.presentDays.includes(day - 1) && ((day - 1) % 7 !== 0);
        let nextPresent = s.attendance.presentDays.includes(day + 1) && (day % 7 !== 0);
        
        if (prevPresent && nextPresent) streakClass = 'streak-mid';
        else if (!prevPresent && nextPresent) streakClass = 'streak-start';
        else if (prevPresent && !nextPresent) streakClass = 'streak-end';
        else streakClass = 'streak-single';

      } else if (s.attendance.absentDays.includes(day)) {
        statusClass = 'day-absent';
        statusKey = 'absent';
      } else if (isOff) {
        statusClass = 'day-off';
        statusKey = 'off';
      } else {
        statusClass = 'day-future';
        statusKey = 'future';
      }

      const faDay = day.toLocaleString('fa-IR');
      daysHtml += `
        <div class="cal-day-cell ${statusClass} ${streakClass}" onclick="window.uiController.openAttendanceDayInfo(${day}, '${statusKey}')" title="روز ${faDay}">
          <span>${faDay}</span>
        </div>
      `;
    }

    calSection.innerHTML = `
      <div class="section-card">
        <span class="section-label" style="margin-bottom: 12px;">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"/><path d="M15.695 13.7h.01M15.695 16.7h.01M11.995 13.7h.01M11.995 16.7h.01M8.294 13.7h.01M8.294 16.7h.01"/></svg>
            <span>حضور و غیاب کلاسی (مهر ۱۴۰۶)</span>
          </span>
          <div class="calendar-legend">
            <span class="legend-item"><span class="legend-dot" style="background:#00A86B;"></span>حاضر</span>
            <span class="legend-item"><span class="legend-dot" style="background:#ef4444;"></span>غایب</span>
            <span class="legend-item"><span class="legend-dot" style="background:#cbd5e1;"></span>تعطیل</span>
          </div>
        </span>

        <!-- Attendance Quick Metrics (آمار سریع حضور شاد) -->
        <div class="att-summary-strip">
          <div class="att-sum-box present">
            <span class="att-sum-num">۲۴</span>
            <span class="att-sum-lbl">روز حاضر</span>
          </div>
          <div class="att-sum-box streak">
            <span class="att-sum-num">۵ 🔥</span>
            <span class="att-sum-lbl">پیوستگی فعال</span>
          </div>
          <div class="att-sum-box absent">
            <span class="att-sum-num">۲</span>
            <span class="att-sum-lbl">غیبت موجه</span>
          </div>
        </div>
        <div class="calendar-card-box">
          <div class="calendar-days-header">
            ${daysHeaderHtml}
          </div>
          <div class="calendar-grid-31">
            ${daysHtml}
          </div>
        </div>
      </div>
    `;
  }

  // 6. MBTI & Learning Style (کاملاً راست‌چین و فارسی استاندارد)
  const mbtiLearningSection = document.getElementById('mbti-learning-area');
  if (mbtiLearningSection) {
    mbtiLearningSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4Z"/><path d="M12 11c-4.42 0-8 2.69-8 6v1c0 2.21 3.58 4 8 4s8-1.79 8-4v-1c0-3.31-3.58-6-8-6Z"/></svg>
            <span>شخصیت و سبک یادگیری</span>
          </span>
        </span>
        <div class="bento-row" style="margin-top: 10px;">
          <div class="mbti-card">
            <span class="insight-badge">تیپ شخصیتی</span>
            <div class="insight-card-center-body">
              <img src="./assets/mbti_icon.jpg" class="insight-avatar-img-centered" alt="INTJ" />
              <h3 class="mbti-title">${s.mbti.code}</h3>
              <p class="insight-desc">${s.mbti.title}</p>
            </div>
            <div class="insight-pill">${s.mbti.matchPct}</div>
          </div>

          <div class="learning-card">
            <span class="insight-badge">سبک یادگیری</span>
            <div class="insight-card-center-body">
              <img src="./assets/learning_icon.jpg" class="insight-avatar-img-centered" alt="سبک یادگیری" />
              <h3 class="learning-title">${s.learningStyle.code}</h3>
              <p class="insight-desc">${s.learningStyle.title}</p>
            </div>
            <div class="insight-pill">${s.learningStyle.matchPct}</div>
          </div>
        </div>
      </div>
    `;
  }

  // 7. Passions & Hobbies
  const passionsSection = document.getElementById('passions-area');
  if (passionsSection) {
    const tagsHtml = s.passions.map(p => `
      <span class="tag-chip">
        <span>${p.text}</span>
      </span>
    `).join('');

    passionsSection.innerHTML = `
      <div id="passions-widget" class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/></svg>
            <span>علایق و حوزه‌های اشتیاق</span>
          </span>
        </span>
        <div class="passions-white-box">
          ${tagsHtml}
        </div>
      </div>
    `;
  }

  // 8. Role Models
  const modelsSection = document.getElementById('role-models-area');
  if (modelsSection) {
    const modelsHtml = s.roleModels.map(m => `
      <div class="model-story-col">
        <div class="model-story-avatar-wrap">
          <img src="${m.avatar}" class="model-story-avatar" alt="${m.name}" />
        </div>
        <p class="model-story-name">${m.name}</p>
        <span class="model-story-field">${m.field}</span>
      </div>
    `).join('');

    modelsSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"/></svg>
            <span>الگوها و الهام‌بخش‌های من</span>
          </span>
          <span class="section-more-link" onclick="window.uiController.showToast('مشاهده همه کانال‌ها و الگوها', 'info')">مشاهده همه ›</span>
        </span>
        <div class="models-stories-row">
          ${modelsHtml}
        </div>
      </div>
    `;
  }

  // 9. Books Showcase
  const booksSection = document.getElementById('books-area');
  if (booksSection) {
    booksSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M3.5 18V6.5C3.5 4.57 5.07 3 7 3h13.5v15H7c-1.93 0-3.5 1.57-3.5 3.5v.5h17"/><path d="M3.5 18c0-1.93 1.57-3.5 3.5-3.5h13.5"/></svg>
            <span>کتاب‌های روی میزم</span>
          </span>
          <span class="section-more-link" onclick="window.uiController.showToast('مشاهده لیست کامل کتاب‌ها', 'info')">مشاهده همه ›</span>
        </span>
        <div class="media-carousel-scroll">
          ${s.books.map((b, i) => `
            <div class="media-carousel-item">
              <div class="book-cover-wrap">
                <img src="${b.cover}" alt="${b.title}" class="book-cover-img" />
                <div class="book-spine-overlay"></div>
                <span class="media-rank-badge">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
              </div>
              <p class="book-title-text">${b.title}</p>
              <p class="book-author-text">${b.author}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 9.1 Favorite Games
  const gamesSection = document.getElementById('games-area');
  if (gamesSection && s.games) {
    gamesSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M22 13.5v-3c0-3.8-2-5.5-6-5.5H8C4 5 2 6.7 2 10.5v3c0 3.8 2 5.5 6 5.5h8c4 0 6-1.7 6-5.5Z"/><path d="M16.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM7 11h3M8.5 9.5v3"/></svg>
            <span>بازی‌های مورد علاقه</span>
          </span>
          <span class="section-more-link" onclick="window.uiController.showToast('مشاهده لیست کامل بازی‌ها', 'info')">مشاهده همه ›</span>
        </span>
        <div class="media-carousel-scroll">
          ${s.games.map((g, i) => `
            <div class="media-carousel-item">
              <div class="book-cover-wrap">
                <img src="${g.cover}" alt="${g.title}" class="book-cover-img" />
                <div class="book-spine-overlay"></div>
                <span class="media-rank-badge">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
              </div>
              <p class="book-title-text">${g.title}</p>
              <p class="book-author-text">${g.author}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 9.2 Favorite Movies
  const moviesSection = document.getElementById('movies-area');
  if (moviesSection && s.movies) {
    moviesSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M22 15V9c0-3-1-4-4-4H6C3 5 2 6 2 9v6c0 3 1 4 4 4h12c3 0 4-1 4-4Z"/><path d="M6 5v14M18 5v14M2 15h4M22 15h-4M2 9h4M22 9h-4"/></svg>
            <span>فیلم و سریال‌های مورد علاقه</span>
          </span>
          <span class="section-more-link" onclick="window.uiController.showToast('مشاهده لیست کامل فیلم‌ها', 'info')">مشاهده همه ›</span>
        </span>
        <div class="media-carousel-scroll">
          ${s.movies.map((m, i) => `
            <div class="media-carousel-item">
              <div class="book-cover-wrap">
                <img src="${m.cover}" alt="${m.title}" class="book-cover-img" />
                <div class="book-spine-overlay"></div>
                <span class="media-rank-badge">${i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</span>
              </div>
              <p class="book-title-text">${m.title}</p>
              <p class="book-author-text">${m.author}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 10. Music Player
  const musicSection = document.getElementById('music-area');
  if (musicSection) {
    musicSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
            <span>در حال گوش دادن</span>
          </span>
        </span>
        <div class="audio-white-box">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;" class="${s.nowListening.isPlaying ? 'spin-anim' : ''}">📻</span>
            <div>
              <p style="font-size: 11px; font-weight: 700; color: #0f172a;">${s.nowListening.title}</p>
              <span style="font-size: 9px; color: #94a3b8;">${s.nowListening.category}</span>
            </div>
          </div>
          <button class="audio-play-btn" onclick="window.rokhStore.toggleMusicPlay()">
            ${s.nowListening.isPlaying ? '❚❚' : '▶'}
          </button>
        </div>
      </div>
    `;
  }

  // 11. Aspirations Goal
  const goalSection = document.getElementById('goal-area');
  if (goalSection) {
    goalSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            <span>هدف آینده و دانشگاه</span>
          </span>
        </span>
        <div class="goal-white-box">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">🎓</span>
            <div>
              <p style="font-size: 11px; font-weight: 700; color: #0f172a;">${s.futureGoal.title}</p>
              <span style="font-size: 9px; color: #94a3b8;">${s.futureGoal.target}</span>
            </div>
          </div>
          <span style="font-size: 9.5px; font-weight: 800; color: #007A52; background: #E6F7F0; border: 1px solid #A7F3D0; padding: 3px 10px; border-radius: 9999px;">${s.futureGoal.horizon}</span>
        </div>
      </div>
    `;
  }

  // 12. Orbit Friendship Graph (Dual-Mode: Visual Radar & 300-Student Tiered Roster)
  window.renderOrbitSection();

  // 13. Leaderboard (سلسله‌مراتب شاد - نمایش رتبه‌های ۱ تا ۳ و سطر مجزای کاربر)
  const podiumSection = document.getElementById('podium-area');
  if (podiumSection && s.leaderboard) {
    const topUsers = s.leaderboard.filter(u => !u.isMe);
    const currentUser = s.leaderboard.find(u => u.isMe) || {
      rank: 42,
      name: s.user.name + ' (شما)',
      subtitle: (s.user.school || 'دبیرستان البرز') + ' • ' + (s.user.grade || 'دهم ریاضی'),
      score: 1420,
      avatar: './assets/avatar.png',
      isMe: true
    };

    const renderRow = (item) => {
      let rankHtml = '';
      if (item.rank === 1) {
        rankHtml = '<span class="lb-rank-badge rank-1" title="رتبه ۱">🥇</span>';
      } else if (item.rank === 2) {
        rankHtml = '<span class="lb-rank-badge rank-2" title="رتبه ۲">🥈</span>';
      } else if (item.rank === 3) {
        rankHtml = '<span class="lb-rank-badge rank-3" title="رتبه ۳">🥉</span>';
      } else {
        rankHtml = `<span class="lb-rank-num">${item.rank.toLocaleString('fa-IR')}</span>`;
      }

      return `
        <div class="leaderboard-row ${item.isMe ? 'is-me' : ''}">
          <div class="lb-rank-col">
            ${rankHtml}
          </div>
          <div class="lb-avatar-wrap" style="background-color: ${item.bg || '#f1f5f9'};">
            <img src="${item.avatar}" class="lb-avatar-img" alt="${item.name}" />
          </div>
          <div class="lb-info-col">
            <div class="lb-name-row">
              <span class="lb-name-text">${item.name}</span>
            </div>
            <span class="lb-subtitle-text">${item.subtitle || ''}</span>
          </div>
          <div class="lb-xp-col">
            <span class="lb-xp-val">${(item.score || item.xp || 0).toLocaleString('fa-IR')}</span>
            <span class="lb-xp-label">امتیاز</span>
          </div>
        </div>
      `;
    };

    const topRowsHtml = topUsers.map(u => renderRow(u)).join('');
    const separatorHtml = `
      <div class="lb-rank-gap-divider">
        <span class="lb-gap-dots">•••</span>
        <span class="lb-gap-text">۳۶ دانش‌آموز دیگر</span>
        <span class="lb-gap-dots">•••</span>
      </div>
    `;
    const userRowHtml = renderRow(currentUser);

    podiumSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"/></svg>
            <span>لیدربورد هفتگی مدرسه</span>
          </span>
          <button class="leaderboard-league-tag" onclick="window.uiController.openLeaguesModal()" title="مشاهده جدول همه لیگ‌ها">
            <span>لیگ الماس</span>
            <span>💎</span>
          </button>
        </span>
        <div class="leaderboard-list-scroll">
          ${topRowsHtml}
          ${separatorHtml}
          ${userRowHtml}
        </div>
      </div>
    `;
  }

  // 14. Badges Showcase (Tarteel AI 3D Gamified Badges)
  window.renderBadgesSection();

  // 15. Radar Chart (5 Dimensions)
  const radarSection = document.getElementById('radar-area');
  if (radarSection && s.radarDimensions) {
    const data = s.radarDimensions;
    // We use a balanced viewBox for crisp, prominent labels without cutoff
    const cx = 230;
    const cy = 205;
    const radius = 90;
    
    const getPoint = (val, i) => {
      const angle = -Math.PI / 2 + (i * 2 * Math.PI / 5);
      const r = radius * (val / 100);
      return {
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
      };
    };

    let gridHtml = '';
    // 5 levels of grid
    for (let level = 20; level <= 100; level += 20) {
      let points = '';
      for (let i = 0; i < 5; i++) {
        const p = getPoint(level, i);
        points += `${p.x},${p.y} `;
      }
      gridHtml += `<polygon points="${points.trim()}" fill="none" stroke="rgba(0,0,0,0.06)" stroke-width="1.5"/>`;
    }

    let axesHtml = '';
    for (let i = 0; i < 5; i++) {
      const p = getPoint(100, i);
      axesHtml += `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="rgba(0,0,0,0.08)" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    }

    let dataPoints = '';
    data.forEach((d, i) => {
      const p = getPoint(d.score, i);
      dataPoints += `${p.x},${p.y} `;
    });
    
    const defs = `
      <defs>
        <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(0, 186, 136, 0.28)"/>
          <stop offset="100%" stop-color="rgba(0, 186, 136, 0.08)"/>
        </linearGradient>
      </defs>
    `;

    const dataPolygon = `
      <polygon points="${dataPoints.trim()}" fill="url(#radarGrad)" stroke="#00BA88" stroke-width="2.2"/>
    `;

    const emojis = ['🧘‍♂️', '💡', '🤝', '🎭', '🛡️'];
    const w = 110;
    const h = 66;

    const labelCoords = [
      { x: cx - w / 2, y: 41 },           // Top (خودشناسی)
      { x: 326, y: 144 },                  // Top-Right (دانش)
      { x: 272, y: 288 },                  // Bottom-Right (روابط)
      { x: 78, y: 288 },                   // Bottom-Left (هویت اجتماعی)
      { x: 24, y: 144 }                    // Top-Left (مسئولیت)
    ];

    let labelsHtml = '';
    data.forEach((d, i) => {
      const coord = labelCoords[i];
      labelsHtml += `
        <foreignObject x="${coord.x}" y="${coord.y}" width="${w}" height="${h}" style="overflow: visible;">
          <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; direction: rtl; font-family: inherit;">
            <div style="width: 36px; height: 36px; border-radius: 50%; background: #ffffff; box-shadow: 0 3px 8px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04); border: 1.5px solid #e2e8f0; display: flex; align-items: center; justify-content: center; font-size: 19px; line-height: 1; flex-shrink: 0;">
              ${emojis[i]}
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 4px; direction: rtl; white-space: nowrap;">
              <span style="font-size: 13.5px; font-weight: 800; color: #1e293b;">${d.label}</span>
              <span style="font-size: 13px; font-weight: 900; color: #00BA88; direction: ltr;">${d.score.toLocaleString('fa-IR')}٪</span>
            </div>
          </div>
        </foreignObject>
      `;
    });

    const svgHtml = `
      <svg width="100%" viewBox="0 0 460 390" style="overflow: visible;">
        ${defs}
        ${gridHtml}
        ${axesHtml}
        ${dataPolygon}
        ${labelsHtml}
        <!-- Data dots -->
        ${data.map((d, i) => {
          const p = getPoint(d.score, i);
          return `<circle cx="${p.x}" cy="${p.y}" r="4" fill="#ffffff" stroke="#00BA88" stroke-width="2.2"/>`;
        }).join('')}
      </svg>
    `;

    radarSection.innerHTML = `
      <div class="section-card">
        <span class="section-label">
          <span class="section-title-wrap">
            <svg class="isax-icon" viewBox="0 0 24 24"><path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>
            <span>رادار ساحتهای ۵گانه رشد</span>
          </span>
        </span>
        <div style="background-color: transparent; border-radius: 12px; margin-top: 8px; display: flex; justify-content: center; align-items: center; overflow: visible;">
          ${svgHtml}
        </div>
      </div>
    `;
  }

  // Set up Long Press for Widgets
  setTimeout(() => {
    // Bio section long press -> edit profile modal
    window.uiController.setupLongPress(
      document.getElementById('bio-widget'), 
      () => window.uiController.openEditProfileModal()
    );
    // Clubs section long press -> add club modal
    window.uiController.setupLongPress(
      document.getElementById('clubs-area'), 
      () => window.uiController.openAddClubModal()
    );
    // Passions section long press -> prompt add passion
    window.uiController.setupLongPress(
      document.getElementById('passions-widget'), 
      () => window.promptAddPassion()
    );

    // Helper to determine edit handler for editable cards only
    const getEditHandler = (cardId, cardEl) => {
      if (cardId === 'bio-widget') return "window.uiController.openEditProfileModal()";
      if (cardId === 'clubs-area' || cardEl.closest('#clubs-area')) return "window.uiController.openAddClubModal()";
      if (cardId === 'passions-area' || cardEl.closest('#passions-area') || cardId === 'passions-widget') return "window.promptAddPassion()";
      if (cardId === 'orbit-area' || cardEl.closest('#orbit-area')) return "window.uiController.openEditOrbitModal()";
      if (cardId === 'goal-area' || cardEl.closest('#goal-area')) return "window.uiController.openEditGoalModal()";
      if (cardId === 'books-area' || cardEl.closest('#books-area')) return "window.uiController.openEditBooksModal()";
      return null;
    };

    // Inject 3-Dots Action Menu Button into all section cards
    const sections = document.querySelectorAll('.sections-body > *');
    sections.forEach((secEl, idx) => {
      if (secEl.id === 'hidden-tray') return;

      const card = secEl.classList.contains('section-card') ? secEl : secEl.querySelector('.section-card');
      if (!card) return;

      const secId = secEl.id || card.id || ('sec-' + idx);
      secEl.id = secEl.id || secId;
      card.id = card.id || secId;

      // Remove legacy controls
      const legacyControls = card.querySelector('.widget-edit-controls');
      if (legacyControls) legacyControls.remove();

      if (!isOwner) return;

      const label = card.querySelector('.section-label');
      if (label) {
        if (label.querySelector('.card-more-btn')) return;

        let actionsWrap = label.querySelector('.section-header-actions');
        if (!actionsWrap) {
          actionsWrap = document.createElement('div');
          actionsWrap.className = 'section-header-actions';
          Array.from(label.children).forEach(child => {
            if (!child.classList.contains('section-title-wrap')) {
              actionsWrap.appendChild(child);
            }
          });
          label.appendChild(actionsWrap);
        }

        const menuBtn = document.createElement('button');
        menuBtn.type = 'button';
        menuBtn.className = 'card-more-btn';
        menuBtn.title = 'گزینه‌ها و مدیریت بخش';
        menuBtn.innerHTML = `
          <svg viewBox="0 0 24 24" class="card-more-dots-svg">
            <circle cx="12" cy="5" r="2.2"/>
            <circle cx="12" cy="12" r="2.2"/>
            <circle cx="12" cy="19" r="2.2"/>
          </svg>
        `;
        menuBtn.onclick = (e) => window.uiController.openCardMenu(secId, e);
        actionsWrap.appendChild(menuBtn);
      }
    });

    window.uiController.initOrbitPanZoom();
  }, 0);
}

window.promptAddPassion = function() {
  const text = prompt('علاقه یا مهارت جدیدت را وارد کن (مثال: طراحی وب 💻):');
  if (text && text.trim()) {
    window.rokhStore.addPassion(text.trim());
    window.uiController.showToast('علاقه جدید با موفقیت اضافه شد!', 'success');
  }
};

// Initial subscribe and render
window.rokhStore.subscribe(() => {
  renderApp();
});

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});
