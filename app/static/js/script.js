var modal1 = document.getElementById("myModal1");
var btn1 = document.getElementById("myBtn1");
var closeBtn1 = document.getElementById("myModal1").getElementsByClassName("close")[0];

var modal2 = document.getElementById("myModal2");
var btn2 = document.getElementById("myBtn2");
var closeBtn2 = document.getElementById("myModal2").getElementsByClassName("close")[0];

var modal3 = document.getElementById("myModal3");
var btn3 = document.getElementById("myBtn3");
var closeBtn3 = document.getElementById("myModal3").getElementsByClassName("close")[0];

// Open Modal 1
btn1.onclick = function () {
  modal1.style.display = "block";
};

// Close Modal 1
closeBtn1.onclick = function () {
  modal1.style.display = "none";
};

// Open Modal 2
btn2.onclick = function () {
  modal2.style.display = "block";
};

// Close Modal 2
closeBtn2.onclick = function () {
  modal2.style.display = "none";
};

// Open Modal 3
btn3.onclick = function () {
  modal3.style.display = "block";
};

// Close Modal 3
closeBtn3.onclick = function () {
  modal3.style.display = "none";
};

// Close modals when clicked outside of the modals
window.onclick = function (event) {
  if (event.target == modal1 || event.target == modal2 || event.target == modal3) {
    modal1.style.display = "none";
    modal2.style.display = "none";
    modal3.style.display = "none";
  }
};

// Tab function
function openTab(evt, tabName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("content-tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("is-active"); // Remove "is-active" from all tabs
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("is-active"); // Add "is-active" to the clicked tab

  // Store the active tab in localStorage
  localStorage.setItem("activeTab", tabName);
}

function setActiveTabOnLoad() {
  var activeTab = localStorage.getItem("activeTab");
  var contentTabs = document.getElementsByClassName("content-tab");

  // Hide all content tabs initially
  for (var i = 0; i < contentTabs.length; i++) {
    contentTabs[i].style.display = "none";
  }

  if (activeTab) {
    // Remove "is-active" from all tabs
    var tablinks = document.getElementsByClassName("tab");
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("is-active");
    }

    // Set the active tab from localStorage as "is-active"
    document.getElementById(activeTab).style.display = "block";
    document.querySelector(`[onclick*="${activeTab}"]`).classList.add("is-active");

    // Render the markdown content for the active tab
    fetchAndDisplayMarkdown(activeTab);
  } else {
    // If no tab is set in localStorage, set a default tab as active and render its content
    fetchAndDisplayMarkdown("Beta");
  }
}


function fetchAndDisplayMarkdown(tabName) {
  const converter = new showdown.Converter();
  const markdownFileMapping = {
    "Beta": "/static/md/beta-2023h.md",
    "BetaDev": "/static/md/betadev-2023h.md"
  };
  const markdownFilename = markdownFileMapping[tabName];
  if (!markdownFilename) {
    console.error(`No markdown filename found for tab: ${tabName}`);
    return;
  }

  // Update the fetch URL to point to Flask server's route
  fetch(markdownFilename)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text(); // Change this line if json
    })
    .then((markdownContent) => {
      const htmlContent = converter.makeHtml(markdownContent);
      document.getElementById(tabName).querySelector(".custom-markdown").innerHTML = htmlContent;
    })
    .catch((error) => {
      console.error("Error fetching Markdown content:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  setActiveTabOnLoad();

  const tabButtons = document.querySelectorAll("[data-tab]");
  tabButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      const tabName = e.target.getAttribute("data-tab");
      openTab(e, tabName);
      fetchAndDisplayMarkdown(tabName);
    });
  });
});

/* Light/Dark mode */

document.addEventListener('DOMContentLoaded', () => {
  const modeToggle = document.getElementById('modeToggle');
  const userPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  let theme = localStorage.getItem('theme');

  // Set initial theme based on user preference or saved theme
  if (theme === 'light' || (theme === null && userPrefersLight)) {
    document.body.classList.add('light-mode');
    modeToggle.innerHTML = '<span class="icon"><i class="fas fa-moon"></i></span>';
  } else {
    modeToggle.innerHTML = '<span class="icon"><i class="fas fa-sun"></i></span>';
  }

  modeToggle.addEventListener('click', function () {
    document.body.classList.toggle('light-mode');
    let newTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    this.innerHTML = newTheme === 'light' ?
      '<span class="icon"><i class="fas fa-moon"></i></span>' :
      '<span class="icon"><i class="fas fa-sun"></i></span>';
  });
});
