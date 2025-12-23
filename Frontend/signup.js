$(function() {
  $("#signupForm").on("submit", function(e) {
    e.preventDefault();
    const payload = {
      name: $("#name").val(),
      email: $("#email").val(),
      password: $("#password").val()
    };

    $.ajax({
      url: "http://localhost:5000/api/auth/register",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function(res) {
        $("#signupMsg").html(`<div class="alert alert-success">${res.message}</div>`);
        setTimeout(() => window.location.href = "login.html", 1200);
      },
      error: function(xhr) {
        $("#signupMsg").html(`<div class="alert alert-danger">${xhr.responseJSON?.error || "Error"}</div>`);
      }
    });
  });
});