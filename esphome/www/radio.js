/* Injects "Динамик / радио" panel above the ESPHome entity list */
(function () {
  function currentModeText() {
    var nodes = document.querySelectorAll(".entity, .card, [class*='entity']");
    for (var i = 0; i < nodes.length; i++) {
      var t = nodes[i].textContent || "";
      if (t.indexOf("Текущий режим") !== -1) {
        var m = t.match(/Текущий режим[\s\S]*?(выкл|радио|блютуз)/i);
        if (m) return m[1].toLowerCase();
      }
    }
    return "—";
  }

  function mount() {
    if (document.getElementById("bathradio-panel")) return;
    var root =
      document.querySelector("main") ||
      document.querySelector("#app") ||
      document.body;
    if (!root) return;

    var panel = document.createElement("section");
    panel.id = "bathradio-panel";
    panel.className = "br-panel";
    panel.innerHTML =
      "<h2>Динамик / радио</h2>" +
      "<p>Туалетное радио — режимы MVP (без звука пока).</p>" +
      '<div>Сейчас: <span class="br-mode" id="bathradio-mode">' +
      currentModeText() +
      "</span></div>";

    if (root.firstChild) root.insertBefore(panel, root.firstChild);
    else root.appendChild(panel);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
  setInterval(function () {
    var el = document.getElementById("bathradio-mode");
    if (el) el.textContent = currentModeText();
  }, 2000);
})();
