// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start();
require("turbolinks").start();
require("@rails/activestorage").start();
require("channels");
require("jquery");

import "@fortawesome/fontawesome-free/js/all";

import { searchListener } from "../custom/async";
import { keyboardAccess } from "../custom/keyboardAccess";

document.addEventListener("turbolinks:load", () => {
  searchListener();
  // keyboardAccess();
});
