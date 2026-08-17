const found = new Set();

const evidence = {
  screenshot: {
    title: "📸 Screenshots",
    html: `
      <h2>Recovered Screenshots</h2>

      <p>Three screenshots were recovered from Nina's device.</p>

      <div class="terminal">
SCREENSHOT_01.png

Desktop capture

Displayed time: 23:14
Computer system clock: 22:14

Visible files:
📁 College
📁 Photos
📁 Project_Echo
📄 notes.txt
📄 password_hint.txt
      </div>

      <div class="clue">
        🧩 CLUE: The screenshot timestamp is exactly one hour ahead of the computer clock.
      </div>

      <div class="terminal">
SCREENSHOT_02.png

A photo of a college corridor.

Noticeboard in background:

ROOM 204
PROJECT ECHO
2019
      </div>

      <div class="clue">
        🧩 CLUE: The number 204 appears again in the investigation.
      </div>
    `
  },

  chat: {
    title: "💬 Chat Logs",
    html: `
      <h2>Recovered Chat</h2>

      <div class="terminal">
21:38 — Nina:
Are you awake?

21:39 — Alex:
Yeah. What's wrong?

21:40 — Nina:
I found something in the old account.

21:41 — Alex:
What old account?

21:43 — Nina:
That's the problem.

21:44 — Alex:
Nina, what did you find?

21:47 — Nina:
I'm checking the login history.

21:48 — Alex:
Who?

21:51 — Nina:
I don't know yet.

22:03 — Nina:
If I disappear from the chat, check the old account.
      </div>

      <div class="clue">
        🧩 CLUE: Nina knew someone had accessed the old account.
      </div>
    `
  },

  files: {
    title: "📁 Files",
    html: `
      <h2>Recovered Files</h2>

      <div class="terminal">
📁 Project_Echo
   └── archive_2019.txt

📄 notes.txt

PROJECT ECHO

17/10

Something is wrong with the timestamps.

The old account shows a login at 23:47.

But the computer says 22:47.

Need to compare everything.

Don't trust the clock.
      </div>

      <div class="terminal">
📄 password_hint.txt

The password isn't a birthday.

Think about the photograph.

Look at the BACKGROUND.
      </div>

      <div class="terminal">
📄 archive_2019.txt

PROJECT ECHO — 2019

Members:
Daniel R.
Maya J.
Alex M.
Nina T.

Status:
ARCHIVED
      </div>

      <div class="clue">
        🧩 CLUES: Nina knew the timestamps were wrong.
        Project Echo connects all four characters.
      </div>
    `
  },

  browser: {
    title: "🌐 Browser History",
    html: `
      <h2>Browser History</h2>

      <div class="terminal">
21:12  College Portal
21:18  Email
21:32  Old Account
21:47  Login History
22:04  Unknown Page
22:11  Unknown Page
22:13  Email
22:14  Browser Closed

UNKNOWN PAGES:

unknown-page.local/archive
unknown-page.local/archive
      </div>

      <div class="clue">
        🧩 CLUE: Nina was investigating the old account immediately before her computer shut down.
      </div>
    `
  },

  timeline: {
    title: "⏰ Timeline",
    html: `
      <h2>Reconstructed Timeline</h2>

      <div class="terminal">
21:38  Nina messages Alex
21:47  Nina checks login history
22:03  Nina sends final warning
22:14  Nina's computer shuts down
22:47  Old account shows login
23:47  Another login appears

IMPORTANT:

Displayed suspicious login = 23:47

Actual time after correcting the
one-hour offset = 22:47
      </div>

      <div class="clue">
        🧩 CLUE: The suspicious access happened after Nina's laptop was already shut down.
      </div>
    `
  },

  people: {
    title: "👥 Persons of Interest",
    html: `
      <h2>Persons of Interest</h2>

      <div class="profile-grid">

        <div class="profile">
          <b>👩 Nina Thomas</b>
          <small>
            Owner of the account.
            Investigating Project Echo.
          </small>
        </div>

        <div class="profile">
          <b>👨 Alex Mathew</b>
          <small>
            Best friend.
            Claims he was studying at home.
          </small>
        </div>

        <div class="profile">
          <b>👩 Maya Joseph</b>
          <small>
            Classmate.
            Had an argument with Nina earlier that week.
          </small>
        </div>

        <div class="profile">
          <b>👨 Daniel Roy</b>
          <small>
            Senior student.
            Connected to the old Project Echo archive.
          </small>
        </div>

      </div>

      <div class="clue">
        🧩 CONNECTION: All four names appear in the Project Echo archive.
      </div>
    `
  },

  board: {
    title: "🧩 Evidence Board",
    html: `
      <h2>Your Evidence Board</h2>

      <p>Review the connections you've discovered.</p>

      <div class="terminal" id="boardText">
Loading...
      </div>

      <div class="clue">
        The strongest chain is:

        wrong timestamps
        ↓
        old account access
        ↓
        access after laptop shutdown
        ↓
        Project Echo
        ↓
        old credentials
      </div>
    `
  }
};


function showScreen(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


function openEvidence(type) {

  const e = evidence[type];

  if (!e) return;

  const title = document.getElementById("evidenceTitle");
  const content = document.getElementById("evidenceContent");

  if (title) {
    title.textContent = e.title;
  }

  if (content) {
    content.innerHTML = e.html;
  }

  if (type !== "board") {
    found.add(type);
  }

  updateProgress();

  if (type === "board") {
    renderBoard();
  }

  showScreen("evidence");
}


function renderBoard() {

  const board = document.getElementById("boardText");

  if (!board) return;

  const clues = [

    [
      "screenshot",
      "Screenshot timestamp is one hour ahead."
    ],

    [
      "chat",
      "Nina warned about the old account."
    ],

    [
      "files",
      "Nina wrote: Don't trust the clock."
    ],

    [
      "browser",
      "Nina investigated login history before shutdown."
    ],

    [
      "timeline",
      "Suspicious access happened after shutdown."
    ],

    [
      "people",
      "Project Echo connects the suspects."
    ]

  ];

  board.textContent = clues
    .map(([key, text]) => {

      if (found.has(key)) {
        return "✓ " + text;
      }

      return "○ " + text;

    })
    .join("\n");
}


function updateProgress() {
    const counter =
        document.getElementById("clueCounter") ||
        document.getElementById("cluesFound") ||
        document.getElementById("progressCount");

    if (!counter) return;

    counter.textContent = found.size + " / 6";
}
