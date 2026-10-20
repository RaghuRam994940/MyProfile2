// Dynamic Script & Utilities for Karumanchi Raghu Ram's Portfolio

// Code Snippets for Interactive Terminal
const snippets = {
  cpp: `// C++ Algorithmic Solution Demo
#include <iostream>
#include <vector>

class Solution {
public:
    void evaluateCandidate() {
        std::cout << "Name: Karumanchi Raghu Ram\\n";
        std::cout << "Role: Computer Science Engineer\\n";
        std::cout << "Focus: Clean Logic, Rigorous Systems & Frontend\\n";
    }
};

int main() {
    Solution dev;
    dev.evaluateCandidate();
    return 0;
}`,
  c: `/* C Systems Programming Demo */
#include <stdio.h>
#include <stdlib.h>

typedef struct {
    char name[64];
    float cgpa;
    char institution[32];
} Engineer;

int main() {
    Engineer student = {"Karumanchi Raghu Ram", 8.2f, "NBKRIST"};
    printf("Candidate: %s\\nScore: %.1f CGPA\\nCollege: %s\\n", 
           student.name, student.cgpa, student.institution);
    return 0;
}`,
  js: `// Modern Frontend Architecture (Vanilla ES6+)
const candidate = {
  name: "Karumanchi Raghu Ram",
  skills: ["C", "C++", "HTML5", "CSS3", "JavaScript"],
  certified: ["Oracle DB CSE Workshop", "NPTEL Courses", "RITx Critical Thinking"],
  readyForRole: true
};

console.log(\`Ready to build high-performance systems: \${candidate.readyForRole}\`);`
};

function switchSnippet(lang) {
  const codeDisplay = document.getElementById("terminal-code-display");
  const tabs = document.querySelectorAll(".t-tab");
  
  if (snippets[lang] && codeDisplay) {
    codeDisplay.textContent = snippets[lang];
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.textContent.toLowerCase().includes(lang));
    });
  }
}

// Copy to Clipboard Utility with Toast
function copyText(text, btnId) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied to clipboard: ${text}`);
    const btn = document.getElementById(btnId);
    if (btn) {
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class="btn-icon">✓</span> Copied!`;
      setTimeout(() => {
        btn.innerHTML = originalText;
      }, 2000);
    }
  }).catch(err => {
    showToast(`Unable to copy text: ${err}`);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// Contact Form Handler connected to live Neon PostgreSQL
async function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  const sendBtn = document.getElementById("send-msg-btn");

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  if (!name || !email || !message) {
    feedback.className = "form-feedback error";
    feedback.textContent = "Please fill in all fields (Name, Email, Message).";
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Transmitting to Neon DB...";
  feedback.className = "form-feedback";
  feedback.textContent = "";

  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();
    if (res.ok && data.success) {
      feedback.className = "form-feedback success";
      feedback.textContent = `Transmission verified! Thank you, ${name}. Your message is stored in Neon Cloud DB.`;
      form.reset();
      showToast("Message recorded in Neon Cloud DB!");
    } else {
      throw new Error(data.error || "Server could not process message");
    }
  } catch (err) {
    feedback.className = "form-feedback error";
    feedback.textContent = `Transmission notice: ${err.message}. Please check connection.`;
    showToast(`Transmission error: ${err.message}`);
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Transmit Message";
  }
}

// Interactive Chess Tactical Widget
const initialPieces = {
  'e8': '♚', 'd8': '♛', 'c8': '♝', 'b8': '♞', 'a8': '♜', 'f8': '♝', 'g8': '♞', 'h8': '♜',
  'a7': '♟', 'b7': '♟', 'c7': '♟', 'd7': '♟', 'e7': '♟', 'f7': '♟', 'g7': '♟', 'h7': '♟',
  'a2': '♙', 'b2': '♙', 'c2': '♙', 'd2': '♙', 'e4': '♙', 'f2': '♙', 'g2': '♙', 'h2': '♙',
  'a1': '♖', 'f3': '♘', 'c1': '♗', 'd1': '♕', 'e1': '♔', 'f1': '♗', 'c3': '♘', 'h1': '♖'
};

const tacticalDescriptions = {
  'f3': "White Knight on f3 controlling e5 and d4 central outposts. Demonstrates calculated forward positioning.",
  'c3': "White Knight on c3 guarding the d5 square. Parallel execution in code structure.",
  'e4': "King's Pawn opening advance: secures spatial advantage and unblocks diagonal vectors.",
  'e1': "King on e1: well protected by coordinated defensive files.",
  'd1': "Queen on d1: prepared for rapid tactical mobilization across ranks and files."
};

function renderChessBoard() {
  const board = document.getElementById("chess-board");
  if (!board) return;
  board.innerHTML = "";

  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  ranks.forEach((rank, rIdx) => {
    files.forEach((file, fIdx) => {
      const square = document.createElement("div");
      const coord = `${file}${rank}`;
      const isLight = (rIdx + fIdx) % 2 === 0;

      square.className = `chess-square ${isLight ? 'light' : 'dark'}`;
      square.dataset.coord = coord;

      if (initialPieces[coord]) {
        square.textContent = initialPieces[coord];
        if (tacticalDescriptions[coord]) {
          square.style.cursor = "pointer";
        }
      }

      square.addEventListener("click", () => handleSquareClick(coord));
      board.appendChild(square);
    });
  });
}

function handleSquareClick(coord) {
  const statusEl = document.getElementById("chess-status");
  const allSquares = document.querySelectorAll(".chess-square");
  allSquares.forEach(sq => sq.classList.remove("selected", "highlight"));

  const targetSq = document.querySelector(`[data-coord="${coord}"]`);
  if (targetSq) {
    targetSq.classList.add("selected");
  }

  if (tacticalDescriptions[coord]) {
    statusEl.textContent = `[${coord.toUpperCase()}] ${tacticalDescriptions[coord]}`;
    showToast(`Tactical inspection: ${coord.toUpperCase()}`);
  } else if (initialPieces[coord]) {
    statusEl.textContent = `[${coord.toUpperCase()}] Piece ${initialPieces[coord]} positioned at ${coord}.`;
  } else {
    statusEl.textContent = `Square ${coord.toUpperCase()}: Vacant square ready for territorial advance.`;
  }
}

function resetBoard() {
  renderChessBoard();
  const statusEl = document.getElementById("chess-status");
  if (statusEl) {
    statusEl.textContent = "Click any active piece to inspect strategic move calculation.";
  }
  showToast("Board position reset.");
}

// Header elevation on scroll
window.addEventListener("scroll", () => {
  const header = document.getElementById("site-header");
  if (header) {
    if (window.scrollY > 40) {
      header.style.borderColor = "var(--border-accent)";
      header.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.6)";
    } else {
      header.style.borderColor = "var(--border-subtle)";
      header.style.boxShadow = "none";
    }
  }
});

/* -------------------------------------------------------------
   300-Frame Zero-G Chess Scroll Scrubber Canvas Engine
------------------------------------------------------------- */
const TOTAL_FRAMES = 300;
const frames = new Array(TOTAL_FRAMES);
let currentFrameIndex = 0;
let isFirstFrameLoaded = false;
let canvas, ctx;
let isTicking = false;

function getFramePath(index) {
  // Pad index 1-300 with 3 digits: 001, 002, ..., 300
  const padded = String(index).padStart(3, "0");
  return `gif/ezgif-frame-${padded}.jpg`;
}

function initChessHeroSequence() {
  canvas = document.getElementById("chess-intro-canvas");
  if (!canvas) return;
  ctx = canvas.getContext("2d", { alpha: false });

  // Size canvas to device pixel ratio
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // 1. Immediately load and paint Frame 1
  const firstFrameImg = new Image();
  firstFrameImg.src = getFramePath(1);
  firstFrameImg.onload = () => {
    frames[0] = firstFrameImg;
    isFirstFrameLoaded = true;
    renderFrame(0);
  };

  // 2. Progressive background preload for all 300 frames
  preloadRemainingFrames();

  // 3. Scroll-scrub listener using requestAnimationFrame
  window.addEventListener("scroll", onScrollUpdate, { passive: true });
  // Initial position check
  onScrollUpdate();
}

function resizeCanvas() {
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.floor(rect.width * dpr);
  canvas.height = Math.floor(rect.height * dpr);
  if (isFirstFrameLoaded) {
    renderFrame(currentFrameIndex);
  }
}

function preloadRemainingFrames() {
  let loadedCount = 1; // frame 1 is already started
  const badgeText = document.getElementById("hero-loader-text");

  // Load in progressive batches for network efficiency
  for (let i = 2; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    const frameIdx = i - 1;
    img.onload = () => {
      frames[frameIdx] = img;
      loadedCount++;
      if (badgeText) {
        const percent = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        if (percent < 100) {
          badgeText.textContent = `Loading Zero-G Strategy: ${percent}%`;
        } else {
          badgeText.textContent = `Zero-G Strategy Loaded (300/300)`;
        }
      }
    };
    img.onerror = () => {
      // In case of any frame read error, fallback to previous
      loadedCount++;
    };
  }
}

function renderFrame(index) {
  if (!canvas || !ctx) return;

  // Find target frame or fallback to nearest loaded frame
  let img = frames[index];
  if (!img) {
    // Search backward for nearest available frame
    for (let i = index - 1; i >= 0; i--) {
      if (frames[i]) {
        img = frames[i];
        break;
      }
    }
  }
  if (!img) {
    // Search forward if backward had none
    for (let i = index + 1; i < TOTAL_FRAMES; i++) {
      if (frames[i]) {
        img = frames[i];
        break;
      }
    }
  }

  if (!img) return;

  // Object-fit 'cover' rendering with high-DPI scaling
  const cWidth = canvas.width;
  const cHeight = canvas.height;
  const imgWidth = img.naturalWidth || 1280;
  const imgHeight = img.naturalHeight || 720;

  const scale = Math.max(cWidth / imgWidth, cHeight / imgHeight);
  const renderWidth = imgWidth * scale;
  const renderHeight = imgHeight * scale;
  const offsetX = (cWidth - renderWidth) / 2;
  const offsetY = (cHeight - renderHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
}

function onScrollUpdate() {
  if (!isTicking) {
    window.requestAnimationFrame(() => {
      handleScrollScrub();
      isTicking = false;
    });
    isTicking = true;
  }
}

function handleScrollScrub() {
  const container = document.getElementById("hero-scroll");
  if (!container) return;

  const rect = container.getBoundingClientRect();
  const totalDistance = container.offsetHeight - window.innerHeight;
  if (totalDistance <= 0) return;

  // Progress 0.0 at top of hero-scroll, 1.0 when scrolled past
  const scrolled = -rect.top;
  const progress = Math.min(Math.max(scrolled / totalDistance, 0), 1);

  // Compute frame index 0 to 299
  const targetFrame = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
  if (targetFrame !== currentFrameIndex) {
    currentFrameIndex = targetFrame;
    renderFrame(currentFrameIndex);
  }

  // Choreograph HUD narrative phases based on scroll progress
  const p1 = document.getElementById("hero-phase-1");
  const p2 = document.getElementById("hero-phase-2");
  const p3 = document.getElementById("hero-phase-3");
  const cue = document.getElementById("hero-scroll-cue");

  if (p1 && p2 && p3) {
    if (progress < 0.28) {
      p1.classList.add("active");
      p2.classList.remove("active");
      p3.classList.remove("active");
    } else if (progress >= 0.28 && progress < 0.68) {
      p1.classList.remove("active");
      p2.classList.add("active");
      p3.classList.remove("active");
    } else {
      p1.classList.remove("active");
      p2.classList.remove("active");
      p3.classList.add("active");
    }
  }

  if (cue) {
    // Fade out bottom cue once scrolling begins
    cue.style.opacity = progress > 0.04 ? "0" : "0.9";
  }
}

/* -------------------------------------------------------------
   GitHub-Style Alternating Side Reveal IntersectionObserver
------------------------------------------------------------- */
function initScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal-block");
  if (!revealElements.length) return;

  // Check if browser supports IntersectionObserver
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        // Keep it revealed permanently like GitHub's smooth narrative flow
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/* -------------------------------------------------------------
   Mobile Drawer Controller
------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById("mobile-nav-toggle");
  const drawer = document.getElementById("mobile-drawer");
  const backdrop = document.getElementById("mobile-drawer-backdrop");
  const closeBtn = document.getElementById("drawer-close-btn");
  const drawerLinks = document.querySelectorAll(".drawer-link, #drawer-cta-btn");

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    drawer.classList.add("is-open");
    backdrop.classList.add("is-open");
    toggleBtn.classList.add("is-active");
    toggleBtn.setAttribute("aria-expanded", "true");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    toggleBtn.classList.remove("is-active");
    toggleBtn.setAttribute("aria-expanded", "false");
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("is-open");
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeDrawer);
  }

  backdrop.addEventListener("click", closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeDrawer();
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("is-open")) {
      closeDrawer();
    }
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderChessBoard();
  initChessHeroSequence();
  initScrollReveals();
  initMobileDrawer();
});


