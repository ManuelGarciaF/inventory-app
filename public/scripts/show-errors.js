// If the response to an htmx event targetting #main-content is a valid error code,
// render the error page.

const validCodes = [400, 404, 500];
document.querySelector("#main-content").addEventListener("htmx:beforeSwap", e => {
  if (validCodes.includes(e.detail.xhr.status)) {
    e.detail.shouldSwap = true;
  }
});
