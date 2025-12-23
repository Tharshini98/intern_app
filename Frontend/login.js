$(function () {
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    const payload = {
      email: $("#email").val().trim(),
      password: $("#password").val()
    };

    $.ajax({
      url: "http://localhost:5000/api/auth/login", 
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(payload),
      success: function (res) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.userId);

        window.location.href = "profile.html";
      },
      error: function (xhr) {
        const msg = xhr.responseJSON?.error || "Login failed";
        $("#loginMsg").html(`<div class="alert alert-danger">${msg}</div>`);
      }
    });
  });
});