function renderTable(statName, statValue) {
  return `<div class="progress mb-2">
  <div
    class="progress-bar progress-bar-striped progress-bar-animated"
    role="progressbar"
    style="width: ${statValue * 0.8}%"
  > ${statName}: ${statValue}</div>
</div>`;
}
