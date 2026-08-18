/* =========================================================
   THE DIGITAL CRIME SCENE
   CASE #001 — THE LAST LOGIN
   ========================================================= */


/* =========================
   GLOBAL STATE
   ========================= */

let cluesFound = new Set();

const totalClues = 6;


/* =========================
   BOOT SEQUENCE
   ========================= */

const bootMessages = [
  "Loading evidence index...",
  "Decrypting case metadata...",
  "Reconstructing digital timeline...",
  "Checking recovered files...",
  "Forensic terminal ready."
];

let bootStep = 0;

const bootText = document.getElementById("bootText");


function runBootSequence() {

  if (!bootText) return;

  const interval = setInterval(() => {

    if (bootStep < bootMessages.length) {

      bootText.textContent = bootMessages[bootStep];

      bootStep++;

    } else {

      clearInterval(interval);

      setTimeout(() => {

        const boot = document.getElementById("boot");

        if (boot) {
          boot.classList.add("hidden");
        }

      }, 600);

    }

  }, 650);

}


window.addEventListener("load", runBootSequence);



/* =========================
   SCREEN NAVIGATION
   ========================= */

function showScreen(screenId) {

  const screens = document.querySelectorAll(".screen");

  screens.forEach(screen => {
    screen.classList.remove("active");
  });


  const target = document.getElementById(screenId);

  if (!target) return;


  target.classList.add("active");


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  // Small cinematic entrance

  target.style.animation = "none";

  requestAnimationFrame(() => {
    target.style.animation = "";
  });

}


/* =========================
   TOAST NOTIFICATION
   ========================= */

function showToast(message) {

  const toast = document.getElementById("toast");

  if (!toast) return;


  toast.textContent = message;

  toast.classList.add("show");


  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);

}



/* =========================
   CLUE SYSTEM
   ========================= */

function discoverClue(id, message) {

  if (cluesFound.has(id)) {
    return;
  }


  cluesFound.add(id);


  updateProgress();


  showToast(
    "🔎 NEW CLUE DISCOVERED — " + message
  );


  // Small vibration on supported phones

  if (navigator.vibrate) {
    navigator.vibrate(80);
  }

}



/* =========================
   UPDATE PROGRESS
   ========================= */

function updateProgress() {

  const count = document.getElementById("clueCount");

  const bar = document.getElementById("progressBar");


  if (count) {
    count.textContent = cluesFound.size;
  }


  if (bar) {

    const percentage =
      (cluesFound.size / totalClues) * 100;

    bar.style.width = percentage + "%";

  }


  // Update status when all clues are found

  const status = document.getElementById("statusText");

  if (
    status &&
    cluesFound.size >= totalClues
  ) {

    status.textContent = "EVIDENCE COMPLETE";

  }

}



/* =========================================================
   EVIDENCE DATABASE
   ========================================================= */

const evidenceData = {


  /* =========================
     SCREENSHOTS
     ========================= */

  screenshot: {

    title: "RECOVERED SCREENSHOTS",

    html: `

      <div class="evidence-heading">

        <span class="evidence-number">
          EVIDENCE 01
        </span>

        <h2>Recovered Screenshots</h2>

        <p>
          Three screenshots were recovered from Nina's
          device. The timestamps don't match the system clock.
        </p>

      </div>


      <div class="evidence-gallery">


        <div class="forensic-image screenshot-image">

          <div class="fake-window">

            <div class="fake-window-top">
              PROJECT_ECHO
            </div>

            <div class="fake-terminal">

              <p>
                LOGIN SUCCESSFUL
              </p>

              <p>
                USER: N_THOMAS
              </p>

              <p class="highlight">
                TIME: 23:47
              </p>

              <p>
                DEVICE: UNKNOWN
              </p>

            </div>

          </div>

          <span>
            IMG_2047.PNG
          </span>

        </div>


        <div class="forensic-image screenshot-image">

          <div class="fake-window second">

            <div class="fake-window-top">
              ACCOUNT ACTIVITY
            </div>

            <div class="fake-terminal">

              <p>
                SESSION START
              </p>

              <p class="highlight">
                23:51
              </p>

              <p>
                LOCATION: UNKNOWN
              </p>

              <p>
                DEVICE ID: 04E
              </p>

            </div>

          </div>

          <span>
            IMG_2051.PNG
          </span>

        </div>


      </div>


      <div class="clue-box">

        <b>FORENSIC OBSERVATION</b>

        <p>
          The timestamps are exactly one hour ahead
          of the reconstructed system timeline.
        </p>

      </div>


      <button
        class="clue-button"
        onclick="
          discoverClue(
            'clock',
            'The timestamps are one hour ahead'
          )
        "
      >
        MARK AS IMPORTANT
      </button>

    `

  },



  /* =========================
     CHAT LOGS
     ========================= */

  chat: {

    title: "RECOVERED CHAT LOGS",

    html: `

      <div class="evidence-heading">

        <span class="evidence-number">
          EVIDENCE 02
        </span>

        <h2>Chat Logs</h2>

        <p>
          A conversation recovered from Nina's phone.
        </p>

      </div>


      <div class="phone">

        <div class="phone-top">
          NINA — PRIVATE CHAT
        </div>


        <div class="message received">
          Are you still investigating Echo?
        </div>


        <div class="message sent">
          Something is wrong with the old account.
        </div>


        <div class="message sent">
          Someone accessed it again.
        </div>


        <div class="message received">
          Nina, stop looking into it.
        </div>


        <div class="message sent warning">
          If I disappear from the chat,
          check the old account.
        </div>


        <div class="message-time">
          22:06
        </div>

      </div>


      <div class="clue-box">

        <b>IMPORTANT</b>

        <p>
          Nina knew the old account was being accessed
          and expected something to happen.
        </p>

      </div>


      <button
        class="clue-button"
        onclick="
          discoverClue(
            'chat',
            'Nina knew the old account was compromised'
          )
        "
      >
        MARK AS IMPORTANT
      </button>

    `

  },



  /* =========================
     RECOVERED FILES
     ========================= */

  files: {

    title: "RECOVERED FILES",

    html: `

      <div class="evidence-heading">

        <span class="evidence-number">
          EVIDENCE 03
        </span>

        <h2>Recovered Project Files</h2>

        <p>
          Deleted documents recovered from the archive.
        </p>

      </div>


      <div class="file-list">

        <div class="file-item">

          <span class="file-icon">
            TXT
          </span>

          <div>
            <b>PROJECT_ECHO_NOTES.txt</b>
            <small>Modified: 21:34</small>
          </div>

        </div>


        <div class="file-item">

          <span class="file-icon">
            LOG
          </span>

          <div>
            <b>ACCESS_HISTORY.log</b>
            <small>Modified: 22:47</small>
          </div>

        </div>


        <div class="file-item">

          <span class="file-icon">
            DAT
          </span>

          <div>
            <b>OLD_CREDENTIALS.dat</b>
            <small>Recovered from archive</small>
          </div>

        </div>


        <div class="file-item">

          <span class="file-icon">
            PDF
          </span>

          <div>
            <b>ECHO_TEAM.pdf</b>
            <small>Contains four names</small>
          </div>

        </div>

      </div>


      <div class="clue-box">

        <b>PROJECT ECHO</b>

        <p>
          The recovered documents connect Nina,
          Maya, Daniel and Alex to the same old project.
        </p>

      </div>


      <button
        class="clue-button"
        onclick="
          discoverClue(
            'echo',
            'Project Echo connects the four people'
          )
        "
      >
        MARK AS IMPORTANT
      </button>

    `

  },



  /* =========================
     BROWSER HISTORY
     ========================= */

  browser: {

    title: "BROWSER HISTORY",

    html: `

      <div class="evidence-heading">

        <span class="evidence-number">
          EVIDENCE 04
        </span>

        <h2>Browser History</h2>

        <p>
          The final browsing activity recovered
          from Nina's machine.
        </p>

      </div>


      <div class="browser-window">

        <div class="browser-top">

          <span>
            ◉
          </span>

          PROJECT-ECHO.LOCAL

        </div>


        <div class="history-row">
          <span>21:12</span>
          project-echo.local/archive
        </div>

        <div class="history-row">
          <span>21:39</span>
          old-account/login
        </div>

        <div class="history-row">
          <span>22:02</span>
          project-echo.local/credentials
        </div>

        <div class="history-row important">
          <span>22:47</span>
          old-account/access
        </div>

      </div>


      <div class="clue-box">

        <b>LAST VERIFIED ACTIVITY</b>

        <p>
          The suspicious account access appears at
          <strong>22:47</strong> in the reconstructed timeline.
        </p>

      </div>


      <button
        class="clue-button"
        onclick="
          discoverClue(
            'access',
            'Suspicious access occurred at 22:47'
          )
        "
      >
        MARK AS IMPORTANT
      </button>

    `

  },



  /* =========================
     TIMELINE
     ========================= */

  timeline: {

    title: "RECONSTRUCTED TIMELINE",

    html: `

      <div class="evidence-heading">

        <span class="evidence-number">
          EVIDENCE 05
        </span>

        <h2>Reconstructed Timeline</h2>

        <p>
          Correcting the one-hour timestamp offset
          changes the entire sequence.
        </p>

      </div>


      <div class="timeline">

        <div class="timeline-item">

          <span>
            21:47
          </span>

          <div>
            Nina continues investigating Project Echo.
          </div>

        </div>


        <div class="timeline-item">

          <span>
            22:14
          </span>

          <div>
            Nina's laptop is switched off.
          </div>

        </div>


        <div class="timeline-item danger">

          <span>
            22:47
          </span>

          <div>
            Suspicious access to the old account.
          </div>

        </div>


        <div class="timeline-item">

          <span>
            23:47*
          </span>

          <div>
            Original screenshot timestamp.
            <small>*one-hour offset</small>
          </div>

        </div>

      </div>


      <div class="clue-box">

        <b>TIME ANOMALY CONFIRMED</b>

        <p>
          The original evidence displays the event
          one hour later than it actually happened.
        </p>

      </div>


      <button
        class="clue-button"
        onclick="
          discoverClue(
            'timeline',
            'The suspicious event happened at 22:47'
          )
        "
      >
        MARK AS IMPORTANT
      </button>

    `

  },



  /* =========================
     PEOPLE
     ========================= */

  people: {

    title: "PERSONS OF INTEREST",

    html: `

      <div class="evidence-heading">

        <span class="evidence-number">
          EVIDENCE 06
        </span>

        <h2>Persons of Interest</h2>

        <p>
          Four people are connected to Project Echo.
        </p>

      </div>


      <div class="people-grid">


        <div class="person">

          <div class="avatar">
            NT
          </div>

          <b>Nina Thomas</b>

          <small>
            Victim / Investigator
          </small>

        </div>


        <div class="person">

          <div class="avatar">
            MJ
          </div>

          <b>Maya Joseph</b>

          <small>
            Former Echo member
          </small>

        </div>


        <div class="person">

          <div class="avatar">
            DR
          </div>

          <b>Daniel Roy</b>

          <small>
            Original account owner
          </small>

        </div>


        <div class="person">

          <div class="avatar">
            AM
          </div>

          <b>Alex Mathew</b>

          <small>
            Former project member
          </small>

        </div>


      </div>


      <div class="clue-box">

        <b>CREDENTIAL TRAIL</b>

        <p>
          Daniel's old credentials appear in the
          recovered archive.
        </p>

      </div>


      <button
        class="clue-button"
        onclick="
          discoverClue(
            'credentials',
            'Daniel\\'s old credentials were reused'
          )
        "
      >
        MARK AS IMPORTANT
      </button>

    `

  },



  /* =========================
     EVIDENCE BOARD
     ========================= */

  board: {

    title: "EVIDENCE BOARD",

    html: `

      <div class="evidence-heading">

        <span class="evidence-number">
          INVESTIGATION BOARD
        </span>

        <h2>Connect the Evidence</h2>

        <p>
          The case begins to make sense when the clues
          are viewed together.
        </p>

      </div>


      <div class="board">


        <div class="board-node node-nina">
          NINA
        </div>


        <div class="board-node node-echo">
          PROJECT ECHO
        </div>


        <div class="board-node node-time">
          22:47
        </div>


        <div class="board-node node-daniel">
          DANIEL'S<br>
          CREDENTIALS
        </div>


        <div class="board-node node-maya">
          MAYA
        </div>


        <div class="connection c1"></div>
        <div class="connection c2"></div>
        <div class="connection c3"></div>
        <div class="connection c4"></div>


      </div>


      <div class="clue-box">

        <b>RECONSTRUCTION</b>

        <p>
          Nina investigated Project Echo.
          Daniel's old credentials were available.
          Maya was connected to the project.
          The suspicious access occurred at 22:47.
        </p>

      </div>


      <button
        class="clue-button"
        onclick="
          discoverClue(
            'board',
            'The evidence connections point toward Maya'
          )
        "
      >
        CONFIRM CONNECTION
      </button>

    `

  }

};



/* =========================================================
   OPEN EVIDENCE
   ========================================================= */

function openEvidence(type) {

  const evidence = evidenceData[type];

  if (!evidence) return;


  const title =
    document.getElementById("evidenceTitle");

  const content =
    document.getElementById("evidenceContent");


  if (title) {
    title.textContent = evidence.title;
  }


  if (content) {

    content.innerHTML = evidence.html;


    // Animate content

    content.style.opacity = "0";

    setTimeout(() => {
      content.style.opacity = "1";
    }, 50);

  }


  showScreen("evidence");

}



/* =========================================================
   FINAL CASE CHECK
   ========================================================= */

function submitCase() {


  const q1 =
    document.getElementById("q1").value;

  const q2 =
    document.getElementById("q2").value;

  const q3 =
    document.getElementById("q3").value;

  const q4 =
    document.getElementById("q4").value;

  const q5 =
    document.getElementById("q5").value;


  const result =
    document.getElementById("result");


  const correct =

    q1 === "hour" &&
    q2 === "access" &&
    q3 === "2247" &&
    q4 === "echo" &&
    q5 === "maya";


  if (!q1 || !q2 || !q3 || !q4 || !q5) {

    if (result) {

      result.className =
        "result wrong";

      result.innerHTML = `
        <b>⚠ INCOMPLETE INVESTIGATION</b>
        <p>
          Answer every question before submitting
          your final reconstruction.
        </p>
      `;

    }

    return;

  }



  if (correct) {

    if (result) {

      result.className =
        "result correct";

      result.innerHTML = `
        <b>✓ RECONSTRUCTION ACCEPTED</b>
        <p>
          Your evidence chain matches the recovered data.
        </p>
      `;

    }


    discoverClue(
      "final",
      "The complete evidence chain has been reconstructed"
    );


    const status =
      document.getElementById("statusText");


    if (status) {
      status.textContent = "CASE SOLVED";
    }


    setTimeout(() => {

      showScreen("ending");

    }, 1600);


  } else {


    if (result) {

      result.className =
        "result wrong";

      result.innerHTML = `
        <b>✕ RECONSTRUCTION INCONSISTENT</b>

        <p>
          At least one conclusion doesn't match
          the recovered evidence.

          Go back and examine the evidence again.
        </p>
      `;

    }


    showToast(
      "Evidence mismatch — investigate further."
    );

  }

}



/* =========================================================
   KEYBOARD SHORTCUTS
   ========================================================= */

document.addEventListener(
  "keydown",
  event => {


    // ESC = return to dashboard

    if (event.key === "Escape") {

      const evidence =
        document.getElementById("evidence");

      if (
        evidence &&
        evidence.classList.contains("active")
      ) {

        showScreen("dashboard");

      }

    }


    // ENTER = start case on home screen

    if (event.key === "Enter") {

      const home =
        document.getElementById("home");

      if (
        home &&
        home.classList.contains("active")
      ) {

        showScreen("briefing");

      }

    }

  }

);



/* =========================================================
   VISUAL MICRO-ANIMATIONS
   ========================================================= */

document.addEventListener(
  "mousemove",
  event => {

    const hero =
      document.querySelector(".hero-visual");

    if (!hero) return;


    const x =
      (event.clientX /
        window.innerWidth -
        0.5) * 8;


    const y =
      (event.clientY /
        window.innerHeight -
        0.5) * 8;


    hero.style.transform =
      `translate(${x}px, ${y}px)`;

  }

);



/* =========================================================
   INITIALIZE
   ========================================================= */

updateProgress();

showScreen("home");
