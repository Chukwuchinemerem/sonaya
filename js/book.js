/* ==========================================================================
   Sonaya Beauty Studio — book.js
   Powers the multi-step booking wizard on book.html.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------------
     0. SERVICE CATALOGUE
     ⚠️ PRICES ARE PLACEHOLDERS — replace `price` values with Sonaya's real
     current rates before launch. See README for details.
  --------------------------------------------------------------------- */
  const SERVICES = {
    classic: {
      category: 'Lash Extensions',
      name: 'Classic Sets',
      price: 15000,
      img: 'https://images.unsplash.com/photo-1535310172250-0dcb6b63324e?q=80&w=900&auto=format&fit=crop',
      desc: "A single, hand-selected extension applied to each individual natural lash for clean definition and length. Ideal for first-timers or anyone who wants brighter eyes without an obvious \u2018done\u2019 look — low-maintenance and comfortable for daily wear.",
    },
    hybrid: {
      category: 'Lash Extensions',
      name: 'Hybrid Sets',
      price: 18000,
      img: 'https://images.unsplash.com/photo-1528047128849-2382ff646073?q=80&w=900&auto=format&fit=crop',
      desc: "A tailored blend of classic single lashes and lightweight volume fans, creating natural texture with a soft, wispy edge. Bridges the gap between a natural set and a fuller volume look — Sonaya's most requested lash style.",
    },
    volume: {
      category: 'Lash Extensions',
      name: 'Volume Sets',
      price: 22000,
      img: 'https://images.unsplash.com/photo-1540544732960-63c240c37388?q=80&w=900&auto=format&fit=crop',
      desc: "Multiple ultra-fine extensions are hand-fanned and applied to each natural lash, building density without adding unnecessary weight — a fuller, more dramatic finish that still feels comfortable.",
    },
    mega: {
      category: 'Lash Extensions',
      name: 'Mega Volume Sets',
      price: 28000,
      img: 'https://images.unsplash.com/photo-1520923390649-b2a76d00545c?q=80&w=900&auto=format&fit=crop',
      desc: "Our most dramatic set — high-volume handmade fans in ultra-fine diameters for a bold, blacked-out finish. Built for clients who want maximum impact for photos, events, or everyday glam.",
    },
    bottom: {
      category: 'Lash Extensions',
      name: 'Bottom Lash',
      price: 8000,
      img: 'https://images.unsplash.com/photo-1567629307995-b9f33097bd30?q=80&w=900&auto=format&fit=crop',
      desc: "Fine individual extensions applied along the lower lash line to open up and brighten the entire eye. Pairs beautifully with any top lash set, or stands alone as a subtle finishing touch.",
    },
    cluster: {
      category: 'Lash Extensions',
      name: 'Cluster Lash',
      price: 10000,
      img: 'https://images.unsplash.com/photo-1561505445-3d89277edf4c?q=80&w=900&auto=format&fit=crop',
      desc: "Pre-made lash clusters applied quickly for an instant, event-ready volume boost — a great option when you need a full, glam look on a shorter turnaround.",
    },
    strip: {
      category: 'Lash Extensions',
      name: 'Strip Lash',
      price: 6000,
      img: 'https://images.unsplash.com/photo-1589710751893-f9a6770ad71b?q=80&w=900&auto=format&fit=crop',
      desc: "Custom-fitted strip lashes, trimmed and styled to your eye shape for a flawless single-day look — no commitment, full drama, easy removal at the end of the day.",
    },
    ombre: {
      category: 'Brow Artistry',
      name: 'Ombre Brows',
      price: 35000,
      img: 'https://images.unsplash.com/photo-1674049406179-d7bf2c263e71?q=80&w=900&auto=format&fit=crop',
      desc: "A soft, gradient powder effect — lighter at the front of the brow and deepening toward the tail — for natural-looking definition that photographs beautifully. Semi-permanent and fully customised to your face shape.",
    },
    combo: {
      category: 'Brow Artistry',
      name: 'Combo Brows',
      price: 40000,
      img: 'https://images.unsplash.com/photo-1651839633408-3fccd671b832?q=80&w=900&auto=format&fit=crop',
      desc: "Hand-drawn hair strokes at the front of the brow blended into ombre shading through the body and tail, combining texture with definition for a fuller, more sculpted brow.",
    },
    microshading: {
      category: 'Brow Artistry',
      name: 'Microshading',
      price: 33000,
      img: 'https://images.unsplash.com/photo-1698335107935-e2c8287c4947?q=80&w=900&auto=format&fit=crop',
      desc: "A stippling technique that deposits fine dots of pigment to build a soft, powder-filled brow — a great option for oilier skin types where crisp hair strokes may not hold as well.",
    },
    microblading: {
      category: 'Brow Artistry',
      name: 'Microblading',
      price: 38000,
      img: 'https://images.unsplash.com/photo-1718720410649-7524fcb0f0a5?q=80&w=900&auto=format&fit=crop',
      desc: "A hand-tool technique where fine, hair-like strokes are etched into the skin to mimic natural brow hair, filling sparse areas with a natural, feathered finish.",
    },
    nano: {
      category: 'Brow Artistry',
      name: 'Nano Brows',
      price: 42000,
      img: 'https://images.unsplash.com/photo-1594715271011-63c18acf1489?q=80&w=900&auto=format&fit=crop',
      desc: "Similar to microblading but using an even finer needle for crisper, more precise hair-strokes — suited to a wider range of skin types, including those with active or oily skin.",
    },
  };

  function nairaFormat(n) {
    return '\u20A6' + n.toLocaleString('en-NG');
  }

  /* ---------------------------------------------------------------------
     1. Populate service dropdown with prices inline
  --------------------------------------------------------------------- */
  const serviceSelect = document.getElementById('service-select');
  const groups = {};
  Object.entries(SERVICES).forEach(([key, s]) => {
    if (!groups[s.category]) {
      groups[s.category] = document.createElement('optgroup');
      groups[s.category].label = s.category;
      serviceSelect.appendChild(groups[s.category]);
    }
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = `${s.name} — ${nairaFormat(s.price)}`;
    groups[s.category].appendChild(opt);
  });

  const previewCard = document.getElementById('service-preview');
  const previewImg = document.getElementById('preview-img');
  const previewName = document.getElementById('preview-name');
  const previewCategory = document.getElementById('preview-category');
  const previewPrice = document.getElementById('preview-price');
  const previewDesc = document.getElementById('preview-desc');

  const hiddenServiceName = document.getElementById('hidden-service-name');
  const hiddenServiceAmount = document.getElementById('hidden-service-amount');

  serviceSelect.addEventListener('change', () => {
    const s = SERVICES[serviceSelect.value];
    if (!s) {
      previewCard.classList.remove('show');
      return;
    }
    previewImg.src = s.img;
    previewImg.alt = s.name + ' — service preview';
    previewName.textContent = s.name;
    previewCategory.textContent = s.category;
    previewPrice.textContent = nairaFormat(s.price);
    previewDesc.textContent = s.desc;
    previewCard.classList.add('show');

    hiddenServiceName.value = `${s.name} (${s.category})`;
    hiddenServiceAmount.value = nairaFormat(s.price);
  });

  /* ---------------------------------------------------------------------
     2. Date & time dropdowns
  --------------------------------------------------------------------- */
  const dateSelect = document.getElementById('date-select');
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    const label = `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    const opt = document.createElement('option');
    opt.value = iso;
    opt.textContent = label;
    dateSelect.appendChild(opt);
  }

  const timeSelect = document.getElementById('time-select');
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  ];
  timeSlots.forEach((t) => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    timeSelect.appendChild(opt);
  });

  /* ---------------------------------------------------------------------
     3. Dropzones (selfie + reference image) with preview
  --------------------------------------------------------------------- */
  function wireDropzone(zoneId, inputId, previewId, labelId) {
    const zone = document.getElementById(zoneId);
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const label = document.getElementById(labelId);

    zone.addEventListener('click', () => input.click());
    zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag');
      if (e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        updatePreview();
      }
    });
    input.addEventListener('change', updatePreview);

    function updatePreview() {
      const file = input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.src = e.target.result;
        preview.style.display = 'block';
        label.textContent = file.name;
      };
      reader.readAsDataURL(file);
    }
  }
  wireDropzone('selfie-zone', 'selfie-input', 'selfie-preview', 'selfie-label');
  wireDropzone('ref-zone', 'ref-input', 'ref-preview', 'ref-label');

  /* ---------------------------------------------------------------------
     4. Multi-step wizard navigation
  --------------------------------------------------------------------- */
  const steps = [1, 2, 3];
  let currentStep = 1;

  const stepPanels = { 1: document.getElementById('step-panel-1'), 2: document.getElementById('step-panel-2'), 3: document.getElementById('step-panel-3') };
  const stepDots = { 1: document.getElementById('dot-1'), 2: document.getElementById('dot-2'), 3: document.getElementById('dot-3') };
  const lineFills = [document.getElementById('line-fill-1'), document.getElementById('line-fill-2')];

  function goToStep(n) {
    steps.forEach((s) => stepPanels[s].classList.remove('active'));
    stepPanels[n].classList.add('active');

    steps.forEach((s) => {
      stepDots[s].classList.remove('active', 'done');
      if (s < n) stepDots[s].classList.add('done');
      else if (s === n) stepDots[s].classList.add('active');
    });
    lineFills.forEach((fill, i) => {
      fill.style.width = i + 1 < n ? '100%' : '0%';
    });

    currentStep = n;
    window.scrollTo({ top: document.getElementById('booking-form-top').offsetTop - 100, behavior: 'smooth' });
  }

  function validateStep1() {
    const name = document.getElementById('field-name');
    const phone = document.getElementById('field-phone');
    const email = document.getElementById('field-email');
    if (!name.value.trim() || !phone.value.trim() || !email.value.trim() || !serviceSelect.value) {
      showFormMessage('Please fill in your name, phone, email and choose a service before continuing.');
      return false;
    }
    return true;
  }

  function validateStep2() {
    if (!dateSelect.value || !timeSelect.value) {
      showFormMessage('Please choose your preferred date and time before continuing.');
      return false;
    }
    return true;
  }

  const formMessage = document.getElementById('form-message');
  function showFormMessage(msg) {
    formMessage.textContent = msg;
    formMessage.classList.remove('hidden');
    setTimeout(() => formMessage.classList.add('hidden'), 4500);
  }

  document.getElementById('to-step-2').addEventListener('click', () => {
    if (validateStep1()) goToStep(2);
  });
  document.getElementById('back-to-step-1').addEventListener('click', () => goToStep(1));
  document.getElementById('to-step-3').addEventListener('click', () => {
    if (validateStep2()) { renderSummary(); goToStep(3); }
  });
  document.getElementById('back-to-step-2').addEventListener('click', () => goToStep(2));

  /* ---------------------------------------------------------------------
     5. Booking summary (step 3 recap)
  --------------------------------------------------------------------- */
  function renderSummary() {
    const s = SERVICES[serviceSelect.value];
    const summary = document.getElementById('booking-summary');
    if (!s) return;
    summary.innerHTML = `
      <div class="flex justify-between py-2 border-b border-espresso/10"><span class="text-espresso-soft">Service</span><span class="font-semibold text-espresso">${s.name}</span></div>
      <div class="flex justify-between py-2 border-b border-espresso/10"><span class="text-espresso-soft">Amount</span><span class="font-semibold text-espresso">${nairaFormat(s.price)}</span></div>
      <div class="flex justify-between py-2 border-b border-espresso/10"><span class="text-espresso-soft">Date</span><span class="font-semibold text-espresso">${dateSelect.options[dateSelect.selectedIndex]?.textContent || '—'}</span></div>
      <div class="flex justify-between py-2"><span class="text-espresso-soft">Time</span><span class="font-semibold text-espresso">${timeSelect.value || '—'}</span></div>
    `;
  }

  /* ---------------------------------------------------------------------
     6. Payment option → reveal bank details
  --------------------------------------------------------------------- */
  const payRadios = document.querySelectorAll('input[name="Payment Option"]');
  const bankDetails = document.getElementById('bank-details');
  payRadios.forEach((r) => {
    r.addEventListener('change', () => {
      bankDetails.classList.toggle('hidden', r.value !== 'Pay in Full' || !r.checked);
    });
  });
  // show by default since "Pay in Full" is pre-checked
  if (bankDetails) bankDetails.classList.remove('hidden');

  const copyBtn = document.getElementById('copy-account');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('8135547873').then(() => {
        copyBtn.classList.add('copied');
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.classList.remove('copied'); copyBtn.textContent = original; }, 1800);
      });
    });
  }

  /* ---------------------------------------------------------------------
     7. Policy agreement gate on submit button
  --------------------------------------------------------------------- */
  const agreeCheckbox = document.getElementById('policy-agree');
  const submitBtn = document.getElementById('submit-booking');
  function updateSubmitState() {
    submitBtn.disabled = !agreeCheckbox.checked;
    submitBtn.classList.toggle('opacity-50', !agreeCheckbox.checked);
    submitBtn.classList.toggle('cursor-not-allowed', !agreeCheckbox.checked);
  }
  agreeCheckbox.addEventListener('change', updateSubmitState);
  updateSubmitState();

  document.getElementById('booking-form').addEventListener('submit', (e) => {
    if (!agreeCheckbox.checked) {
      e.preventDefault();
      showFormMessage('Please agree to the Payment & Booking Policy before submitting.');
      goToStep(3);
      return;
    }

    localStorage.removeItem('sonaya_draft_booking');
  });

  /* ---------------------------------------------------------------------
     8. Save as Draft / Resume Draft (localStorage — this is a real,
     deployed static site, not an in-chat preview, so persisted local
     storage is appropriate here for a "save my progress" feature)
  --------------------------------------------------------------------- */
  const DRAFT_KEY = 'sonaya_draft_booking';
  const draftFieldIds = ['field-name', 'field-phone', 'field-email', 'service-select', 'date-select', 'time-select', 'field-requests'];

  document.getElementById('save-draft').addEventListener('click', () => {
    const draft = {};
    draftFieldIds.forEach((id) => { draft[id] = document.getElementById(id).value; });
    draft.savedAt = new Date().toLocaleString('en-NG');
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    showFormMessage('Draft saved on this device. You can safely come back later to finish booking.');
  });

  function loadDraftBanner() {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return;
    let draft;
    try { draft = JSON.parse(raw); } catch (err) { return; }
    const banner = document.getElementById('draft-banner');
    document.getElementById('draft-saved-at').textContent = draft.savedAt || '';
    banner.classList.remove('hidden');

    document.getElementById('resume-draft').addEventListener('click', () => {
      draftFieldIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && draft[id] !== undefined) el.value = draft[id];
      });
      serviceSelect.dispatchEvent(new Event('change'));
      banner.classList.add('hidden');
      showFormMessage('Draft restored — pick up right where you left off.');
    });
    document.getElementById('discard-draft').addEventListener('click', () => {
      localStorage.removeItem(DRAFT_KEY);
      banner.classList.add('hidden');
    });
  }
  loadDraftBanner();
})();
