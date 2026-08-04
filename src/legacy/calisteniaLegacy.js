/* ═══════════════════════════════════════
   STATUX v2.1 — SCRIPT
═══════════════════════════════════════ */

// ── ICONS ──────────────────────────────
function initIcons(){ if(window.lucide) lucide.createIcons(); }

// ── STREAK ─────────────────────────────
function updateStreak(){
    const today = new Date().toISOString().split('T')[0];
    const lastDate = localStorage.getItem('statux_last_date');
    let streak = parseInt(localStorage.getItem('statux_streak')) || 0;
    let best = parseInt(localStorage.getItem('statux_streak_best')) || 0;

    if(!lastDate){
        streak = 1;
    } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate()-1);
        const yStr = yesterday.toISOString().split('T')[0];
        if(lastDate === today){}
        else if(lastDate === yStr){ streak++; }
        else{ streak = 1; }
    }

    if(streak > best){ best = streak; localStorage.setItem('statux_streak_best', best); }
    localStorage.setItem('statux_last_date', today);
    localStorage.setItem('statux_streak', streak);

    const el = document.getElementById('streak-display');
    if(el) el.textContent = `${streak} ${streak===1?'Día':'Días'}`;
    const bEl = document.getElementById('streak-best-display');
    if(bEl) bEl.textContent = best;
}

// ── WEEKLY PROGRESS ────────────────────
const DAY_LABELS = ['L','M','X','J','V','S','D'];
const DAY_NAMES  = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

function renderWeekDays(){
    const container = document.getElementById('weekDays');
    if(!container) return;
    const today = new Date();
    const todayDow = (today.getDay()+6)%7; // 0=Mon
    const checkins = JSON.parse(localStorage.getItem('statux_checkins')||'{}');
    let done = 0;
    const saved = JSON.parse(localStorage.getItem('statux_saved_routine')||'[]');
    const trainingDays = saved.map(d => DAY_NAMES.indexOf(d.day));

    container.innerHTML = DAY_LABELS.map((lbl,i)=>{
        // Get date for this day of the current week
        const diff = i - todayDow;
        const d = new Date(today);
        d.setDate(today.getDate() + diff);
        const key = d.toISOString().split('T')[0];
        const isDone = !!checkins[key];
        const isToday = i === todayDow;
        const isTraining = trainingDays.includes(i);
        if(isDone) done++;
        return `<div class="week-day ${isDone?'done':''} ${isToday?'today':''}">
            <div class="week-day-dot"></div>
            <div class="week-day-label">${lbl}</div>
        </div>`;
    }).join('');

    const total = trainingDays.length;
    const wLabel = document.getElementById('week-count-label');
    if(wLabel) wLabel.textContent = `${done}/${total||'?'} sesiones`;
}

// ── TODAY CARD ─────────────────────────
const REST_QUOTES = [
    "Hoy no entrenas. Hoy evolucionas en silencio.",
    "El músculo crece cuando descansas, no cuando te destruyes.",
    "Descanso activo: hidratación, sueño, mentalidad.",
    "Los fuertes descansan con propósito. Los débiles con culpa.",
    "Reset físico y mental. Mañana, más peligroso."
];

function renderTodayCard(){
    const todayDow = (new Date().getDay()+6)%7;
    const todayName = DAY_NAMES[todayDow];
    const saved = JSON.parse(localStorage.getItem('statux_saved_routine')||'[]');
    const todayData = saved.find(d=>d.day===todayName);
    const checkins = JSON.parse(localStorage.getItem('statux_checkins')||'{}');
    const todayKey = new Date().toISOString().split('T')[0];
    const isDone = !!checkins[todayKey];

    const dayLabel = document.getElementById('todayDayLabel');
    const focusLabel = document.getElementById('todayFocusLabel');
    const content = document.getElementById('todayContent');
    if(!dayLabel) return;

    dayLabel.textContent = todayName.toUpperCase();

    if(!saved.length){
        focusLabel.textContent = '—';
        content.innerHTML = `<div style="color:#444;font-size:0.8rem;padding:8px 0">Sin rutina guardada. Genera una desde "Entrenar".</div>`;
        return;
    }

    if(todayData){
        focusLabel.textContent = todayData.focus || 'Entrenamiento';
        if(isDone){
            content.innerHTML = `<div class="checkin-done"><i data-lucide="check-circle" style="width:18px;height:18px"></i> Sesión completada hoy</div>`;
        } else {
            const exList = (todayData.exercises||[]).slice(0,3).map(ex=>`
                <div class="today-ex-row">
                    <span class="today-ex-name">${ex.name}</span>
                    <span class="today-ex-sets">${ex.sets?.[localStorage.getItem('statux_level')||'intermediate']||'—'}</span>
                </div>`).join('');
            const more = (todayData.exercises||[]).length > 3 ? `<div style="font-size:0.68rem;color:#444;margin-top:4px">+${todayData.exercises.length-3} ejercicios más</div>` : '';
            content.innerHTML = `<div class="today-exercises">${exList}${more}</div>`;
        }
    } else {
        focusLabel.textContent = 'DESCANSO';
        const q = REST_QUOTES[new Date().getDay() % REST_QUOTES.length];
        content.innerHTML = `<div class="today-rest"><div class="today-rest-icon">💤</div><div class="today-rest-text"><strong>Día de recuperación</strong>${q}</div></div>`;
    }
    initIcons();
}

// ── PROGRESSION CHECK ──────────────────
function checkProgression(){
    const lastUpdate = parseInt(localStorage.getItem('statux_routine_saved_at')||'0');
    const progressionActive = localStorage.getItem('statux_progression_active')==='true';
    if(!lastUpdate) return;
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    const dismissed = parseInt(localStorage.getItem('statux_progression_dismissed')||'0');
    if(Date.now() - lastUpdate >= twoWeeks && Date.now() - dismissed > twoWeeks){
        document.getElementById('progressionBadge').style.display='flex';
        openProgressionModal();
    }
    if(progressionActive){
        document.getElementById('progressionBadge').style.display='flex';
    }
}

function openProgressionModal(){ document.getElementById('progressionModal').classList.add('open'); }
function dismissProgressionModal(){
    document.getElementById('progressionModal').classList.remove('open');
    localStorage.setItem('statux_progression_dismissed', Date.now());
}
function activateProgression(){
    localStorage.setItem('statux_progression_active','true');
    dismissProgressionModal();
    navigate('saved-routine');
}

// ── NAVIGATION ─────────────────────────
function navigate(sectionId){
    const sections = {
        'dashboard': 'container-main',
        'routines': 'routines',
        'saved-routine': 'saved-routine-section',
        'anatomy': 'anatomy-section',
        'nutrition': 'nutrition-section',
        'timer': 'timer-section',
        'manual-routine': 'manual-routine-section'
    };

    Object.values(sections).forEach(id=>{
        const el = document.getElementById(id);
        if(el) el.style.display='none';
    });

    document.querySelectorAll('.nav-item').forEach(el=>el.classList.remove('active'));

    const target = sections[sectionId];
    if(!target) return;

    const el = document.getElementById(target);
    if(el) el.style.display = (sectionId==='routines'||sectionId==='anatomy')?'block':'block';

    const navMap = {
        'dashboard':'btn-nav-dashboard','saved-routine':'btn-nav-saved',
        'routines':'btn-nav-routines','anatomy':'btn-nav-anatomy','timer':'btn-nav-timer'
    };
    if(navMap[sectionId]) document.getElementById(navMap[sectionId])?.classList.add('active');

    if(sectionId==='saved-routine') loadSavedRoutine();
    if(sectionId==='anatomy') initAnatomy();
    if(sectionId==='manual-routine') initManualEditor();
    if(sectionId==='dashboard'){ renderTodayCard(); renderWeekDays(); }

    initIcons();
    window.scrollTo(0,0);
}

// ── SAVE ROUTINE ───────────────────────
let currentGeneratedRoutine = null;

function saveRoutine(){
    if(!currentGeneratedRoutine) return;
    const name = document.getElementById('routineNameInput').value.trim() || 'Mi Rutina';
    localStorage.setItem('statux_saved_routine', JSON.stringify(currentGeneratedRoutine));
    localStorage.setItem('statux_routine_name', name);
    localStorage.setItem('statux_routine_saved_at', Date.now());
    localStorage.removeItem('statux_progression_active');
    alert(`"${name}" guardada con éxito.`);
}

// ── LOAD SAVED ROUTINE ─────────────────
function loadSavedRoutine(){
    const saved = JSON.parse(localStorage.getItem('statux_saved_routine')||'[]');
    const name = localStorage.getItem('statux_routine_name') || 'Tu Rutina';
    const progressionActive = localStorage.getItem('statux_progression_active')==='true';
    const level = localStorage.getItem('statux_level')||'intermediate';
    const daysList = document.getElementById('daysList');
    const titleEl = document.getElementById('savedRoutineTitle');
    const checkins = JSON.parse(localStorage.getItem('statux_checkins')||'{}');

    if(titleEl) titleEl.innerHTML = `${name} <span>Plan semanal</span>`;
    if(!daysList) return;
    daysList.innerHTML='';

    DAY_NAMES.forEach(dayName=>{
        const dayWorkout = saved.find(d=>d.day===dayName);
        const card = document.createElement('div');
        card.className='day-item-card';

        // Find the date key for this day
        const today = new Date();
        const todayDow = (today.getDay()+6)%7;
        const thisDow = DAY_NAMES.indexOf(dayName);
        const diff = thisDow - todayDow;
        const d = new Date(today); d.setDate(today.getDate()+diff);
        const dateKey = d.toISOString().split('T')[0];
        const isDone = !!checkins[dateKey];
        const isToday = diff === 0;

        if(dayWorkout){
            let exHtml = dayWorkout.exercises.map(ex=>{
                const baseSets = ex.sets?.[level]||'3x10';
                let sets = baseSets;
                let upgraded = false;
                if(progressionActive){
                    // Parse and increment
                    const match = baseSets.match(/(\d+)x(\d+)/);
                    if(match){
                        const newReps = parseInt(match[2])+2;
                        sets = `${match[1]}x${newReps}`;
                        upgraded = true;
                    }
                }
                return `<div class="exercise-row">
                    <div>
                        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                            <div class="exercise-name">${ex.name}</div>
                        </div>
                        <div class="exercise-muscles">${(ex.muscles||[]).map(m=>`<span class="muscle-tag">${m}</span>`).join('')}</div>
                        <div class="exercise-meta">Descanso: ${ex.rest||60}s · <span style="color:var(--gray)">${ex.diff||'intermediate'}</span></div>
                    </div>
                    <div class="sets-badge ${upgraded?'upgraded':''}">${sets}${upgraded?' ↑':''}</div>
                </div>`;
            }).join('');

            const warmup = dayWorkout.warmup||[];
            const cooldown = dayWorkout.cooldown||[];
            let warmupHtml = warmup.map(w=>`<div class="warmup-row"><span class="warmup-tag warm">Calent.</span><span class="warmup-name">${w.name}</span><span class="warmup-sets">${w.sets}</span></div>`).join('');
            let cooldownHtml = cooldown.map(c=>`<div class="warmup-row"><span class="warmup-tag cool">Enfr.</span><span class="warmup-name">${c.name}</span><span class="warmup-sets">${c.sets}</span></div>`).join('');

            card.innerHTML = `
                <div class="day-item-header">
                    <span class="day-item-name">${dayName}${isToday?' <span style="font-size:0.55rem;color:var(--green);letter-spacing:1px;vertical-align:middle"> HOY</span>':''}</span>
                    <span class="day-item-type">${dayWorkout.focus}</span>
                </div>
                ${warmupHtml}
                <div>${exHtml}</div>
                ${cooldownHtml}
                ${isDone
                    ? `<div style="margin-top:12px;display:flex;align-items:center;gap:8px;font-size:0.75rem;color:var(--green);font-weight:600"><i data-lucide="check-circle" style="width:16px;height:16px"></i>Completado</div>`
                    : `<button class="checkin-btn" onclick="checkIn('${dateKey}',this)">✓ Completé esta sesión</button>`
                }`;
        } else {
            const q = REST_QUOTES[DAY_NAMES.indexOf(dayName) % REST_QUOTES.length];
            card.innerHTML = `
                <div class="day-item-header">
                    <span class="day-item-name">${dayName}${isToday?' <span style="font-size:0.55rem;color:var(--green);letter-spacing:1px;vertical-align:middle"> HOY</span>':''}</span>
                    <span class="day-item-type">Recuperación</span>
                </div>
                <div class="rest-content">
                    <span class="rest-title">💤 Descanso — Sistema en reconstrucción</span>
                    <p>${q}</p>
                    <span class="rest-section-title">⚡ Optimización silenciosa</span>
                    <p>Hidratación al máximo. Sueño profundo. Estiramientos ligeros.</p>
                </div>`;
        }
        daysList.appendChild(card);
    });
    initIcons();
}

// ── CHECK-IN ───────────────────────────
function checkIn(dateKey, btn){
    const checkins = JSON.parse(localStorage.getItem('statux_checkins')||'{}');
    checkins[dateKey] = true;
    localStorage.setItem('statux_checkins', JSON.stringify(checkins));
    btn.className='checkin-btn done';
    btn.innerHTML='✓ Completado';
    renderWeekDays();
    renderTodayCard();
}

// ── TIMER ───────────────────────────────
let timerMode = 'countdown'; // countdown | countup | rest
let timerRunning = false;
let timerInterval = null;
let timerElapsed = 0;
let timerTarget = 30;
const CIRCUMFERENCE = 2 * Math.PI * 95; // r=95

function setTimerMode(mode){
    timerMode = mode;
    resetTimer();
    document.querySelectorAll('.timer-tab').forEach(t=>t.classList.remove('active'));
    document.getElementById('tab'+mode.charAt(0).toUpperCase()+mode.slice(1))?.classList.add('active');
    const targetWrap = document.getElementById('timerTargetWrap');
    const presets = document.getElementById('timerPresets');
    const label = document.getElementById('timerModeLabel');
    const targetLabel = document.getElementById('timerTargetLabel');

    if(mode==='countup'){
        targetWrap.style.display='none';
        presets.style.display='none';
        label.textContent='LIBRE';
    } else {
        targetWrap.style.display='flex';
        presets.style.display='flex';
        label.textContent = mode==='rest'?'DESCANSO':'OBJETIVO';
        targetLabel.textContent = mode==='rest'?'Tiempo de descanso':'Tiempo objetivo';
    }
    updateTimerDisplay();
}

function setPreset(sec){
    document.getElementById('timerTargetInput').value = sec;
    timerTarget = sec;
    resetTimer();
}

function toggleTimer(){
    if(timerRunning){ pauseTimer(); } else { startTimer(); }
}

function startTimer(){
    timerRunning = true;
    const btn = document.getElementById('timerStartBtn');
    btn.textContent='PAUSAR'; btn.classList.add('running');
    timerTarget = parseInt(document.getElementById('timerTargetInput')?.value||30);

    timerInterval = setInterval(()=>{
        timerElapsed++;
        updateTimerDisplay();

        if(timerMode!=='countup' && timerElapsed >= timerTarget){
            timerFinished();
        }
    }, 1000);
}

function pauseTimer(){
    timerRunning=false;
    clearInterval(timerInterval);
    const btn=document.getElementById('timerStartBtn');
    btn.textContent='REANUDAR'; btn.classList.remove('running');
}

function resetTimer(){
    timerRunning=false;
    clearInterval(timerInterval);
    timerElapsed=0;
    const btn=document.getElementById('timerStartBtn');
    btn.textContent='INICIAR'; btn.classList.remove('running');
    updateTimerDisplay();
}

function timerFinished(){
    pauseTimer();
    // Visual feedback
    const ring=document.getElementById('timerRingContainer');
    ring.classList.add('finished');
    setTimeout(()=>ring.classList.remove('finished'),1500);
    // Vibration
    if(navigator.vibrate) navigator.vibrate([200,100,200,100,400]);
    // Reset after brief pause
    setTimeout(()=>{ timerElapsed=0; updateTimerDisplay(); },1500);
}

function updateTimerDisplay(){
    const display=document.getElementById('timerDisplay');
    const ring=document.getElementById('timerRingProgress');
    if(!display||!ring) return;

    timerTarget = parseInt(document.getElementById('timerTargetInput')?.value||30);

    let showTime, progress;
    if(timerMode==='countup'){
        showTime=timerElapsed;
        progress=1; // full ring, always
        ring.style.stroke='var(--green)';
    } else {
        const remaining=Math.max(0, timerTarget-timerElapsed);
        showTime=remaining;
        progress = timerTarget>0 ? remaining/timerTarget : 1;

        // Color: green→yellow→red
        if(progress>0.5){ ring.style.stroke='var(--green)'; }
        else if(progress>0.25){ ring.style.stroke='#ffa500'; }
        else { ring.style.stroke='var(--red)'; }
    }

    const mins=Math.floor(showTime/60);
    const secs=showTime%60;
    display.textContent=`${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;

    // Ring circumference = 2*PI*95 ≈ 597
    const offset = CIRCUMFERENCE * (1-progress);
    ring.style.strokeDasharray=CIRCUMFERENCE;
    ring.style.strokeDashoffset=offset;
}

// ── MANUAL ROUTINE EDITOR ──────────────
const TEMPLATES = {
    ppl: {
        name:'Push Pull Legs',
        days:[
            {name:'Lunes',    exercises:[{n:'Flexiones',s:'4x12'},{n:'Dips',s:'3x10'},{n:'Pike push-ups',s:'3x10'}]},
            {name:'Martes',   exercises:[{n:'Dominadas prona',s:'4x8'},{n:'Remo australiano',s:'3x12'},{n:'Dominadas supina',s:'3x8'}]},
            {name:'Miércoles',exercises:[{n:'Sentadilla',s:'4x12'},{n:'Estocadas',s:'3x10'},{n:'Elevaciones de talón',s:'3x20'}]},
            {name:'Jueves',   exercises:[{n:'Flexiones diamante',s:'4x12'},{n:'Dips paralelas',s:'3x10'},{n:'Pseudo planche',s:'3x8'}]},
            {name:'Viernes',  exercises:[{n:'Muscle-up',s:'3x5'},{n:'Remo en anillos',s:'4x10'},{n:'Face pulls',s:'3x15'}]},
            {name:'Sábado',   exercises:[{n:'Pistol squat',s:'3x6'},{n:'Sentadilla búlgara',s:'3x10'},{n:'Nordic curl',s:'3x5'}]},
            {name:'Domingo',  exercises:[]},
        ]
    },
    fullbody: {
        name:'Full Body 3x',
        days:[
            {name:'Lunes',    exercises:[{n:'Dominadas',s:'4x8'},{n:'Flexiones',s:'4x12'},{n:'Sentadilla',s:'4x15'},{n:'Plancha',s:'3x45s'}]},
            {name:'Martes',   exercises:[]},
            {name:'Miércoles',exercises:[{n:'Remo australiano',s:'4x10'},{n:'Dips',s:'4x10'},{n:'Estocadas',s:'3x12'},{n:'Hollow hold',s:'3x30s'}]},
            {name:'Jueves',   exercises:[]},
            {name:'Viernes',  exercises:[{n:'Dominadas supina',s:'3x10'},{n:'Flexiones archer',s:'3x8'},{n:'Pistol squat',s:'3x6'},{n:'L-sit',s:'3x20s'}]},
            {name:'Sábado',   exercises:[]},
            {name:'Domingo',  exercises:[]},
        ]
    },
    upper_lower: {
        name:'Upper Lower',
        days:[
            {name:'Lunes',    exercises:[{n:'Dominadas',s:'4x8'},{n:'Flexiones',s:'4x12'},{n:'Dips',s:'3x10'}]},
            {name:'Martes',   exercises:[{n:'Sentadilla',s:'4x15'},{n:'Estocadas',s:'3x12'},{n:'Nordic curl',s:'3x6'}]},
            {name:'Miércoles',exercises:[]},
            {name:'Jueves',   exercises:[{n:'Remo australiano',s:'4x10'},{n:'Pike push-ups',s:'4x12'},{n:'Face pulls',s:'3x15'}]},
            {name:'Viernes',  exercises:[{n:'Pistol squat',s:'3x6'},{n:'Sentadilla búlgara',s:'3x10'},{n:'Elevación talón',s:'3x20'}]},
            {name:'Sábado',   exercises:[]},
            {name:'Domingo',  exercises:[]},
        ]
    },
    blank: {
        name:'Mi Rutina',
        days: DAY_NAMES.map(n=>({name:n,exercises:[]}))
    }
};

let manualDays = [];

function initManualEditor(){
    if(!manualDays.length) loadTemplate('blank');
}

function loadTemplate(key){
    const tpl = TEMPLATES[key];
    manualDays = tpl.days.map(d=>({
        name:d.name,
        exercises: d.exercises.map(e=>({name:e.n||e.name||'',sets:e.s||e.sets||'3x10'}))
    }));
    document.getElementById('manualRoutineName').value = tpl.name;
    renderManualEditor();
}

function renderManualEditor(){
    const container = document.getElementById('manualDaysList');
    if(!container) return;
    container.innerHTML = manualDays.map((day,di)=>`
        <div class="manual-day">
            <div class="manual-day-header">
                <span class="manual-day-name">${day.name}</span>
                <span style="font-size:0.6rem;color:#444;letter-spacing:1px;text-transform:uppercase">${day.exercises.length} ejercicios</span>
            </div>
            <div class="manual-exercises" id="manualEx_${di}">
                ${day.exercises.map((ex,ei)=>`
                    <div class="manual-ex-item">
                        <input class="manual-ex-name" value="${ex.name}" placeholder="Nombre del ejercicio" oninput="updateManualEx(${di},${ei},'name',this.value)">
                        <input class="manual-ex-sets" value="${ex.sets}" placeholder="3x10" oninput="updateManualEx(${di},${ei},'sets',this.value)">
                        <button class="manual-ex-del" onclick="deleteManualEx(${di},${ei})"><i data-lucide="x" style="width:14px;height:14px"></i></button>
                    </div>
                `).join('')}
            </div>
            <button class="add-ex-btn" onclick="addManualEx(${di})">+ Agregar ejercicio</button>
        </div>
    `).join('');
    initIcons();
}

function updateManualEx(di,ei,field,val){
    manualDays[di].exercises[ei][field]=val;
}

function addManualEx(di){
    manualDays[di].exercises.push({name:'',sets:'3x10'});
    renderManualEditor();
    // Focus the new input
    setTimeout(()=>{
        const exContainer = document.getElementById('manualEx_'+di);
        if(exContainer){
            const inputs = exContainer.querySelectorAll('.manual-ex-name');
            if(inputs.length) inputs[inputs.length-1].focus();
        }
    },50);
}

function deleteManualEx(di,ei){
    manualDays[di].exercises.splice(ei,1);
    renderManualEditor();
}

function saveManualRoutine(){
    const name = document.getElementById('manualRoutineName').value.trim() || 'Mi Rutina';
    // Convert to standard routine format
    const routine = manualDays
        .filter(d=>d.exercises.length>0)
        .map(d=>({
            day: d.name,
            focus: 'Manual',
            exercises: d.exercises.map(ex=>({
                name: ex.name || 'Ejercicio',
                muscles: [],
                sets: { beginner:ex.sets, intermediate:ex.sets, advanced:ex.sets },
                rest: 60,
                diff:'intermediate'
            })),
            warmup:[],
            cooldown:[]
        }));
    localStorage.setItem('statux_saved_routine', JSON.stringify(routine));
    localStorage.setItem('statux_routine_name', name);
    localStorage.setItem('statux_routine_saved_at', Date.now());
    alert(`"${name}" guardada.`);
    navigate('saved-routine');
}

// ── GENERATOR ─────────────────────────
const questions=[
  {id:"goal",label:"01 · Objetivo",text:"¿Cuál es tu meta principal?",type:"single",options:[
    {val:"strength",label:"Fuerza máxima",desc:"Máxima tensión muscular"},
    {val:"hypertrophy",label:"Hipertrofia",desc:"Ganar masa muscular"},
    {val:"endurance",label:"Resistencia",desc:"Aguantar más tiempo"},
    {val:"weight_loss",label:"Pérdida de grasa",desc:"Quemar calorías"},
    {val:"skills",label:"Habilidades",desc:"Planche, muscle-up, etc."},
    {val:"general",label:"Fitness general",desc:"Equilibrio completo"},
  ]},
  {id:"level",label:"02 · Nivel",text:"¿Cuál es tu nivel actual?",type:"single",options:[
    {val:"beginner",label:"Principiante",desc:"Menos de 6 meses"},
    {val:"intermediate",label:"Intermedio",desc:"6 meses – 2 años"},
    {val:"advanced",label:"Avanzado",desc:"Más de 2 años"},
  ]},
  {id:"days",label:"03 · Días",text:"¿Cuántos días por semana?",type:"slider",min:2,max:6,default:4,unit:" días/sem"},
  {id:"duration",label:"04 · Duración",text:"¿Cuánto tiempo tienes por sesión?",type:"single",options:[
    {val:"30",label:"30 min",desc:"Express"},
    {val:"45",label:"45 min",desc:"Media"},
    {val:"60",label:"60 min",desc:"Completa"},
    {val:"90",label:"90 min",desc:"Larga"},
  ]},
  {id:"equipment",label:"05 · Equipo",text:"¿Qué equipo tienes?",type:"multi",options:[
    {val:"pullup",label:"Barra dominadas"},
    {val:"dip",label:"Paralelas"},
    {val:"rings",label:"Anillos"},
    {val:"floor",label:"Solo suelo"},
    {val:"bands",label:"Bandas"},
    {val:"weights",label:"Peso extra"},
  ]},
  {id:"focus",label:"06 · Enfoque",text:"¿Qué grupos priorizar?",type:"multi",options:[
    {val:"chest",label:"Pecho"},
    {val:"back",label:"Espalda"},
    {val:"shoulders",label:"Hombros"},
    {val:"arms",label:"Brazos"},
    {val:"core",label:"Core"},
    {val:"legs",label:"Piernas"},
  ]},
  {id:"weakpoint",label:"07 · Punto débil",text:"¿Qué zona mejorar especialmente?",type:"single",options:[
    {val:"upper",label:"Tren superior",desc:"Pecho, espalda, hombros"},
    {val:"lower",label:"Tren inferior",desc:"Piernas, glúteos"},
    {val:"pull",label:"Tirón",desc:"Dominadas, remos"},
    {val:"push",label:"Empuje",desc:"Flexiones, dips"},
    {val:"core",label:"Core",desc:"Abdomen, lumbar"},
    {val:"none",label:"Sin preferencia",desc:"Equilibrio total"},
  ]},
  {id:"intensity",label:"08 · Intensidad",text:"¿Tu tolerancia al esfuerzo?",type:"single",options:[
    {val:"low",label:"Suave",desc:"Prefiero recuperarme bien"},
    {val:"medium",label:"Moderada",desc:"Sudo pero no muero"},
    {val:"high",label:"Alta",desc:"Me gusta el dolor"},
    {val:"brutal",label:"Extrema 💀",desc:"Modo Statux"},
  ]},
  {id:"schedule",label:"09 · Horario",text:"¿Cuándo prefieres entrenar?",type:"single",options:[
    {val:"morning",label:"Mañana",desc:"Antes del día"},
    {val:"afternoon",label:"Tarde",desc:"Después del trabajo"},
    {val:"evening",label:"Noche",desc:"Al final del día"},
    {val:"flexible",label:"Flexible",desc:"Sin horario fijo"},
  ]},
  {id:"rest",label:"10 · Descanso",text:"¿Tiempo de descanso entre series?",type:"slider",min:30,max:300,default:90,unit:" seg",step:15},
];

const answers={};
let currentQ=0;

function buildStepIndicator(){
    const el=document.getElementById("stepIndicator");
    if(!el) return;
    el.innerHTML="";
    questions.forEach((q,i)=>{
        if(i>0){const l=document.createElement("div");l.className="step-line";el.appendChild(l);}
        const d=document.createElement("div");
        d.className="step-dot"+(i===currentQ?" active":answers[q.id]!==undefined?" done":"");
        d.textContent=(i+1);
        el.appendChild(d);
    });
}

function buildQuestion(){
    const q=questions[currentQ];
    const area=document.getElementById("questionArea");
    if(!area) return;
    area.innerHTML="";
    const card=document.createElement("div");
    card.className="question-card";
    card.innerHTML=`<div class="question-label">${q.label}</div><div class="question-text">${q.text}</div>`;

    if(q.type==="single"||q.type==="multi"){
        const grid=document.createElement("div");
        grid.className="options-grid"+(q.options.length<=3?" cols-1":"");
        q.options.forEach(opt=>{
            const btn=document.createElement("button");
            btn.className="option-btn";
            btn.innerHTML=`<div style="font-size:0.8rem;color:#ddd;font-weight:600">${opt.label}</div>${opt.desc?`<div style="font-size:0.68rem;color:#555;margin-top:2px">${opt.desc}</div>`:""}`;
            const sel=answers[q.id];
            if(q.type==="single"&&sel===opt.val) btn.classList.add("selected");
            if(q.type==="multi"&&Array.isArray(sel)&&sel.includes(opt.val)) btn.classList.add("selected");
            btn.onclick=()=>{
                if(q.type==="single"){
                    answers[q.id]=opt.val;
                    grid.querySelectorAll(".option-btn").forEach(b=>b.classList.remove("selected"));
                    btn.classList.add("selected");
                    setTimeout(()=>nextQ(),320);
                } else {
                    if(!answers[q.id]) answers[q.id]=[];
                    const idx=answers[q.id].indexOf(opt.val);
                    if(idx===-1){answers[q.id].push(opt.val);btn.classList.add("selected","selected-green");}
                    else{answers[q.id].splice(idx,1);btn.classList.remove("selected","selected-green");}
                }
                updateProgress();
            };
            grid.appendChild(btn);
        });
        card.appendChild(grid);
        if(q.type==="multi"){
            const nb=document.createElement("button");
            nb.className="option-btn";nb.style.marginTop="8px";nb.style.gridColumn="1/-1";
            nb.innerHTML=`<div style="text-align:center;color:#666;font-size:0.78rem">Continuar →</div>`;
            nb.onclick=()=>nextQ();
            card.appendChild(nb);
        }
    } else if(q.type==="slider"){
        const val=answers[q.id]||q.default;
        const pct=((val-q.min)/(q.max-q.min)*100).toFixed(0);
        const sl=document.createElement("div");
        sl.className="slider-container";
        sl.innerHTML=`<div class="slider-row">
            <input type="range" min="${q.min}" max="${q.max}" step="${q.step||1}" value="${val}" id="sl_${q.id}" style="--val:${pct}%">
            <div class="slider-val" id="slv_${q.id}">${val}${q.unit}</div>
        </div>`;
        card.appendChild(sl);
        setTimeout(()=>{
            const inp=document.getElementById("sl_"+q.id);
            const out=document.getElementById("slv_"+q.id);
            if(inp){
                inp.addEventListener("input",()=>{
                    const v=parseInt(inp.value);
                    answers[q.id]=v;
                    out.textContent=v+q.unit;
                    const p=((v-q.min)/(q.max-q.min)*100).toFixed(0);
                    inp.style.setProperty("--val",p+"%");
                    updateProgress();
                });
            }
        },50);
        answers[q.id]=val;
        const nb=document.createElement("button");
        nb.className="option-btn";nb.style.marginTop="12px";
        nb.innerHTML=`<div style="text-align:center;color:#666;font-size:0.78rem">Continuar →</div>`;
        nb.onclick=()=>nextQ();
        card.appendChild(nb);
        updateProgress();
    }
    area.appendChild(card);
    buildStepIndicator();
    updateProgress();
}

function nextQ(){
    if(currentQ<questions.length-1){currentQ++;buildQuestion();}
    else{checkComplete();}
}
function updateProgress(){
    const filled=Object.keys(answers).filter(k=>answers[k]!==undefined&&(!Array.isArray(answers[k])||answers[k].length>0)).length;
    const pct=(filled/questions.length*100).toFixed(0);
    const fill=document.getElementById("progressFill");
    if(fill) fill.style.width=pct+"%";
    const gBtn=document.getElementById("generateBtn");
    if(gBtn) gBtn.disabled=filled<questions.length*0.7;
}
function checkComplete(){
    const filled=Object.keys(answers).length;
    const gBtn=document.getElementById("generateBtn");
    if(filled>=7&&gBtn) gBtn.disabled=false;
}

// ── EXERCISE DB ────────────────────────
const EXERCISE_DB={
    push:[
        {name:"Flexiones",muscles:["pecho","tríceps","deltoides"],sets:{beginner:"3x8",intermediate:"4x12",advanced:"5x20"},rest:60,diff:"beginner"},
        {name:"Dips en paralelas",muscles:["pecho","tríceps","core"],sets:{beginner:"3x6",intermediate:"4x10",advanced:"5x15"},rest:90,diff:"intermediate"},
        {name:"Flexiones pies elevados",muscles:["pecho alto","deltoides","tríceps"],sets:{beginner:"3x6",intermediate:"4x10",advanced:"5x15"},rest:60,diff:"intermediate"},
        {name:"Flexiones diamante",muscles:["tríceps","pecho interior"],sets:{beginner:"3x6",intermediate:"3x12",advanced:"4x20"},rest:60,diff:"intermediate"},
        {name:"Flexiones arqueras",muscles:["pecho","bíceps","core"],sets:{beginner:"3x4",intermediate:"3x8",advanced:"4x12"},rest:90,diff:"advanced"},
        {name:"Pike push-ups",muscles:["hombros","tríceps"],sets:{beginner:"3x8",intermediate:"4x12",advanced:"5x20"},rest:60,diff:"beginner"},
        {name:"Pseudo planche push-ups",muscles:["pecho","deltoides","core"],sets:{beginner:"3x5",intermediate:"3x10",advanced:"4x15"},rest:90,diff:"advanced"},
        {name:"Flexiones palmas elevadas",muscles:["pecho bajo","serratos"],sets:{beginner:"3x10",intermediate:"4x15",advanced:"5x20"},rest:45,diff:"beginner"},
    ],
    pull:[
        {name:"Dominadas prona",muscles:["dorsal","bíceps","trapecio"],sets:{beginner:"3x3",intermediate:"4x8",advanced:"5x15"},rest:90,diff:"intermediate"},
        {name:"Dominadas supina",muscles:["bíceps","dorsal","braquial"],sets:{beginner:"3x5",intermediate:"4x10",advanced:"5x18"},rest:90,diff:"beginner"},
        {name:"Remo australiano",muscles:["dorsal","bíceps","core"],sets:{beginner:"3x8",intermediate:"4x12",advanced:"5x20"},rest:60,diff:"beginner"},
        {name:"Muscle-up",muscles:["dorsal","pecho","tríceps"],sets:{beginner:"2x2",intermediate:"3x5",advanced:"4x10"},rest:120,diff:"advanced"},
        {name:"Dominadas L-sit",muscles:["dorsal","core","flexores"],sets:{beginner:"2x3",intermediate:"3x6",advanced:"4x10"},rest:90,diff:"advanced"},
        {name:"Face pulls anillos",muscles:["deltoides post.","trapecio"],sets:{beginner:"3x10",intermediate:"4x15",advanced:"4x20"},rest:60,diff:"beginner"},
    ],
    core:[
        {name:"Hollow body hold",muscles:["core","flexores cadera"],sets:{beginner:"3x20s",intermediate:"4x40s",advanced:"5x60s"},rest:60,diff:"beginner"},
        {name:"Plancha",muscles:["core","hombros","glúteos"],sets:{beginner:"3x30s",intermediate:"4x60s",advanced:"5x90s"},rest:45,diff:"beginner"},
        {name:"L-sit en paralelas",muscles:["core","flexores","tríceps"],sets:{beginner:"3x10s",intermediate:"4x20s",advanced:"5x30s"},rest:60,diff:"intermediate"},
        {name:"Dragon flag",muscles:["core completo","dorsales"],sets:{beginner:"2x3",intermediate:"3x6",advanced:"4x10"},rest:90,diff:"advanced"},
        {name:"Elevaciones piernas",muscles:["core","flexores cadera"],sets:{beginner:"3x6",intermediate:"4x12",advanced:"5x20"},rest:60,diff:"intermediate"},
        {name:"Windshield wipers",muscles:["oblicuos","core"],sets:{beginner:"2x5",intermediate:"3x10",advanced:"4x15"},rest:60,diff:"advanced"},
        {name:"Planchas laterales",muscles:["oblicuos","core"],sets:{beginner:"3x20s",intermediate:"3x40s",advanced:"4x60s"},rest:45,diff:"beginner"},
    ],
    legs:[
        {name:"Sentadilla búlgara",muscles:["cuádriceps","glúteos","isquios"],sets:{beginner:"3x8",intermediate:"4x12",advanced:"5x20"},rest:90,diff:"intermediate"},
        {name:"Pistol squat",muscles:["cuádriceps","glúteos","equilibrio"],sets:{beginner:"2x3",intermediate:"3x6",advanced:"4x10"},rest:90,diff:"advanced"},
        {name:"Sentadilla con salto",muscles:["cuádriceps","glúteos","pantorrillas"],sets:{beginner:"3x8",intermediate:"4x12",advanced:"5x20"},rest:60,diff:"beginner"},
        {name:"Nordic curl",muscles:["isquios","glúteos"],sets:{beginner:"2x3",intermediate:"3x6",advanced:"4x10"},rest:90,diff:"advanced"},
        {name:"Estocadas",muscles:["cuádriceps","glúteos"],sets:{beginner:"3x8",intermediate:"4x12",advanced:"5x20"},rest:60,diff:"beginner"},
        {name:"Elevaciones de talón",muscles:["pantorrillas","tibial"],sets:{beginner:"3x15",intermediate:"4x25",advanced:"5x40"},rest:45,diff:"beginner"},
        {name:"Wall sit",muscles:["cuádriceps","isquios"],sets:{beginner:"3x30s",intermediate:"4x60s",advanced:"5x90s"},rest:60,diff:"beginner"},
    ],
    shoulder:[
        {name:"Pino asistido",muscles:["hombros","tríceps","core"],sets:{beginner:"3x10s",intermediate:"4x30s",advanced:"5x60s"},rest:90,diff:"advanced"},
        {name:"Press en pino",muscles:["hombros","tríceps"],sets:{beginner:"2x2",intermediate:"3x5",advanced:"4x10"},rest:120,diff:"advanced"},
        {name:"Elevaciones lat. anillos",muscles:["deltoides lateral","trapecio"],sets:{beginner:"3x10",intermediate:"4x15",advanced:"4x20"},rest:60,diff:"intermediate"},
    ]
};

const WARMUP_DB = [
    {name:"Rotación de hombros",sets:"2x10 cada lado"},
    {name:"Hip circles",sets:"2x10 cada lado"},
    {name:"Inchworm",sets:"2x5"},
    {name:"Cat-cow",sets:"2x10"},
    {name:"Jumping jacks",sets:"2x20"},
    {name:"Arm circles",sets:"2x15"},
];
const COOLDOWN_DB = [
    {name:"Estiramiento de pecho",sets:"2x30s"},
    {name:"Estiramiento isquios",sets:"2x30s cada pierna"},
    {name:"Child's pose",sets:"2x45s"},
    {name:"Pigeon pose",sets:"2x30s cada lado"},
    {name:"Estiramiento dorsal",sets:"2x30s"},
];

// Non-consecutive day assignment
// Map: days count → list of weekday indices (0=Mon)
const DAY_SCHEDULES = {
    2: [0,3],           // Mon, Thu
    3: [0,2,4],         // Mon, Wed, Fri
    4: [0,1,3,4],       // Mon, Tue, Thu, Fri
    5: [0,1,2,4,5],     // Mon, Tue, Wed, Fri, Sat
    6: [0,1,2,3,4,5],   // Mon–Sat
};

function generateRoutine(){
    const days=answers.days||4;
    const level=answers.level||"intermediate";
    const goal=answers.goal||"general";
    const focus=answers.focus||[];
    const wp=answers.weakpoint||"none";
    const intensity=answers.intensity||"medium";
    const restPref=answers.rest||90;
    const duration=parseInt(answers.duration||60);
    const equipment=answers.equipment||["floor"];

    document.getElementById("welcomeState").style.display="none";
    document.getElementById("loadingState").classList.add("visible");
    document.getElementById("resultSection").classList.remove("visible");

    setTimeout(()=>{
        const routine=buildRoutine(days,level,goal,focus,wp,intensity,restPref,duration,equipment);
        currentGeneratedRoutine=routine;
        localStorage.setItem('statux_level',level);
        renderRoutine(routine,level,days,restPref);
        document.getElementById("loadingState").classList.remove("visible");
        document.getElementById("resultSection").classList.add("visible");
    },1400);
}

function buildRoutine(days,level,goal,focus,wp,intensity,restPref,duration,equip){
    // Smart splits — respects push/pull/legs separation
    const splitsMap={
        2:[["push","core"],["pull","legs"]],
        3:[["push","core"],["pull"],["legs","core"]],
        4:[["push"],["pull"],["legs","core"],["push","core"]],  // day4 is upper again with rest Thu
        5:[["push"],["pull"],["legs"],["push","core"],["pull","legs"]],
        6:[["push"],["pull"],["legs"],["push","core"],["pull"],["legs","core"]],
    };
    const plan=splitsMap[days]||splitsMap[4];

    // Use non-consecutive schedule
    const schedule=DAY_SCHEDULES[days]||DAY_SCHEDULES[4];
    const exPerDay=Math.max(3,Math.min(7,Math.floor(duration/13)));
    const levelOrder={beginner:0,intermediate:1,advanced:2};
    const uLevel=levelOrder[level]||1;

    // Intensity modifier for sets
    const setsMod={low:-1,medium:0,high:1,brutal:2}[intensity]||0;

    return plan.map((cats,i)=>{
        let pool=[];
        cats.forEach(cat=>{
            if(cat==="push") pool=[...pool,...EXERCISE_DB.push,...EXERCISE_DB.shoulder];
            if(cat==="pull") pool=[...pool,...EXERCISE_DB.pull];
            if(cat==="legs") pool=[...pool,...EXERCISE_DB.legs];
            if(cat==="core") pool=[...pool,...EXERCISE_DB.core];
        });
        // Remove duplicates
        pool=[...new Map(pool.map(e=>[e.name,e])).values()];
        // Filter by level
        pool=pool.filter(e=>(levelOrder[e.diff]||0)<=uLevel+1);
        // Prioritize focus areas
        pool.sort((a,b)=>{
            const aFocus=focus.some(f=>a.muscles.some(m=>m.includes(f)))?0:1;
            const bFocus=focus.some(f=>b.muscles.some(m=>m.includes(f)))?0:1;
            return aFocus-bFocus;
        });
        // Shuffle within priority groups
        const shuffled=[...pool.slice(0,Math.min(exPerDay,pool.length))].sort(()=>Math.random()-0.5);

        const dayIdx=schedule[i];
        const dayName=DAY_NAMES[dayIdx]||`Día ${i+1}`;
        const focusLabel=cats.map(c=>({push:"Empuje",pull:"Tirón",legs:"Piernas",core:"Core"}[c]||c)).join(" + ");

        // Warmup: 2 random
        const warmup=WARMUP_DB.sort(()=>Math.random()-0.5).slice(0,2);
        // Cooldown: 2 random
        const cooldown=COOLDOWN_DB.sort(()=>Math.random()-0.5).slice(0,2);

        return {
            day:dayName,
            focus:focusLabel,
            exercises:shuffled,
            warmup,
            cooldown,
            restPref
        };
    });
}

function renderRoutine(routine,level,days,restPref){
    const diffLabel={beginner:"Principiante",intermediate:"Intermedio",advanced:"Avanzado"};
    const routineName=document.getElementById('routineNameInput').value.trim()||'Tu Rutina';
    document.getElementById("levelBadge").textContent=diffLabel[level]||"INTERMEDIO";
    document.getElementById("routineTitle").textContent=routineName;

    const sg=document.getElementById("summaryGrid");
    sg.innerHTML=`
        <div class="summary-card"><div class="s-label">Días / semana</div><div class="s-val red">${days}</div></div>
        <div class="summary-card"><div class="s-label">Nivel</div><div class="s-val">${diffLabel[level]||"—"}</div></div>
        <div class="summary-card"><div class="s-label">Descanso</div><div class="s-val green">${restPref}s</div></div>
        <div class="summary-card"><div class="s-label">Ejercicios total</div><div class="s-val">${routine.reduce((a,d)=>a+d.exercises.length,0)}</div></div>`;

    const rc=document.getElementById("routineContent");
    rc.innerHTML="";

    routine.forEach((day,di)=>{
        const dc=document.createElement("div");
        dc.className="day-card";
        // Warmup rows
        let warmupHtml=day.warmup.map(w=>`<div class="warmup-row"><span class="warmup-tag warm">Calent.</span><span class="warmup-name">${w.name}</span><span class="warmup-sets">${w.sets}</span></div>`).join('');
        // Exercises
        let exHtml=day.exercises.map(ex=>{
            const sets=ex.sets[level]||ex.sets["intermediate"];
            const diffClass={beginner:"diff-beginner",intermediate:"diff-intermediate",advanced:"diff-advanced"}[ex.diff];
            const muscleTags=(ex.muscles||[]).map(m=>`<span class="muscle-tag">${m}</span>`).join("");
            return `<div class="gen-exercise-row">
                <div>
                    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px">
                        <div class="exercise-name">${ex.name}</div>
                        <span class="diff-badge ${diffClass}">${ex.diff}</span>
                    </div>
                    <div class="exercise-muscles">${muscleTags}</div>
                    <div class="exercise-meta">Descanso: ${ex.rest}s</div>
                </div>
                <div class="sets-badge">${sets}</div>
            </div>`;
        }).join('');
        // Cooldown
        let cooldownHtml=day.cooldown.map(c=>`<div class="warmup-row"><span class="warmup-tag cool">Enfr.</span><span class="warmup-name">${c.name}</span><span class="warmup-sets">${c.sets}</span></div>`).join('');

        dc.innerHTML=`
            <div class="day-header">
                <div class="day-num">${di+1}</div>
                <div><div class="day-title">${day.day}</div></div>
                <div class="day-focus">${day.focus}</div>
            </div>
            ${warmupHtml}
            ${exHtml}
            ${cooldownHtml}`;
        rc.appendChild(dc);
    });
}

function resetToForm(){
    document.getElementById("resultSection").classList.remove("visible");
    document.getElementById("welcomeState").style.display="flex";
}

// ── ANATOMY ───────────────────────────
let anatomyData={};
let selectedAnatomyMuscle=null;

async function initAnatomy(){
    if(Object.keys(anatomyData).length===0){
        try{
            const r=await fetch('muscle.json');
            anatomyData=await r.json();
        } catch(e){ console.error('muscle.json not found',e); }
    }
    initAnatomyEvents();
}

function initAnatomyEvents(){
    const groups=document.querySelectorAll('.muscle-grp');
    const hoverInput=document.getElementById('stxHoverInput');
    if(!hoverInput) return;
    groups.forEach(group=>{
        const key=group.dataset.muscle;
        group.onmouseenter=()=>{
            const data=anatomyData[key];
            if(data){hoverInput.value=data.name;hoverInput.classList.add('active');}
            document.querySelectorAll(`.muscle-grp[data-muscle="${key}"]`).forEach(g=>{if(!g.classList.contains('selected'))g.classList.add('hovered');});
        };
        group.onmouseleave=()=>{
            hoverInput.value="Selecciona un músculo...";hoverInput.classList.remove('active');
            document.querySelectorAll(`.muscle-grp[data-muscle="${key}"]`).forEach(g=>g.classList.remove('hovered'));
        };
        group.onclick=()=>selectMuscleAnatomy(key);
    });
}

function selectMuscleAnatomy(key){
    document.querySelectorAll('.muscle-grp.selected').forEach(g=>g.classList.remove('selected'));
    if(selectedAnatomyMuscle===key){selectedAnatomyMuscle=null;clearSelectionAnatomy();return;}
    selectedAnatomyMuscle=key;
    document.querySelectorAll(`.muscle-grp[data-muscle="${key}"]`).forEach(g=>g.classList.add('selected'));
    const data=anatomyData[key];
    const welcome=document.getElementById('stxWelcomeAnatomy');
    const detail=document.getElementById('stxDetailAnatomy');
    if(!data){if(welcome)welcome.style.display='flex';if(detail)detail.classList.remove('visible');return;}
    if(welcome)welcome.style.display='none';
    if(detail)detail.classList.add('visible');
    document.getElementById('detailTitleAnatomy').textContent=data.name;
    document.getElementById('detailSubAnatomy').textContent=data.sub;
    document.getElementById('detailPartsAnatomy').innerHTML=data.parts.map(p=>`<span class="stx-part-chip">${p}</span>`).join('');
    document.getElementById('detailExGridAnatomy').innerHTML=data.exercises.map(ex=>`
        <div class="stx-ex-card" onclick="openAnatomyVideo('${ex.video}')">
            <div class="stx-ex-thumb-placeholder"></div>
            <div class="stx-ex-name">${ex.name}</div>
        </div>`).join('');
    document.getElementById('detailBenefitsAnatomy').innerHTML=data.benefits;
    document.getElementById('detailInfoAnatomy').innerHTML=data.info;
    document.getElementById('stxRightAnatomy').scrollTop=0;
}

function clearSelectionAnatomy(){
    selectedAnatomyMuscle=null;
    document.querySelectorAll('.muscle-grp.selected').forEach(g=>g.classList.remove('selected'));
    const welcome=document.getElementById('stxWelcomeAnatomy');
    const detail=document.getElementById('stxDetailAnatomy');
    if(welcome)welcome.style.display='flex';
    if(detail)detail.classList.remove('visible');
}

function switchViewAnatomy(view){
    document.getElementById('viewFrontAnatomy').classList.toggle('visible',view==='front');
    document.getElementById('viewBackAnatomy').classList.toggle('visible',view==='back');
    document.getElementById('btnFront').classList.toggle('active',view==='front');
    document.getElementById('btnBack').classList.toggle('active',view==='back');
    clearSelectionAnatomy();
}

function openAnatomyVideo(url){
    const overlay=document.getElementById('stxOverlayAnatomy');
    const frame=document.getElementById('stxVideoFrameAnatomy');
    if(overlay&&frame){
        let embedUrl=url;
        if(url.includes('watch?v='))embedUrl=url.replace('watch?v=','embed/');
        else if(url.includes('youtu.be/'))embedUrl=url.replace('youtu.be/','youtube.com/embed/');
        frame.src=embedUrl;
        overlay.classList.add('open');
    }
}
function closeAnatomyVideo(){
    document.getElementById('stxOverlayAnatomy').classList.remove('open');
    document.getElementById('stxVideoFrameAnatomy').src="";
}

// ── NUTRITION (Pyodide) ────────────────
let pyodide=null,pyReady=false,pyPromise=null;
async function loadPyodide_(){ pyodide=await loadPyodide(); pyReady=true; }
pyPromise=loadPyodide_();

async function calcularProteina(){
    const btn=document.getElementById('calcBtn');
    const loading=document.getElementById('nutriLoading');
    const results=document.getElementById('nutriResults');
    const msg=document.getElementById('nutriLoadingMsg');
    btn.disabled=true; loading.classList.add('visible'); results.classList.remove('visible');
    if(!pyReady){msg.textContent='Iniciando Python...'; await pyPromise;}
    msg.textContent='Calculando...';
    const peso=parseFloat(document.getElementById('peso').value)||75;
    const objetivo=document.querySelector('input[name=objetivo]:checked').value;
    const comidas=parseInt(document.querySelector('input[name=comidas]:checked').value);
    const code=`
import json
peso=${peso};objetivo="${objetivo}";comidas=${comidas}
rangos={"mantener":(1.4,1.8,2.2),"ganar":(1.6,2.0,2.4),"perder":(1.8,2.2,2.6)}
minimo,optimo,maximo=[round(r*peso) for r in rangos[objetivo]]
base=optimo//comidas;resto=optimo%comidas
nombres=["desayuno","almuerzo","merienda","cena","pre-cama"]
distribucion=[{"nombre":nombres[i] if i<len(nombres) else f"comida {i+1}","gramos":int(base+(1 if i<resto else 0))} for i in range(comidas)]
insights={"mantener":f"Con {peso}kg en mantenimiento, <strong>{optimo}g</strong> diarios preservan tu masa muscular.","ganar":f"Para ganar músculo a {peso}kg necesitas <strong>{optimo}g</strong> diarios. Prioriza post-entrenamiento.","perder":f"En déficit con {peso}kg, <strong>{optimo}g</strong> protegen tu músculo mientras pierdes grasa."}
json.dumps({"minimo":minimo,"optimo":optimo,"maximo":maximo,"distribucion":distribucion,"insight":insights[objetivo]})`;
    const resultJson=await pyodide.runPythonAsync(code);
    const data=JSON.parse(resultJson);
    document.getElementById('rMin').textContent=data.minimo;
    document.getElementById('rOpt').textContent=data.optimo;
    document.getElementById('rMax').textContent=data.maximo;
    document.getElementById('nutriInsight').innerHTML=data.insight;
    const mealsEl=document.getElementById('nutriMeals');
    mealsEl.innerHTML='';
    const maxG=Math.max(...data.distribucion.map(m=>m.gramos));
    data.distribucion.forEach(m=>{
        const pct=Math.round((m.gramos/maxG)*100);
        const row=document.createElement('div');
        row.className='nutri-meal';
        row.innerHTML=`<span class="nutri-meal-name">${m.nombre}</span><div class="nutri-meal-bar-wrap"><div class="nutri-meal-bar" style="width:${pct}%"></div></div><span class="nutri-meal-val">${m.gramos}g</span>`;
        mealsEl.appendChild(row);
    });
    loading.classList.remove('visible');
    results.classList.add('visible');
    btn.disabled=false;
}

// ── INIT ───────────────────────────────
function initCalisteniaRuntime(){
    initIcons();
    updateStreak();
    renderWeekDays();
    renderTodayCard();
    checkProgression();
    buildQuestion();

    // Show dashboard
    navigate('dashboard');

    setTimeout(()=>{
        const loader=document.getElementById('loadingScreen');
        if(loader) loader.classList.add('fade-out');
    },2000);
}

window.initCalisteniaRuntime = initCalisteniaRuntime;
// React/static mounts the markup first and calls this initializer explicitly.
