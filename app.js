const form = document.querySelector('#claimForm');
const steps = [...document.querySelectorAll('.step')];
const nextBtn = document.querySelector('#next');
const backBtn = document.querySelector('#back');
const formActions = document.querySelector('#formActions');
const progressBar = document.querySelector('#progressBar');
const progressTrack = document.querySelector('#progressTrack');
const stepLabel = document.querySelector('#stepLabel');
const saveStatus = document.querySelector('#saveStatus');
const liveStatus = document.querySelector('#liveStatus');
const globalError = document.querySelector('#globalError');
const fileInput = document.querySelector('#evidence');
const fileStatus = document.querySelector('#fileStatus');
const unknownTime = document.querySelector('#unknownTime');
const lossTime = document.querySelector('#lossTime');
const saveProgress = document.querySelector('#saveProgress');
const reviewContent = document.querySelector('#reviewContent');
const STORAGE_KEY = 'cedarline-fnol-demo-v2';

const POLICIES = {
  auto: {
    label: 'Personal Auto',
    detailLabel: 'Vehicle',
    detail: '2023 Honda CR-V',
    ending: '4821',
    usableQuestion: 'Can the vehicle be driven safely?'
  },
  home: {
    label: 'Homeowners',
    detailLabel: 'Property',
    detail: '1847 Cedar Ridge Dr.',
    ending: '7746',
    usableQuestion: 'Can you safely remain in the home?'
  }
};

const fallbackCategories = [
  { code: 'collision', policies: ['auto'], label: 'Vehicle collision', description: 'Crash involving another vehicle, object, or roadway incident.' },
  { code: 'glass', policies: ['auto'], label: 'Glass or windshield damage', description: 'Cracked or broken glass without a larger collision.' },
  { code: 'weather-auto', policies: ['auto'], label: 'Weather or storm damage', description: 'Hail, wind, falling branches, flooding, or storm-related vehicle damage.' },
  { code: 'theft-auto', policies: ['auto'], label: 'Theft or vandalism', description: 'Vehicle theft, break-in, stolen parts, or malicious damage.' },
  { code: 'water-home', policies: ['home'], label: 'Water damage', description: 'Leak, burst pipe, appliance, or other sudden water loss.' },
  { code: 'weather-home', policies: ['home'], label: 'Weather or storm damage', description: 'Wind, hail, lightning, falling trees, or other storm-related property damage.' },
  { code: 'fire-home', policies: ['home'], label: 'Fire or smoke', description: 'Fire, smoke, soot, or related damage to the home or belongings.' },
  { code: 'theft-home', policies: ['home'], label: 'Theft or vandalism', description: 'Break-in, stolen property, or intentional damage.' },
  { code: 'other', policies: ['auto', 'home'], label: 'Something else / not sure', description: 'Use this if none of the categories fit or you are unsure.' }
];

let currentStep = 1;
let selectedFiles = [];
let categories = fallbackCategories;
let saveTimer;

function selectedPolicy() {
  return form.querySelector('input[name="policyType"]:checked')?.value || '';
}

function updatePolicyContext(policyKey) {
  const policy = POLICIES[policyKey];
  const type = document.querySelector('#policySummaryType');
  const detailLabel = document.querySelector('#policyDetailLabel');
  const detail = document.querySelector('#policySummaryDetail');
  const number = document.querySelector('#policySummaryNumber');
  const usableLegend = document.querySelector('#usableLegend');
  const lossIntro = document.querySelector('#lossIntro');

  if (!policy) {
    type.textContent = 'Choose a policy';
    detailLabel.textContent = 'Coverage';
    detail.textContent = '—';
    number.textContent = '—';
    usableLegend.textContent = 'Can it be used safely?';
    lossIntro.textContent = 'You can clarify details later. If you’re unsure, choose “Something else / not sure.”';
    return;
  }

  type.textContent = policy.label;
  detailLabel.textContent = policy.detailLabel;
  detail.textContent = policy.detail;
  number.textContent = policy.ending;
  usableLegend.textContent = policy.usableQuestion;
  lossIntro.textContent = `Showing claim types for your ${policy.label} policy. You can clarify details later.`;
}

function renderLossCategories(policyKey, selectedValue = '') {
  const target = document.querySelector('#lossOptions');
  const filtered = categories.filter(category => category.policies.includes(policyKey));
  const nodes = filtered.map(category => {
    const wrapper = document.createElement('label');
    wrapper.className = 'choice-card';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'lossType';
    input.value = category.label;
    input.id = `loss-${category.code}`;
    input.required = true;
    input.checked = category.label === selectedValue;

    const span = document.createElement('span');
    const strong = document.createElement('strong');
    strong.textContent = category.label;
    const small = document.createElement('small');
    small.textContent = category.description;
    span.append(strong, small);
    wrapper.append(input, span);
    return wrapper;
  });

  target.replaceChildren(...nodes);
}

async function loadLossCategories() {
  try {
    const response = await fetch('data/loss-categories.xml');
    if (!response.ok) throw new Error('XML request failed');
    const xmlText = await response.text();
    const xml = new DOMParser().parseFromString(xmlText, 'application/xml');
    if (xml.querySelector('parsererror')) throw new Error('XML parsing failed');

    categories = [...xml.querySelectorAll('category')].map(node => ({
      code: node.getAttribute('code') || 'unknown',
      policies: (node.getAttribute('policies') || 'auto home').split(/\s+/).filter(Boolean),
      label: node.querySelector('label')?.textContent?.trim() || 'Unknown',
      description: node.querySelector('description')?.textContent?.trim() || ''
    }));
  } catch (error) {
    categories = fallbackCategories;
    liveStatus.textContent = 'Loss categories loaded using built-in fallback data.';
  }

  restoreDraft();
}

function draftValues() {
  const data = Object.fromEntries(new FormData(form).entries());
  data.unknownTime = unknownTime.checked;
  data.skipEvidence = document.querySelector('#skipEvidence').checked;
  data.fileNames = selectedFiles;
  data.step = currentStep;
  return data;
}

function saveDraft(announce = false) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draftValues()));
  const time = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  saveStatus.textContent = `Saved ${time}`;
  if (announce) liveStatus.textContent = 'Your progress has been saved on this device.';
}

function scheduleSave() {
  window.clearTimeout(saveTimer);
  saveStatus.textContent = 'Saving…';
  saveTimer = window.setTimeout(() => saveDraft(false), 350);
}

function restoreDraft() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    updatePolicyContext('');
    return;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return;
  }

  const policyKey = POLICIES[data.policyType] ? data.policyType : '';
  if (policyKey) {
    const policyControl = form.querySelector(`input[name="policyType"][value="${policyKey}"]`);
    if (policyControl) policyControl.checked = true;
    updatePolicyContext(policyKey);
    renderLossCategories(policyKey, data.lossType || '');
  }

  Object.entries(data).forEach(([key, value]) => {
    if (['policyType', 'lossType', 'fileNames', 'step', 'unknownTime', 'skipEvidence'].includes(key)) return;
    const controls = form.elements[key];
    if (!controls) return;

    if (controls instanceof RadioNodeList) {
      [...controls].forEach(control => {
        if (control.value === value) control.checked = true;
      });
    } else if (controls.type !== 'file') {
      controls.value = value ?? '';
    }
  });

  unknownTime.checked = Boolean(data.unknownTime);
  lossTime.disabled = unknownTime.checked;
  document.querySelector('#skipEvidence').checked = Boolean(data.skipEvidence);

  selectedFiles = [];
  if (Array.isArray(data.fileNames) && data.fileNames.length) {
    fileStatus.textContent = 'Files are not restored for security. Please select them again if you want to include them.';
  } else {
    updateFileStatus();
  }

  const restoredStep = Number(data.step);
  const safeStep = Number.isInteger(restoredStep) && restoredStep >= 1 && restoredStep <= 7 ? restoredStep : 1;
  saveStatus.textContent = 'Draft restored';
  liveStatus.textContent = 'Your saved draft was restored. File selections must be added again.';
  if (safeStep === 7) buildReview();
  setStep(safeStep, false);
}

function setStep(step, moveFocus = true) {
  currentStep = step;
  steps.forEach(section => {
    section.hidden = Number(section.dataset.step) !== step;
  });

  if (step <= 7) {
    const percent = (step / 7) * 100;
    progressBar.style.width = `${percent}%`;
    stepLabel.textContent = `Step ${step} of 7`;
    progressTrack.setAttribute('aria-valuenow', String(step));
    progressTrack.setAttribute('aria-valuetext', `Step ${step} of 7`);
    backBtn.disabled = step === 1;
    nextBtn.textContent = step === 7 ? 'Submit claim report' : 'Continue';
    formActions.hidden = false;
    saveProgress.hidden = false;
  } else {
    progressBar.style.width = '100%';
    stepLabel.textContent = 'Submitted';
    progressTrack.setAttribute('aria-valuenow', '7');
    progressTrack.setAttribute('aria-valuetext', 'Claim report submitted');
    formActions.hidden = true;
    saveProgress.hidden = true;
  }

  globalError.hidden = true;
  globalError.innerHTML = '';

  if (moveFocus) {
    const heading = document.querySelector(`.step[data-step="${step}"] h2`);
    heading?.focus();
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
  }
}

function clearErrors() {
  document.querySelectorAll('.field-error').forEach(el => { el.textContent = ''; });
  document.querySelectorAll('[aria-invalid="true"]').forEach(el => el.removeAttribute('aria-invalid'));
  globalError.hidden = true;
  globalError.innerHTML = '';
}

function validateStep(step) {
  clearErrors();
  const errors = [];

  const add = (message, errorId, focusSelector) => {
    const target = document.querySelector(`#${errorId}`);
    if (target) target.textContent = message;
    const focusTarget = document.querySelector(focusSelector);
    if (focusTarget) focusTarget.setAttribute('aria-invalid', 'true');
    errors.push({ message, focusSelector });
  };

  if (step === 1 && !selectedPolicy()) {
    add('Choose the policy connected to this loss.', 'policyTypeError', 'input[name="policyType"]');
  }

  if (step === 2 && !form.querySelector('input[name="lossType"]:checked')) {
    add('Choose the option that best matches what happened.', 'lossTypeError', 'input[name="lossType"]');
  }

  if (step === 3) {
    if (!document.querySelector('#lossDate').value) add('Enter the date of the loss.', 'lossDateError', '#lossDate');
    if (!document.querySelector('#location').value.trim()) add('Enter an address, intersection, or general location.', 'locationError', '#location');
  }

  if (step === 4) {
    if (!form.querySelector('input[name="injury"]:checked')) add('Choose No, Yes, or Unsure for injuries.', 'injuryError', 'input[name="injury"]');
    if (!form.querySelector('input[name="usable"]:checked')) add('Choose Yes, No, or Unsure for the safety question.', 'usableError', 'input[name="usable"]');
    if (!document.querySelector('#damage').value.trim()) add('Describe the damage you can see right now.', 'damageError', '#damage');
  }

  if (step === 6 && !form.querySelector('input[name="contact"]:checked')) {
    add('Choose how you would like the claims team to contact you first.', 'contactError', 'input[name="contact"]');
  }

  if (step === 7 && !document.querySelector('#accuracy').checked) {
    add('Confirm the statement before submitting your report.', 'accuracyError', '#accuracy');
  }

  if (!errors.length) return true;

  const heading = document.createElement('strong');
  heading.textContent = `Please fix ${errors.length === 1 ? 'this item' : `${errors.length} items`}:`;
  const list = document.createElement('ul');

  errors.forEach(error => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'error-link';
    button.textContent = error.message;
    button.addEventListener('click', () => document.querySelector(error.focusSelector)?.focus());
    item.append(button);
    list.append(item);
  });

  globalError.replaceChildren(heading, list);
  globalError.hidden = false;
  globalError.focus();
  return false;
}

function addReviewItem(container, label, value, editStep) {
  const item = document.createElement('div');
  item.className = 'review-item';

  const list = document.createElement('dl');
  const term = document.createElement('dt');
  term.textContent = label;
  const description = document.createElement('dd');
  description.textContent = value;
  list.append(term, description);

  const edit = document.createElement('button');
  edit.type = 'button';
  edit.className = 'edit-button';
  edit.dataset.editStep = String(editStep);
  edit.textContent = `Edit ${label.toLowerCase()}`;
  edit.setAttribute('aria-label', `Edit ${label}`);

  item.append(list, edit);
  container.append(item);
}

function buildReview() {
  const data = draftValues();
  const policy = POLICIES[data.policyType];
  reviewContent.innerHTML = '';

  addReviewItem(reviewContent, 'Policy', policy ? `${policy.label} — ${policy.detail}` : 'Not provided', 1);
  addReviewItem(reviewContent, 'What happened', data.lossType || 'Not provided', 2);
  addReviewItem(reviewContent, 'When', `${data.lossDate || 'Not provided'}${data.unknownTime ? ' • exact time unknown' : data.lossTime ? ` • ${data.lossTime}` : ''}`, 3);
  addReviewItem(reviewContent, 'Where', data.location || 'Not provided', 3);
  addReviewItem(reviewContent, 'Injuries', data.injury || 'Not provided', 4);
  addReviewItem(reviewContent, 'Safety', data.usable || 'Not provided', 4);
  addReviewItem(reviewContent, 'Visible damage', data.damage || 'Not provided', 4);
  addReviewItem(reviewContent, 'Evidence', selectedFiles.length ? `${selectedFiles.length} file(s): ${selectedFiles.join(', ')}` : 'Adding later', 5);
  addReviewItem(reviewContent, 'Preferred contact', data.contact || 'Not provided', 6);
  addReviewItem(reviewContent, 'Best contact time', data.contactWindow || 'No preference provided', 6);
}

function submitClaim() {
  const data = draftValues();
  const random = new Uint32Array(1);
  window.crypto.getRandomValues(random);
  const claimSuffix = String(random[0] % 1000000).padStart(6, '0');

  document.querySelector('#claimNumber').textContent = `CLM-${claimSuffix}`;
  document.querySelector('#submittedAt').textContent = new Date().toLocaleString();
  document.querySelector('#confirmedContact').textContent = data.contact || 'Your selected preference';

  localStorage.removeItem(STORAGE_KEY);
  liveStatus.textContent = 'Claim report submitted successfully.';
  setStep(8);
}

function updateFileStatus() {
  fileStatus.textContent = selectedFiles.length
    ? `${selectedFiles.length} file(s) selected: ${selectedFiles.join(', ')}`
    : 'No files selected.';
}

nextBtn.addEventListener('click', () => {
  if (!validateStep(currentStep)) return;
  if (currentStep === 7) {
    submitClaim();
    return;
  }

  saveDraft(false);
  const nextStep = currentStep + 1;
  if (nextStep === 7) buildReview();
  setStep(nextStep);
});

backBtn.addEventListener('click', () => {
  if (currentStep > 1) setStep(currentStep - 1);
});

form.addEventListener('input', event => {
  if (event.target.type !== 'file') scheduleSave();
});

form.addEventListener('change', event => {
  if (event.target.name === 'policyType') {
    const policyKey = selectedPolicy();
    updatePolicyContext(policyKey);
    renderLossCategories(policyKey);
    scheduleSave();
  }
});

fileInput.addEventListener('change', () => {
  selectedFiles = [...fileInput.files].map(file => file.name);
  updateFileStatus();
  saveDraft(false);
  liveStatus.textContent = `${selectedFiles.length} file${selectedFiles.length === 1 ? '' : 's'} selected. Files remain on this device in the prototype.`;
});

unknownTime.addEventListener('change', () => {
  lossTime.disabled = unknownTime.checked;
  if (unknownTime.checked) lossTime.value = '';
  scheduleSave();
});

reviewContent.addEventListener('click', event => {
  const button = event.target.closest('[data-edit-step]');
  if (!button) return;
  setStep(Number(button.dataset.editStep));
});

saveProgress.addEventListener('click', () => saveDraft(true));

document.querySelector('#restart').addEventListener('click', () => {
  form.reset();
  selectedFiles = [];
  updateFileStatus();
  renderLossCategories('');
  updatePolicyContext('');
  localStorage.removeItem(STORAGE_KEY);
  saveStatus.textContent = 'Not saved yet';
  setStep(1);
});

document.querySelector('#lossDate').max = new Date().toISOString().split('T')[0];
loadLossCategories();
setStep(1, false);
