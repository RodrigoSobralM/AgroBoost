const phoneInput = document.getElementById("phone");

phoneInput.addEventListener("input", (event) => {
  const digits = event.target.value.replace(/\D/g, "").slice(0, 11);

  if (digits.length <= 2) {
    event.target.value = digits ? `(${digits}` : "";
    return;
  }

  if (digits.length <= 6) {
    event.target.value = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return;
  }

  if (digits.length <= 10) {
    event.target.value =
      `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return;
  }

  event.target.value =
    `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
});
