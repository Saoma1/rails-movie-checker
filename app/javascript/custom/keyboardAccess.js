function keyboardAccess() {
  // Get all the <li> elements into a collection
  var listItems = document.querySelectorAll("#results li");

  // Set up a counter to keep track of which <li> is selected
  var currentLI = 0;

  // Initialize first li as the selected (focused) one:
  listItems[currentLI].classList.add("highlight");

  // Set up a key event handler for the document
  document.addEventListener("keydup", function (event) {
    // Check for up/down key presses
    console.log(event);
    switch (event.key) {
      case "ArrowUp": // Up arrow
        // Remove the highlighting from the previous element
        listItems[currentLI].classList.remove("highlight");

        currentLI = currentLI > 0 ? --currentLI : 0; // Decrease the counter
        listItems[currentLI].classList.add("highlight"); // Highlight the new element
        break;
      case "ArrowDown": // Down arrow
        // Remove the highlighting from the previous element
        listItems[currentLI].classList.remove("highlight");

        currentLI = currentLI < listItems.length - 1 ? ++currentLI : listItems.length - 1; // Increase counter
        listItems[currentLI].classList.add("highlight"); // Highlight the new element
        break;
    }
  });
}

// export { keyboardAccess };
