import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const SELLERS = [
  { id: 1, name: 'Abebe Girma', type: 'Real Estate', city: 'Addis Ababa', rating: 4.9, reviews: 127, verified: true, phone: '+251 91 234 5678', tags: ['Apartments', 'Villas', 'Commercial'], initials: 'AG', color: '#1B6CA8' },
  { id: 2, name: 'Tigist Haile', type: 'Cars', city: 'Addis Ababa', rating: 4.8, reviews: 89, verified: true, phone: '+251 92 345 6789', tags: ['Toyota', 'Hyundai', 'Used Cars'], initials: 'TH', color: '#FF6B35' },
  { id: 3, name: 'Dawit Bekele', type: 'Real Estate', city: 'Bahir Dar', rating: 4.7, reviews: 64, verified: false, phone: '+251 93 456 7890', tags: ['Land', 'Houses'], initials: 'DB', color: '#16A34A' },
  { id: 4, name: 'Meron Tadesse', type: 'Cars', city: 'Hawassa', rating: 4.6, reviews: 52, verified: true, phone: '+251 94 567 8901', tags: ['Suzuki', 'Nissan'], initials: 'MT', color: '#F59E0B' },
  { id: 5, name: 'Yonas Alemu', type: 'Real Estate', city: 'Dire Dawa', rating: 4.5, reviews: 41, verified: false, phone: '+251 95 678 9012', tags: ['Commercial', 'Rentals'], initials: 'YA', color: '#8B5CF6' },
  { id: 6, name: 'Hana Wolde', type: 'Cars', city: 'Addis Ababa', rating: 4.4, reviews: 38, verified: true, phone: '+251 96 789 0123', tags: ['BMW', 'Mercedes', 'Luxury'], initials: 'HW', color: '#DC2626' },
];

const INIT_REVIEWS = [
  { id: 1, sellerId: 1, author: 'Samuel T.', rating: 5, date: 'March 2024', text: 'Abebe helped us find our dream apartment in record time. Very professional and honest about pricing.' },
  { id: 2, sellerId: 1, author: 'Liya M.', rating: 5, date: 'February 2024', text: 'Excellent service! He knows every neighborhood in Addis. Highly recommend.' },
  { id: 3, sellerId: 1, author: 'Bereket A.', rating: 4, date: 'January 2024', text: 'Good communication and very responsive. Found a great villa for our family.' },
  { id: 4, sellerId: 2, author: 'Kidus H.', rating: 5, date: 'March 2024', text: 'Tigist sold us a Toyota Corolla in perfect condition. The paperwork was handled smoothly.' },
  { id: 5, sellerId: 2, author: 'Rahel G.', rating: 5, date: 'February 2024', text: 'Best car dealer in Addis. Honest prices, no hidden fees.' },
];

const PENDING = [
  { id: 1, name: 'Kebede Mamo', type: 'Real Estate', city: 'Mekelle', phone: '+251 97 111 2222', date: 'Nov 20, 2026' },
  { id: 2, name: 'Selamawit Teka', type: 'Cars', city: 'Addis Ababa', phone: '+251 91 333 4444', date: 'Nov 21, 2026' },
  { id: 3, name: 'Biniyam Gebre', type: 'Hotels', city: 'Gondar', phone: '+251 93 555 6666', date: 'Nov 22, 2026' },
];

const FLAGGED = [
  { id: 1, reviewer: 'Anonymous', sellerId: 1, sellerName: 'Abebe Girma', rating: 1, text: 'This person is a scammer! Avoid at all costs.', reason: 'Inappropriate language', date: 'Nov 19, 2026' },
  { id: 2, reviewer: 'User_4521', sellerId: 3, sellerName: 'Dawit Bekele', rating: 2, text: 'He promised a lot but delivered nothing.', reason: 'Potential spam', date: 'Nov 20, 2026' },
];

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: #F7F8FA;
    color: #111827;
    min-height: 100vh;
  }

  em { font-style: normal; color: #1B6CA8; }

  /* NAV */
  .nav {
    position: sticky; top: 0; z-index: 100;
    height: 60px; background: #fff;
    border-bottom: 1px solid #E5E7EB;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 20px;
  }
  .nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none; }
  .nav-logo-icon {
    width: 36px; height: 36px; border-radius: 10px;
    background: #1B6CA8; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 16px;
  }
  .nav-logo-text { font-weight: 700; font-size: 18px; color: #111827; }
  .nav-links { display: none; align-items: center; gap: 8px; }
  .nav-link {
    background: none; border: none; cursor: pointer;
    font-family: inherit; font-size: 15px; font-weight: 500;
    color: #6B7280; padding: 6px 12px; border-radius: 8px;
    transition: color 0.15s, background 0.15s;
  }
  .nav-link:hover { color: #111827; background: #F7F8FA; }
  .nav-link.active { color: #1B6CA8; background: #EBF4FF; }
  .nav-actions { display: none; align-items: center; gap: 8px; }
  .btn-lang {
    background: none; border: 1px solid #E5E7EB; cursor: pointer;
    font-family: inherit; font-size: 13px; font-weight: 500;
    color: #6B7280; padding: 6px 12px; border-radius: 8px;
    transition: all 0.15s;
  }
  .btn-lang:hover { border-color: #1B6CA8; color: #1B6CA8; }
  .btn-primary {
    background: #1B6CA8; color: #fff; border: none; cursor: pointer;
    font-family: inherit; font-size: 14px; font-weight: 600;
    padding: 8px 18px; border-radius: 10px;
    transition: background 0.15s, transform 0.1s;
  }
  .btn-primary:hover { background: #155d93; transform: translateY(-1px); }
  .btn-accent {
    background: #FF6B35; color: #fff; border: none; cursor: pointer;
    font-family: inherit; font-size: 14px; font-weight: 600;
    padding: 8px 18px; border-radius: 10px;
    transition: background 0.15s, transform 0.1s;
  }
  .btn-accent:hover { background: #e85f2a; transform: translateY(-1px); }
  .btn-success {
    background: #16A34A; color: #fff; border: none; cursor: pointer;
    font-family: inherit; font-size: 13px; font-weight: 600;
    padding: 6px 14px; border-radius: 8px; transition: background 0.15s;
  }
  .btn-success:hover { background: #15803d; }
  .btn-danger {
    background: #DC2626; color: #fff; border: none; cursor: pointer;
    font-family: inherit; font-size: 13px; font-weight: 600;
    padding: 6px 14px; border-radius: 8px; transition: background 0.15s;
  }
  .btn-danger:hover { background: #b91c1c; }
  .btn-ghost {
    background: none; border: 1px solid #E5E7EB; cursor: pointer;
    font-family: inherit; font-size: 13px; font-weight: 500;
    color: #6B7280; padding: 6px 14px; border-radius: 8px;
    transition: all 0.15s;
  }
  .btn-ghost:hover { border-color: #9CA3AF; color: #111827; }

  /* HAMBURGER */
  .hamburger {
    display: flex; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 6px;
  }
  .hamburger-line {
    width: 22px; height: 2px; background: #111827; border-radius: 2px;
    transition: transform 0.25s, opacity 0.25s;
    transform-origin: center;
  }
  .hamburger.open .hamburger-line:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .hamburger.open .hamburger-line:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .hamburger.open .hamburger-line:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* MOBILE DRAWER */
  .nav-drawer {
    position: fixed; top: 60px; left: 0; right: 0; z-index: 99;
    background: #fff; border-bottom: 1px solid #E5E7EB;
    padding: 16px 20px 24px;
    display: flex; flex-direction: column; gap: 8px;
    transform: translateY(-110%);
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  }
  .nav-drawer.open { transform: translateY(0); }
  .drawer-link {
    background: none; border: none; cursor: pointer;
    font-family: inherit; font-size: 16px; font-weight: 500;
    color: #111827; padding: 12px 4px; text-align: left;
    border-bottom: 1px solid #F7F8FA;
    transition: color 0.15s;
  }
  .drawer-link:hover { color: #1B6CA8; }
  .drawer-link.active { color: #1B6CA8; font-weight: 600; }
  .drawer-actions { display: flex; gap: 8px; margin-top: 8px; }
  .drawer-actions .btn-lang,
  .drawer-actions .btn-primary { flex: 1; justify-content: center; }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, #1B6CA8 0%, #0d4f7c 100%);
    padding: 56px 20px 48px; text-align: center; color: #fff;
  }
  .hero-badge {
    display: inline-block; background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.3);
    color: #fff; font-size: 13px; font-weight: 500;
    padding: 5px 14px; border-radius: 100px; margin-bottom: 20px;
  }
  .hero h1 { font-size: 32px; font-weight: 800; line-height: 1.2; margin-bottom: 14px; }
  .hero h1 em { color: #FFD580; }
  .hero p { font-size: 16px; color: rgba(255,255,255,0.8); margin-bottom: 32px; max-width: 480px; margin-left: auto; margin-right: auto; }
  .search-box {
    background: #fff; border-radius: 16px; padding: 16px;
    max-width: 540px; margin: 0 auto;
    display: flex; flex-direction: column; gap: 10px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  }
  .search-select, .search-input {
    width: 100%; padding: 12px 14px; border-radius: 10px;
    border: 1px solid #E5E7EB; font-family: inherit;
    font-size: 15px; color: #111827; background: #F7F8FA;
    outline: none; transition: border-color 0.15s;
  }
  .search-select:focus, .search-input:focus { border-color: #1B6CA8; background: #fff; }
  .search-btn {
    width: 100%; padding: 13px; background: #FF6B35; color: #fff;
    border: none; border-radius: 10px; cursor: pointer;
    font-family: inherit; font-size: 15px; font-weight: 700;
    transition: background 0.15s;
  }
  .search-btn:hover { background: #e85f2a; }

  /* CONTAINER */
  .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

  /* STATS */
  .stats-section { padding: 36px 20px; }
  .stats-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px; max-width: 540px; margin: 0 auto;
  }
  .stat-card {
    background: #fff; border: 1px solid #E5E7EB; border-radius: 16px;
    padding: 20px; text-align: center;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .stat-number { font-size: 28px; font-weight: 800; color: #1B6CA8; }
  .stat-label { font-size: 13px; color: #6B7280; margin-top: 4px; font-weight: 500; }

  /* SECTION */
  .section { padding: 32px 20px; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .section-title { font-size: 20px; font-weight: 700; }
  .section-link {
    font-size: 14px; color: #1B6CA8; font-weight: 600;
    background: none; border: none; cursor: pointer; font-family: inherit;
  }

  /* CATEGORY PILLS */
  .pills-scroll {
    display: flex; gap: 8px; overflow-x: auto;
    padding-bottom: 8px; scrollbar-width: none;
  }
  .pills-scroll::-webkit-scrollbar { display: none; }
  .pill {
    white-space: nowrap; padding: 8px 16px; border-radius: 100px;
    border: 1px solid #E5E7EB; background: #fff;
    font-size: 14px; font-weight: 500; color: #6B7280; cursor: pointer;
    transition: all 0.15s; flex-shrink: 0;
  }
  .pill:hover { border-color: #1B6CA8; color: #1B6CA8; }
  .pill.active { background: #EBF4FF; border-color: #1B6CA8; color: #1B6CA8; font-weight: 600; }
  .pill.soon { color: #9CA3AF; border-style: dashed; cursor: default; }

  /* SELLER GRID */
  .sellers-grid {
    display: grid; grid-template-columns: 1fr; gap: 16px;
  }

  /* SELLER CARD */
  .seller-card {
    background: #fff; border: 1px solid #E5E7EB; border-radius: 16px;
    padding: 20px; cursor: pointer;
    transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
  }
  .seller-card:hover {
    border-color: #1B6CA8;
    box-shadow: 0 4px 20px rgba(27,108,168,0.12);
    transform: translateY(-2px);
  }
  .seller-card-top { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 14px; }
  .seller-avatar {
    width: 52px; height: 52px; border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 18px; color: #fff; flex-shrink: 0;
  }
  .seller-info { flex: 1; min-width: 0; }
  .seller-name-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
  .seller-name { font-size: 16px; font-weight: 700; }
  .verified-badge {
    background: #DCFCE7; color: #16A34A; font-size: 11px; font-weight: 600;
    padding: 2px 8px; border-radius: 100px; white-space: nowrap;
    display: flex; align-items: center; gap: 3px;
  }
  .seller-meta { font-size: 13px; color: #6B7280; }
  .stars-row { display: flex; align-items: center; gap: 6px; margin-bottom: 12px; }
  .stars { color: #F59E0B; font-size: 15px; letter-spacing: 1px; }
  .rating-score { font-size: 15px; font-weight: 700; }
  .review-count { font-size: 13px; color: #9CA3AF; }
  .tags-row { display: flex; flex-wrap: wrap; gap: 6px; }
  .tag {
    font-size: 12px; font-weight: 500; color: #6B7280;
    background: #F7F8FA; border: 1px solid #E5E7EB;
    padding: 3px 10px; border-radius: 100px;
  }

  /* HOW IT WORKS */
  .how-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
  .how-card {
    background: #fff; border: 1px solid #E5E7EB; border-radius: 16px;
    padding: 24px; text-align: center;
  }
  .how-icon {
    width: 56px; height: 56px; border-radius: 16px;
    background: #EBF4FF; color: #1B6CA8;
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; margin: 0 auto 14px;
  }
  .how-card h3 { font-size: 16px; font-weight: 700; margin-bottom: 6px; }
  .how-card p { font-size: 14px; color: #6B7280; line-height: 1.5; }

  /* BROWSE PAGE */
  .browse-header {
    background: #fff; border-bottom: 1px solid #E5E7EB;
    padding: 24px 20px;
  }
  .browse-header h1 { font-size: 22px; font-weight: 800; margin-bottom: 14px; }
  .browse-search-row { display: flex; gap: 10px; }
  .browse-search-row .search-input { flex: 1; background: #fff; }
  .browse-search-row .btn-primary { white-space: nowrap; padding: 12px 20px; }
  .browse-layout { display: flex; gap: 24px; padding: 24px 20px; max-width: 1100px; margin: 0 auto; }
  .browse-sidebar { display: none; width: 260px; flex-shrink: 0; }
  .browse-main { flex: 1; min-width: 0; }

  /* FILTERS */
  .filter-panel {
    background: #fff; border: 1px solid #E5E7EB; border-radius: 16px;
    padding: 20px; position: sticky; top: 80px;
  }
  .filter-title { font-size: 15px; font-weight: 700; margin-bottom: 16px; }
  .filter-group { margin-bottom: 20px; }
  .filter-group-label { font-size: 12px; font-weight: 600; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
  .filter-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .filter-chip {
    padding: 5px 12px; border-radius: 100px; font-size: 13px; font-weight: 500;
    border: 1px solid #E5E7EB; background: #fff; color: #6B7280; cursor: pointer;
    transition: all 0.15s;
  }
  .filter-chip:hover { border-color: #1B6CA8; color: #1B6CA8; }
  .filter-chip.active { background: #EBF4FF; border-color: #1B6CA8; color: #1B6CA8; font-weight: 600; }
  .toggle-row { display: flex; align-items: center; justify-content: space-between; }
  .toggle-label { font-size: 14px; font-weight: 500; }
  .toggle {
    width: 44px; height: 24px; border-radius: 100px; cursor: pointer;
    border: none; position: relative; transition: background 0.2s;
  }
  .toggle.on { background: #1B6CA8; }
  .toggle.off { background: #E5E7EB; }
  .toggle::after {
    content: ''; position: absolute; top: 3px;
    width: 18px; height: 18px; border-radius: 50%; background: #fff;
    transition: left 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  .toggle.on::after { left: 23px; }
  .toggle.off::after { left: 3px; }

  /* RESULTS BAR */
  .results-bar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px; gap: 12px;
  }
  .results-count { font-size: 14px; color: #6B7280; font-weight: 500; }
  .sort-select {
    padding: 8px 12px; border-radius: 10px; border: 1px solid #E5E7EB;
    font-family: inherit; font-size: 14px; color: #111827;
    background: #fff; cursor: pointer; outline: none;
  }

  /* MOBILE FILTER BTN */
  .mobile-filter-btn {
    display: flex; align-items: center; gap: 8px;
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #1B6CA8; color: #fff; border: none; cursor: pointer;
    font-family: inherit; font-size: 15px; font-weight: 600;
    padding: 14px 28px; border-radius: 100px; z-index: 50;
    box-shadow: 0 4px 20px rgba(27,108,168,0.4);
    transition: background 0.15s;
  }
  .mobile-filter-btn:hover { background: #155d93; }

  /* BOTTOM SHEET */
  .overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200;
    animation: fadeIn 0.2s;
  }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .bottom-sheet {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 201;
    background: #fff; border-radius: 24px 24px 0 0;
    padding: 0 20px 32px;
    max-height: 85vh; overflow-y: auto;
    transform: translateY(0);
    animation: slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
  .sheet-handle {
    width: 40px; height: 4px; background: #E5E7EB; border-radius: 100px;
    margin: 12px auto 20px;
  }
  .sheet-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .sheet-title { font-size: 17px; font-weight: 700; }
  .sheet-close {
    background: #F7F8FA; border: none; cursor: pointer; width: 32px; height: 32px;
    border-radius: 50%; font-size: 18px; color: #6B7280;
    display: flex; align-items: center; justify-content: center;
  }

  /* EMPTY STATE */
  .empty-state {
    text-align: center; padding: 56px 20px;
    background: #fff; border: 1px solid #E5E7EB; border-radius: 16px;
  }
  .empty-icon { font-size: 48px; margin-bottom: 16px; }
  .empty-state h3 { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
  .empty-state p { font-size: 14px; color: #6B7280; margin-bottom: 20px; }

  /* PROFILE PAGE */
  .profile-header-card {
    background: #fff; border-bottom: 1px solid #E5E7EB;
    padding: 28px 20px;
  }
  .profile-header-inner { max-width: 1100px; margin: 0 auto; }
  .profile-top { display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
  .profile-avatar {
    width: 80px; height: 80px; border-radius: 20px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 28px; color: #fff; flex-shrink: 0;
  }
  .profile-info { flex: 1; min-width: 200px; }
  .profile-name-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 8px; }
  .profile-name { font-size: 24px; font-weight: 800; }
  .profile-meta { display: flex; gap: 16px; flex-wrap: wrap; }
  .profile-meta-item { display: flex; align-items: center; gap: 5px; font-size: 14px; color: #6B7280; }
  .profile-rating-row { display: flex; align-items: center; gap: 12px; margin-top: 16px; flex-wrap: wrap; }
  .profile-score { font-size: 36px; font-weight: 800; color: #111827; }
  .profile-stars { color: #F59E0B; font-size: 22px; letter-spacing: 2px; }

  /* PROFILE BODY */
  .profile-body { max-width: 1100px; margin: 0 auto; padding: 24px 20px; display: flex; flex-direction: column; gap: 24px; }
  .reviews-col { flex: 1; }
  .review-form-col { width: 100%; }
  .reviews-col h2 { font-size: 18px; font-weight: 700; margin-bottom: 16px; }
  .review-card {
    background: #fff; border: 1px solid #E5E7EB; border-radius: 14px;
    padding: 18px; margin-bottom: 14px;
  }
  .review-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; flex-wrap: wrap; gap: 8px; }
  .review-author { font-weight: 600; font-size: 14px; }
  .review-date { font-size: 12px; color: #9CA3AF; }
  .review-text { font-size: 14px; color: #374151; line-height: 1.6; margin-top: 8px; }

  /* REVIEW FORM */
  .review-form-card {
    background: #fff; border: 1px solid #E5E7EB; border-radius: 16px; padding: 24px;
  }
  .review-form-card h3 { font-size: 17px; font-weight: 700; margin-bottom: 20px; }
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
  .form-input, .form-textarea {
    width: 100%; padding: 11px 14px; border-radius: 10px;
    border: 1px solid #E5E7EB; font-family: inherit; font-size: 14px;
    color: #111827; background: #fff; outline: none; transition: border-color 0.15s;
  }
  .form-input:focus, .form-textarea:focus { border-color: #1B6CA8; }
  .form-textarea { resize: vertical; min-height: 100px; }
  .star-picker { display: flex; gap: 6px; }
  .star-btn {
    background: none; border: none; cursor: pointer;
    font-size: 28px; transition: transform 0.1s;
    color: #E5E7EB;
  }
  .star-btn:hover { transform: scale(1.2); }
  .star-btn.filled { color: #F59E0B; }
  .anon-note { font-size: 12px; color: #9CA3AF; margin-top: 10px; }
  .form-submit {
    width: 100%; padding: 13px; background: #FF6B35; color: #fff;
    border: none; border-radius: 10px; cursor: pointer;
    font-family: inherit; font-size: 15px; font-weight: 700;
    transition: background 0.15s; margin-top: 4px;
  }
  .form-submit:hover { background: #e85f2a; }

  /* TOAST */
  .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #111827; color: #fff;
    padding: 14px 24px; border-radius: 12px; z-index: 999;
    font-size: 14px; font-weight: 500;
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
    animation: toastUp 0.3s cubic-bezier(0.34,1.56,0.64,1);
    white-space: nowrap;
  }
  @keyframes toastUp { from { opacity: 0; transform: translateX(-50%) translateY(20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }

  /* ADMIN */
  .admin-layout { display: flex; flex-direction: column; min-height: calc(100vh - 60px); }
  .admin-tabs {
    background: #fff; border-bottom: 1px solid #E5E7EB;
    display: flex; overflow-x: auto; scrollbar-width: none; flex-shrink: 0;
    padding: 0 16px;
  }
  .admin-tabs::-webkit-scrollbar { display: none; }
  .admin-tab {
    white-space: nowrap; padding: 16px 16px; font-size: 14px; font-weight: 500;
    color: #6B7280; border: none; background: none; cursor: pointer;
    font-family: inherit; border-bottom: 2px solid transparent;
    transition: color 0.15s, border-color 0.15s;
  }
  .admin-tab:hover { color: #111827; }
  .admin-tab.active { color: #1B6CA8; border-bottom-color: #1B6CA8; font-weight: 600; }
  .admin-content { flex: 1; padding: 24px 20px; max-width: 900px; }
  .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 28px; }
  .kpi-card {
    background: #fff; border: 1px solid #E5E7EB; border-radius: 14px; padding: 18px;
  }
  .kpi-label { font-size: 12px; color: #6B7280; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
  .kpi-value { font-size: 28px; font-weight: 800; color: #111827; }
  .kpi-trend { font-size: 12px; color: #16A34A; font-weight: 500; margin-top: 4px; }
  .activity-title { font-size: 16px; font-weight: 700; margin-bottom: 14px; }
  .activity-card {
    background: #fff; border: 1px solid #E5E7EB; border-radius: 12px;
    padding: 14px; margin-bottom: 10px; display: flex; align-items: center; gap: 12px;
  }
  .activity-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
  .activity-text { font-size: 14px; color: #374151; flex: 1; }
  .activity-time { font-size: 12px; color: #9CA3AF; white-space: nowrap; }
  .admin-card {
    background: #fff; border: 1px solid #E5E7EB; border-radius: 14px;
    padding: 18px; margin-bottom: 14px;
  }
  .admin-card-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .admin-card-info { flex: 1; min-width: 0; }
  .admin-card-name { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
  .admin-card-meta { font-size: 13px; color: #6B7280; }
  .admin-card-actions { display: flex; gap: 8px; flex-shrink: 0; }
  .admin-card-reason { font-size: 13px; color: #DC2626; background: #FEF2F2; padding: 4px 10px; border-radius: 6px; display: inline-block; margin: 8px 0 4px; }
  .settings-form { background: #fff; border: 1px solid #E5E7EB; border-radius: 16px; padding: 24px; max-width: 500px; }
  .settings-form h3 { font-size: 17px; font-weight: 700; margin-bottom: 20px; }
  .tab-section-title { font-size: 20px; font-weight: 700; margin-bottom: 20px; }

  /* FOOTER */
  .footer {
    background: #111827; color: #fff; padding: 48px 20px 24px;
    margin-top: 40px;
  }
  .footer-top { display: grid; grid-template-columns: 1fr; gap: 32px; margin-bottom: 32px; }
  .footer-brand .nav-logo-icon { background: #1B6CA8; }
  .footer-brand .nav-logo-text { color: #fff; }
  .footer-brand p { font-size: 14px; color: #9CA3AF; margin-top: 10px; line-height: 1.6; max-width: 280px; }
  .footer-links-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  .footer-col-title { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #9CA3AF; margin-bottom: 12px; }
  .footer-link {
    display: block; font-size: 14px; color: #D1D5DB;
    text-decoration: none; margin-bottom: 8px; cursor: pointer;
    background: none; border: none; font-family: inherit; text-align: left;
    transition: color 0.15s;
  }
  .footer-link:hover { color: #fff; }
  .footer-bottom {
    border-top: 1px solid #374151; padding-top: 20px;
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;
  }
  .footer-copy { font-size: 13px; color: #6B7280; }

  /* BACK BUTTON */
  .back-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: none; border: none; cursor: pointer; font-family: inherit;
    font-size: 14px; font-weight: 500; color: #6B7280; padding: 0;
    transition: color 0.15s;
  }
  .back-btn:hover { color: #1B6CA8; }

  /* RESPONSIVE */
  @media (min-width: 640px) {
    .sellers-grid { grid-template-columns: 1fr 1fr; }
    .how-grid { grid-template-columns: 1fr 1fr 1fr; }
    .hero h1 { font-size: 40px; }
    .stats-grid { grid-template-columns: 1fr 1fr 1fr 1fr; max-width: 100%; }
    .footer-links-grid { grid-template-columns: 1fr 1fr 1fr; }
  }

  @media (min-width: 900px) {
    .nav-links { display: flex; }
    .nav-actions { display: flex; }
    .hamburger { display: none; }
    .nav-drawer { display: none; }
    .sellers-grid { grid-template-columns: 1fr 1fr 1fr; }
    .browse-sidebar { display: block; }
    .mobile-filter-btn { display: none; }
    .profile-body { flex-direction: row; }
    .review-form-col { width: 340px; flex-shrink: 0; }
    .review-form-col .review-form-card { position: sticky; top: 80px; }
    .admin-layout { flex-direction: row; }
    .admin-tabs {
      flex-direction: column; width: 220px; border-bottom: none;
      border-right: 1px solid #E5E7EB; overflow-x: unset;
      padding: 24px 12px 0;
    }
    .admin-tab {
      border-bottom: none; border-left: 2px solid transparent;
      border-radius: 10px; text-align: left; padding: 11px 14px;
    }
    .admin-tab.active { border-left-color: #1B6CA8; background: #EBF4FF; border-bottom: none; }
    .admin-content { padding: 28px 32px; max-width: 100%; }
    .kpi-grid { grid-template-columns: 1fr 1fr 1fr 1fr; }
    .hero h1 { font-size: 48px; }
  }
`;

function App() {
  const [page, setPage] = useState('home');
  const [lang, setLang] = useState('en');
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterCity, setFilterCity] = useState('All');
  const [filterRating, setFilterRating] = useState(0);
  const [filterVerified, setFilterVerified] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroSearch, setHeroSearch] = useState('');
  const [heroCategory, setHeroCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [reviewName, setReviewName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [reviews, setReviews] = useState(INIT_REVIEWS);
  const [toast, setToast] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [adminTab, setAdminTab] = useState('dashboard');
  const [pendingList, setPendingList] = useState(PENDING);
  const [flaggedList, setFlaggedList] = useState(FLAGGED);
  const [sellersList, setSellersList] = useState(SELLERS);

  const am = lang === 'am';

  const navigate = (p) => { setPage(p); setNavOpen(false); window.scrollTo(0, 0); };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const Stars = ({ rating, size = 15 }) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return (
      <span className="stars" style={{ fontSize: size }}>
        {Array.from({ length: 5 }, (_, i) => {
          if (i < full) return '★';
          if (i === full && half) return '½';
          return '☆';
        }).join('')}
      </span>
    );
  };

  const SellerCard = ({ seller }) => (
    <div className="seller-card" onClick={() => { setSelectedSeller(seller); navigate('profile'); }}>
      <div className="seller-card-top">
        <div className="seller-avatar" style={{ background: seller.color }}>{seller.initials}</div>
        <div className="seller-info">
          <div className="seller-name-row">
            <span className="seller-name">{seller.name}</span>
            {seller.verified && (
              <span className="verified-badge">✓ {am ? 'ተረጋግጧል' : 'Verified'}</span>
            )}
          </div>
          <div className="seller-meta">{seller.city} · {am ? (seller.type === 'Real Estate' ? 'ሪል እስቴት' : seller.type === 'Cars' ? 'መኪናዎች' : seller.type) : seller.type}</div>
        </div>
      </div>
      <div className="stars-row">
        <Stars rating={seller.rating} />
        <span className="rating-score">{seller.rating}</span>
        <span className="review-count">({seller.reviews} {am ? 'ግምገማዎች' : 'reviews'})</span>
      </div>
      <div className="tags-row">
        {seller.tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    </div>
  );

  const Nav = () => (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={() => navigate('home')}>
          <div className="nav-logo-icon">A</div>
          <span className="nav-logo-text">AddisRating</span>
        </div>
        <div className="nav-links">
          <button className={`nav-link ${page === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>{am ? 'ዋና ገጽ' : 'Home'}</button>
          <button className={`nav-link ${page === 'browse' ? 'active' : ''}`} onClick={() => navigate('browse')}>{am ? 'ፈልግ' : 'Browse'}</button>
          <button className={`nav-link ${page === 'admin' ? 'active' : ''}`} onClick={() => navigate('admin')}>{am ? 'አስተዳዳሪ' : 'Admin'}</button>
        </div>
        <div className="nav-actions">
          <button className="btn-lang" onClick={() => setLang(am ? 'en' : 'am')}>{am ? 'English' : 'አማርኛ'}</button>
          <button className="btn-primary" onClick={() => navigate('browse')}>{am ? 'ፈልግ' : 'Browse'}</button>
        </div>
        <button className={`hamburger ${navOpen ? 'open' : ''}`} onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </nav>
      <div className={`nav-drawer ${navOpen ? 'open' : ''}`}>
        <button className={`drawer-link ${page === 'home' ? 'active' : ''}`} onClick={() => navigate('home')}>{am ? 'ዋና ገጽ' : 'Home'}</button>
        <button className={`drawer-link ${page === 'browse' ? 'active' : ''}`} onClick={() => navigate('browse')}>{am ? 'ፈልግ' : 'Browse'}</button>
        <button className={`drawer-link ${page === 'admin' ? 'active' : ''}`} onClick={() => navigate('admin')}>{am ? 'አስተዳዳሪ' : 'Admin'}</button>
        <div className="drawer-actions">
          <button className="btn-lang" onClick={() => setLang(am ? 'en' : 'am')} style={{ flex: 1 }}>{am ? 'English' : 'አማርኛ'}</button>
          <button className="btn-primary" onClick={() => navigate('browse')} style={{ flex: 1 }}>{am ? 'ፈልግ' : 'Browse'}</button>
        </div>
      </div>
    </>
  );

  const Footer = () => (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo" style={{ marginBottom: 10 }}>
              <div className="nav-logo-icon">A</div>
              <span className="nav-logo-text">AddisRating</span>
            </div>
            <p>{am ? 'በኢትዮጵያ ውስጥ የሚታመኑ ሻጮችን ይፈልጉ።' : 'Find and review trusted sellers across Ethiopia.'}</p>
          </div>
          <div className="footer-links-grid">
            <div>
              <div className="footer-col-title">{am ? 'ምርት' : 'Product'}</div>
              <button className="footer-link" onClick={() => navigate('browse')}>{am ? 'ፈልግ' : 'Browse'}</button>
              <button className="footer-link" onClick={() => navigate('home')}>{am ? 'ምድቦች' : 'Categories'}</button>
              <button className="footer-link">{am ? 'ምዝገባ' : 'Register'}</button>
            </div>
            <div>
              <div className="footer-col-title">{am ? 'ኩባንያ' : 'Company'}</div>
              <button className="footer-link">{am ? 'ስለ እኛ' : 'About Us'}</button>
              <button className="footer-link">{am ? 'ያነጋግሩን' : 'Contact'}</button>
              <button className="footer-link">{am ? 'ሥራ' : 'Careers'}</button>
            </div>
            <div>
              <div className="footer-col-title">{am ? 'ሕጋዊ' : 'Legal'}</div>
              <button className="footer-link">{am ? 'የግላዊነት ፖሊሲ' : 'Privacy Policy'}</button>
              <button className="footer-link">{am ? 'አገልግሎት ውሎች' : 'Terms of Service'}</button>
              <button className="footer-link">{am ? 'ኩኪ ፖሊሲ' : 'Cookie Policy'}</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">🇪🇹 © 2026 AddisRating. {am ? 'መብቱ በሕግ የተጠበቀ ነው።' : 'All rights reserved.'}</span>
          <span className="footer-copy">{am ? 'በአዲስ አበባ ሠርቷል' : 'Made with ❤️ in Addis Ababa'}</span>
        </div>
      </div>
    </footer>
  );

  const HomePage = () => (
    <div>
      <section className="hero">
        <div className="container">
          <div className="hero-badge">✦ {am ? 'አዲስ — 12 የኢትዮጵያ ከተሞችን አካቷል' : 'New — Now covering 12 Ethiopian cities'}</div>
          <h1>{am ? 'በኢትዮጵያ <em>የሚታመኑ</em> ሻጮች ያግኙ' : <span>Find Trusted <em>Sellers</em> in Ethiopia</span>}</h1>
          <p>{am ? 'እውነተኛ ግምገማዎችን ያንብቡ፣ ሻጮችን ያወዳድሩ፣ ትክክለኛ ውሳኔ ያድርጉ።' : 'Read real reviews, compare sellers, and make confident decisions.'}</p>
          <div className="search-box">
            <select className="search-select" value={heroCategory} onChange={e => setHeroCategory(e.target.value)}>
              <option value="All">{am ? 'ሁሉም ምድቦች' : 'All Categories'}</option>
              <option value="Real Estate">{am ? 'ሪል እስቴት' : 'Real Estate'}</option>
              <option value="Cars">{am ? 'መኪናዎች' : 'Cars'}</option>
              <option value="Hotels">{am ? 'ሆቴሎች' : 'Hotels'}</option>
            </select>
            <input className="search-input" placeholder={am ? 'ሻጭ ወይም ቦታ ፈልጉ...' : 'Search for a seller or location...'} value={heroSearch} onChange={e => setHeroSearch(e.target.value)} />
            <button className="search-btn" onClick={() => { setSearchQuery(heroSearch); setFilterCategory(heroCategory); navigate('browse'); }}>
              {am ? 'ፈልግ' : 'Search'}
            </button>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-number">1,200+</div><div className="stat-label">{am ? 'ሻጮች' : 'Sellers'}</div></div>
            <div className="stat-card"><div className="stat-number">8,400+</div><div className="stat-label">{am ? 'ግምገማዎች' : 'Reviews'}</div></div>
            <div className="stat-card"><div className="stat-number">12</div><div className="stat-label">{am ? 'ከተሞች' : 'Cities'}</div></div>
            <div className="stat-card"><div className="stat-number">94%</div><div className="stat-label">{am ? 'አዎንታዊ' : 'Positive'}</div></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{am ? 'ምድቦች' : 'Categories'}</h2>
          </div>
          <div className="pills-scroll">
            {['All', 'Real Estate', 'Cars', 'Hotels', 'Restaurants'].map(cat => (
              <button key={cat} className={`pill ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => { setFilterCategory(cat); navigate('browse'); }}>
                {am
                  ? cat === 'All' ? 'ሁሉም' : cat === 'Real Estate' ? 'ሪል እስቴት' : cat === 'Cars' ? 'መኪናዎች' : cat === 'Hotels' ? 'ሆቴሎች' : 'ሬስቶራንቶች'
                  : cat}
              </button>
            ))}
            <button className="pill soon">+ {am ? 'ብዙ 近々' : 'More soon'}</button>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{am ? 'ምርጥ ሻጮች' : 'Top-Rated Sellers'}</h2>
            <button className="section-link" onClick={() => navigate('browse')}>{am ? 'ሁሉም ተመልከት' : 'View all'} →</button>
          </div>
          <div className="sellers-grid">
            {SELLERS.slice(0, 3).map(s => <SellerCard key={s.id} seller={s} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 48 }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{am ? 'እንዴት ይሰራል' : 'How It Works'}</h2>
          </div>
          <div className="how-grid">
            <div className="how-card">
              <div className="how-icon">🔍</div>
              <h3>{am ? 'ፈልጉ' : 'Search'}</h3>
              <p>{am ? 'ምድብ፣ ከተማ ወይም ስም ተጠቅሞ ሻጮችን ያግኙ።' : 'Find sellers by category, city, or name using our powerful search.'}</p>
            </div>
            <div className="how-card">
              <div className="how-icon">⭐</div>
              <h3>{am ? 'ግምገማ ያንብቡ' : 'Read Reviews'}</h3>
              <p>{am ? 'እውነተኛ ግምገማዎችን ከቀደምት ደንበኞች ያንብቡ።' : 'Read authentic reviews from real customers to make informed choices.'}</p>
            </div>
            <div className="how-card">
              <div className="how-icon">🤝</div>
              <h3>{am ? 'ያግኙ' : 'Connect'}</h3>
              <p>{am ? 'ቀጥ ያለ ግንኙነት ያድርጉ፣ ጥሩ ሻጭ ያግኙ።' : 'Connect directly with the right seller and get the deal you need.'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const CITIES = ['All', 'Addis Ababa', 'Bahir Dar', 'Hawassa', 'Dire Dawa', 'Mekelle', 'Gondar'];
  const CATEGORIES = ['All', 'Real Estate', 'Cars', 'Hotels', 'Restaurants'];
  const RATINGS = [0, 4, 4.5, 4.8];

  const filteredSellers = sellersList.filter(s => {
    if (filterCategory !== 'All' && s.type !== filterCategory) return false;
    if (filterCity !== 'All' && s.city !== filterCity) return false;
    if (filterRating > 0 && s.rating < filterRating) return false;
    if (filterVerified && !s.verified) return false;
    if (searchQuery && !s.name.toLowerCase().includes(searchQuery.toLowerCase()) && !s.city.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'reviews') return b.reviews - a.reviews;
    return a.name.localeCompare(b.name);
  });

  const clearFilters = () => {
    setFilterCategory('All'); setFilterCity('All');
    setFilterRating(0); setFilterVerified(false); setSearchQuery('');
  };

  const FilterContent = () => (
    <>
      <div className="filter-group">
        <div className="filter-group-label">{am ? 'ምድብ' : 'Category'}</div>
        <div className="filter-chips">
          {CATEGORIES.map(c => (
            <button key={c} className={`filter-chip ${filterCategory === c ? 'active' : ''}`} onClick={() => setFilterCategory(c)}>
              {am ? (c === 'All' ? 'ሁሉም' : c === 'Real Estate' ? 'ሪል እስቴት' : c === 'Cars' ? 'መኪናዎች' : c === 'Hotels' ? 'ሆቴሎች' : 'ሬስቶራንቶች') : c}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <div className="filter-group-label">{am ? 'ከተማ' : 'City'}</div>
        <div className="filter-chips">
          {CITIES.map(c => (
            <button key={c} className={`filter-chip ${filterCity === c ? 'active' : ''}`} onClick={() => setFilterCity(c)}>
              {am && c === 'All' ? 'ሁሉም' : c}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <div className="filter-group-label">{am ? 'ዝቅተኛ ደረጃ' : 'Min Rating'}</div>
        <div className="filter-chips">
          {RATINGS.map(r => (
            <button key={r} className={`filter-chip ${filterRating === r ? 'active' : ''}`} onClick={() => setFilterRating(r)}>
              {r === 0 ? (am ? 'ሁሉም' : 'Any') : `${r}+ ★`}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-group">
        <div className="toggle-row">
          <span className="toggle-label">{am ? 'ተረጋግጧል ብቻ' : 'Verified Only'}</span>
          <button className={`toggle ${filterVerified ? 'on' : 'off'}`} onClick={() => setFilterVerified(!filterVerified)} />
        </div>
      </div>
    </>
  );

  const BrowsePage = () => (
    <div>
      <div className="browse-header">
        <div className="container">
          <h1>{am ? 'ሻጮችን ፈልጉ' : 'Browse Sellers'}</h1>
          <div className="browse-search-row">
            <input className="search-input" placeholder={am ? 'ሻጭ ወይም ቦታ...' : 'Search sellers or locations...'} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <button className="btn-primary">{am ? 'ፈልግ' : 'Search'}</button>
          </div>
        </div>
      </div>

      <div className="browse-layout">
        <aside className="browse-sidebar">
          <div className="filter-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <span className="filter-title">{am ? 'ማጣሪያዎች' : 'Filters'}</span>
              <button className="btn-ghost" style={{ fontSize: 12 }} onClick={clearFilters}>{am ? 'ሁሉም አጽዳ' : 'Clear all'}</button>
            </div>
            <FilterContent />
          </div>
        </aside>

        <main className="browse-main" style={{ paddingBottom: 80 }}>
          <div className="results-bar">
            <span className="results-count">{filteredSellers.length} {am ? 'ሻጮች' : 'sellers'}</span>
            <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="rating">{am ? 'ደረጃ' : 'Top Rated'}</option>
              <option value="reviews">{am ? 'ብዙ ግምገማ' : 'Most Reviews'}</option>
              <option value="name">{am ? 'ስም' : 'Name A-Z'}</option>
            </select>
          </div>

          {filteredSellers.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>{am ? 'ሻጭ አልተገኘም' : 'No sellers found'}</h3>
              <p>{am ? 'ማጣሪያዎቹን ቀይሩ ወይም ሁሉንም አጽዱ።' : 'Try adjusting your filters or clearing them all.'}</p>
              <button className="btn-primary" onClick={clearFilters}>{am ? 'ሁሉም ማጣሪያ አጽዳ' : 'Clear All Filters'}</button>
            </div>
          ) : (
            <div className="sellers-grid">
              {filteredSellers.map(s => <SellerCard key={s.id} seller={s} />)}
            </div>
          )}
        </main>
      </div>

      <button className="mobile-filter-btn" onClick={() => setFilterSheetOpen(true)}>
        ⚙ {am ? 'ማጣሪያ' : 'Filters'} {(filterCategory !== 'All' || filterCity !== 'All' || filterRating > 0 || filterVerified) ? '•' : ''}
      </button>

      {filterSheetOpen && (
        <>
          <div className="overlay" onClick={() => setFilterSheetOpen(false)} />
          <div className="bottom-sheet">
            <div className="sheet-handle" />
            <div className="sheet-header">
              <span className="sheet-title">{am ? 'ማጣሪያዎች' : 'Filters'}</span>
              <button className="sheet-close" onClick={() => setFilterSheetOpen(false)}>✕</button>
            </div>
            <FilterContent />
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <button className="btn-ghost" style={{ flex: 1 }} onClick={clearFilters}>{am ? 'አጽዳ' : 'Clear'}</button>
              <button className="btn-primary" style={{ flex: 2 }} onClick={() => setFilterSheetOpen(false)}>{am ? 'ተፈጻሚ' : 'Apply Filters'}</button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  const ProfilePage = ({ seller }) => {
    const sellerReviews = reviews.filter(r => r.sellerId === seller.id);
    const handleSubmitReview = () => {
      if (!reviewRating || !reviewText.trim()) {
        showToast(am ? 'እባክዎ ደረጃ እና ግምገማ ያስገቡ።' : 'Please add a rating and review text.');
        return;
      }
      const newReview = {
        id: reviews.length + 1,
        sellerId: seller.id,
        author: reviewName.trim() || (am ? 'ስም-አልባ' : 'Anonymous'),
        rating: reviewRating,
        date: 'November 2026',
        text: reviewText.trim(),
      };
      setReviews([newReview, ...reviews]);
      setReviewName(''); setReviewText(''); setReviewRating(0);
      showToast(am ? 'ግምገማዎ ተልኳል! ✓' : 'Your review was submitted! ✓');
    };

    return (
      <div>
        <div className="profile-header-card">
          <div className="profile-header-inner">
            <button className="back-btn" style={{ marginBottom: 16 }} onClick={() => navigate('browse')}>
              ← {am ? 'ተመለስ' : 'Back'}
            </button>
            <div className="profile-top">
              <div className="profile-avatar" style={{ background: seller.color }}>{seller.initials}</div>
              <div className="profile-info">
                <div className="profile-name-row">
                  <span className="profile-name">{seller.name}</span>
                  {seller.verified && <span className="verified-badge">✓ {am ? 'ተረጋግጧል' : 'Verified'}</span>}
                </div>
                <div className="profile-meta">
                  <span className="profile-meta-item">📍 {seller.city}</span>
                  <span className="profile-meta-item">🏷 {am ? (seller.type === 'Real Estate' ? 'ሪል እስቴት' : 'መኪናዎች') : seller.type}</span>
                  <span className="profile-meta-item">📞 {seller.phone}</span>
                </div>
                <div className="profile-rating-row">
                  <span className="profile-score">{seller.rating}</span>
                  <Stars rating={seller.rating} size={22} />
                  <span style={{ color: '#6B7280', fontSize: 15 }}>{sellerReviews.length} {am ? 'ግምገማዎች' : 'reviews'}</span>
                  <button className="btn-accent" onClick={() => document.getElementById('review-form')?.scrollIntoView({ behavior: 'smooth' })}>
                    {am ? 'ግምገማ ጻፍ' : 'Write a Review'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-body">
          <div className="reviews-col">
            <h2>{am ? 'ግምገማዎች' : 'Reviews'} ({sellerReviews.length})</h2>
            {sellerReviews.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h3>{am ? 'ግምገማ የለም' : 'No reviews yet'}</h3>
                <p>{am ? 'ለዚህ ሻጭ የመጀመሪያ ሰው ይሁኑ!' : 'Be the first to review this seller!'}</p>
              </div>
            ) : sellerReviews.map(r => (
              <div key={r.id} className="review-card">
                <div className="review-header">
                  <div>
                    <span className="review-author">{r.author}</span>
                    <div><Stars rating={r.rating} size={13} /></div>
                  </div>
                  <span className="review-date">{r.date}</span>
                </div>
                <p className="review-text">{r.text}</p>
              </div>
            ))}
          </div>

          <div className="review-form-col" id="review-form">
            <div className="review-form-card">
              <h3>{am ? 'ግምገማ ጻፍ' : 'Write a Review'}</h3>
              <div className="form-group">
                <label className="form-label">{am ? 'ደረጃ' : 'Rating'}</label>
                <div className="star-picker">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} className={`star-btn ${n <= reviewRating ? 'filled' : ''}`} onClick={() => setReviewRating(n)}>★</button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{am ? 'ስም (አማራጭ)' : 'Your Name (optional)'}</label>
                <input className="form-input" placeholder={am ? 'ስምዎን ያስገቡ...' : 'Enter your name...'} value={reviewName} onChange={e => setReviewName(e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">{am ? 'ግምገማ' : 'Review'}</label>
                <textarea className="form-textarea" placeholder={am ? 'ልምድዎን ያካፍሉ...' : 'Share your experience...'} value={reviewText} onChange={e => setReviewText(e.target.value)} />
              </div>
              <button className="form-submit" onClick={handleSubmitReview}>{am ? 'አስገባ' : 'Submit Review'}</button>
              <p className="anon-note">🔒 {am ? 'ስም ሳያስፈልግ መላክ ይቻላል' : 'You can post anonymously by leaving the name blank.'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdminPage = () => {
    const tabs = [
      { id: 'dashboard', label: am ? 'ዳሽቦርድ' : 'Dashboard' },
      { id: 'listings', label: am ? 'ዝርዝሮች' : 'Listings' },
      { id: 'pending', label: am ? 'በመጠባበቅ ላይ' : 'Pending' },
      { id: 'flagged', label: am ? 'ምልክት የተደረጉ' : 'Flagged' },
      { id: 'settings', label: am ? 'ቅንብሮች' : 'Settings' },
    ];

    const approvePending = (id) => setPendingList(pendingList.filter(p => p.id !== id));
    const removeFlagged = (id) => setFlaggedList(flaggedList.filter(f => f.id !== id));
    const deleteSeller = (id) => setSellersList(sellersList.filter(s => s.id !== id));

    return (
      <div className="admin-layout">
        <nav className="admin-tabs">
          {tabs.map(t => (
            <button key={t.id} className={`admin-tab ${adminTab === t.id ? 'active' : ''}`} onClick={() => setAdminTab(t.id)}>{t.label}</button>
          ))}
        </nav>

        <div className="admin-content">
          {adminTab === 'dashboard' && (
            <div>
              <h2 className="tab-section-title">{am ? 'ዳሽቦርድ' : 'Dashboard'}</h2>
              <div className="kpi-grid">
                <div className="kpi-card">
                  <div className="kpi-label">{am ? 'ሻጮች' : 'Total Sellers'}</div>
                  <div className="kpi-value">{sellersList.length}</div>
                  <div className="kpi-trend">↑ 12% {am ? 'ባለፈው ወር' : 'this month'}</div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-label">{am ? 'ግምገማዎች' : 'Reviews'}</div>
                  <div className="kpi-value">{reviews.length}</div>
                  <div className="kpi-trend">↑ 8% {am ? 'ባለፈው ወር' : 'this month'}</div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-label">{am ? 'በመጠባበቅ' : 'Pending'}</div>
                  <div className="kpi-value" style={{ color: '#F59E0B' }}>{pendingList.length}</div>
                  <div className="kpi-trend" style={{ color: '#F59E0B' }}>⚠ {am ? 'ማረጋገጥ ይፈልጋሉ' : 'Need review'}</div>
                </div>
                <div className="kpi-card">
                  <div className="kpi-label">{am ? 'ምልክት' : 'Flagged'}</div>
                  <div className="kpi-value" style={{ color: '#DC2626' }}>{flaggedList.length}</div>
                  <div className="kpi-trend" style={{ color: '#DC2626' }}>⚑ {am ? 'ትኩረት ይፈልጋሉ' : 'Needs attention'}</div>
                </div>
              </div>
              <div className="activity-title">{am ? 'የቅርብ ጊዜ እንቅስቃሴ' : 'Recent Activity'}</div>
              {[
                { text: am ? 'አዲስ ሻጭ ተመዝግቧል: Kebede Mamo' : 'New seller registered: Kebede Mamo', time: '2h ago', color: '#16A34A' },
                { text: am ? 'አዲስ ግምገማ ተሰጠ: Abebe Girma' : 'New review for Abebe Girma', time: '4h ago', color: '#1B6CA8' },
                { text: am ? 'ግምገማ ምልክት ተደርጓል' : 'Review flagged for inappropriate content', time: '6h ago', color: '#DC2626' },
                { text: am ? 'ሻጭ ተረጋግጧል: Tigist Haile' : 'Seller verified: Tigist Haile', time: '1d ago', color: '#16A34A' },
              ].map((a, i) => (
                <div key={i} className="activity-card">
                  <div className="activity-dot" style={{ background: a.color }} />
                  <span className="activity-text">{a.text}</span>
                  <span className="activity-time">{a.time}</span>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'listings' && (
            <div>
              <h2 className="tab-section-title">{am ? 'ሁሉም ዝርዝሮች' : 'All Listings'} ({sellersList.length})</h2>
              {sellersList.map(s => (
                <div key={s.id} className="admin-card">
                  <div className="admin-card-row">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flex: 1 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, flexShrink: 0 }}>{s.initials}</div>
                      <div className="admin-card-info">
                        <div className="admin-card-name">{s.name} {s.verified && <span className="verified-badge" style={{ marginLeft: 4 }}>✓</span>}</div>
                        <div className="admin-card-meta">{s.city} · {s.type} · {s.rating}★ · {s.reviews} {am ? 'ግምገማ' : 'reviews'}</div>
                      </div>
                    </div>
                    <div className="admin-card-actions">
                      <button className="btn-ghost">{am ? 'አርትዕ' : 'Edit'}</button>
                      <button className="btn-danger" onClick={() => deleteSeller(s.id)}>{am ? 'ሰርዝ' : 'Delete'}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'pending' && (
            <div>
              <h2 className="tab-section-title">{am ? 'በመጠባበቅ ላይ ምዝገባዎች' : 'Pending Registrations'} ({pendingList.length})</h2>
              {pendingList.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">✅</div>
                  <h3>{am ? 'ሁሉም ተጸደቀ!' : 'All caught up!'}</h3>
                  <p>{am ? 'ምንም የሚጠባበቅ ምዝገባ የለም' : 'No pending registrations at this time.'}</p>
                </div>
              ) : pendingList.map(p => (
                <div key={p.id} className="admin-card">
                  <div className="admin-card-row">
                    <div className="admin-card-info">
                      <div className="admin-card-name">{p.name}</div>
                      <div className="admin-card-meta">{p.city} · {p.type} · {p.phone} · {am ? 'ጥያቄ:' : 'Applied:'} {p.date}</div>
                    </div>
                    <div className="admin-card-actions">
                      <button className="btn-success" onClick={() => approvePending(p.id)}>{am ? 'ፍቀድ' : 'Approve'}</button>
                      <button className="btn-danger" onClick={() => approvePending(p.id)}>{am ? 'አትቀበል' : 'Reject'}</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'flagged' && (
            <div>
              <h2 className="tab-section-title">{am ? 'ምልክት የተደረጉ ግምገማዎች' : 'Flagged Reviews'} ({flaggedList.length})</h2>
              {flaggedList.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">🏳</div>
                  <h3>{am ? 'ምልክት የተደረጉ ግምገማዎች የሉም' : 'No flagged reviews'}</h3>
                  <p>{am ? 'ሁሉም ግምገማዎች ደህና ናቸው' : 'All reviews look clean.'}</p>
                </div>
              ) : flaggedList.map(f => (
                <div key={f.id} className="admin-card">
                  <div style={{ marginBottom: 10 }}>
                    <div className="admin-card-name">{f.reviewer} → {f.sellerName}</div>
                    <span className="admin-card-reason">⚑ {f.reason}</span>
                    <div className="admin-card-meta" style={{ marginTop: 4 }}><Stars rating={f.rating} size={12} /> "{f.text}"</div>
                    <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{f.date}</div>
                  </div>
                  <div className="admin-card-actions">
                    <button className="btn-success" onClick={() => removeFlagged(f.id)}>{am ? 'አቆይ' : 'Keep'}</button>
                    <button className="btn-danger" onClick={() => removeFlagged(f.id)}>{am ? 'አስወግድ' : 'Remove'}</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {adminTab === 'settings' && (
            <div>
              <h2 className="tab-section-title">{am ? 'ቅንብሮች' : 'Settings'}</h2>
              <div className="settings-form">
                <h3>{am ? 'ስርዓት ቅንብሮች' : 'Platform Settings'}</h3>
                <div className="form-group">
                  <label className="form-label">{am ? 'የጣቢያ ስም' : 'Site Name'}</label>
                  <input className="form-input" defaultValue="AddisRating" />
                </div>
                <div className="form-group">
                  <label className="form-label">{am ? 'ኢሜይል' : 'Admin Email'}</label>
                  <input className="form-input" defaultValue="admin@addisrating.et" />
                </div>
                <div className="form-group">
                  <label className="form-label">{am ? 'የሚሸፈኑ ከተሞች' : 'Cities Covered'}</label>
                  <input className="form-input" defaultValue="12" />
                </div>
                <div className="form-group">
                  <div className="toggle-row">
                    <span className="toggle-label">{am ? 'ምዝገባ ማስጀመሪያ' : 'Allow New Registrations'}</span>
                    <button className="toggle on" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="toggle-row">
                    <span className="toggle-label">{am ? 'ግምገማ ሰጥ' : 'Email Notifications'}</span>
                    <button className="toggle on" />
                  </div>
                </div>
                <button className="btn-primary" style={{ width: '100%', marginTop: 8, padding: '12px' }} onClick={() => showToast(am ? 'ቅንብሮች ተቀምጠዋል! ✓' : 'Settings saved! ✓')}>
                  {am ? 'አስቀምጥ' : 'Save Settings'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{CSS}</style>
      <Nav />
      <main>
        {page === 'home' && <HomePage />}
        {page === 'browse' && <BrowsePage />}
        {page === 'profile' && selectedSeller && <ProfilePage seller={selectedSeller} />}
        {page === 'admin' && <AdminPage />}
      </main>
      {page !== 'admin' && <Footer />}
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
