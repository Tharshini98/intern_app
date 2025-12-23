const API_BASE = "https://intern-app-cy8z.onrender.com";
function requireSessionOrRedirect() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token || !userId) {
    window.location.href = "login.html";
    return null;
  }
  return { token, userId };
}

$(function () {
  const session = requireSessionOrRedirect();
  if (!session) return;


  $.ajax({
    url: "http://localhost:5000/api/profile/get",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ token: session.token }),
    success: function (res) {
      const p = res.profile || {};
      $("#age").val(p.age || "");
      $("#dob").val(p.dob || "");
      $("#contact").val(p.contact || "");
      $("#address").val(p.address || "");
    },
    error: function () {
      $("#profileMsg").html(`<div class="alert alert-warning">Failed to load profile.</div>`);
    }
  });


  $("#profileForm").on("submit", function (e) {
    e.preventDefault();
    const payload = {
      token: session.token,
      age: $("#age").val() || null,
      dob: $("#dob").val() || null,
      contact: $("#contact").val().trim() || null,
      address: $("#address").val().trim() || null
    };

    $.ajax({
      url: "http://localhost:5000/api/profile/update",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (res) {
        $("#profileMsg").html(`<div class="alert alert-success">${res.message}</div>`);
      },
      error: function (xhr) {
        const msg = xhr.responseJSON?.error || "Update failed";
        $("#profileMsg").html(`<div class="alert alert-danger">${msg}</div>`);
      }
    });
  });

  $("#logoutBtn").on("click", function () {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "login.html";
  });
});