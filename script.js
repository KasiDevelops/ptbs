
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quoteForm');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect selected services
    const selected = Array.from(form.querySelectorAll('input[name="services"]:checked'))
      .map(checkbox => checkbox.value)
      .join(', ');

    form.selectedServices.value = selected;

    // Send data using Fetch
    const formData = new FormData(form);
    const action = form.getAttribute('action');

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.textContent = 'Thank you! Your quote request has been sent.';
        form.reset();
      } else {
        status.textContent = 'Oops! There was a problem submitting your form.';
      }
    } catch (error) {
      status.textContent = 'There was a network error. Please try again.';
    }
  });
});


// Service button logic
const serviceButtons = document.querySelectorAll(".service-btn");
const hiddenServices = document.getElementById("selected-services");
const serviceList = [];

serviceButtons.forEach(button => {
    button.addEventListener("click", () => {
        const service = button.dataset.service;
        if (service === "Whole Package") {
            serviceButtons.forEach(b => {
                b.classList.add("selected");
                if (!serviceList.includes(b.dataset.service)) {
                    serviceList.push(b.dataset.service);
                }
            });
        } else {
            button.classList.toggle("selected");
            if (serviceList.includes(service)) {
                serviceList.splice(serviceList.indexOf(service), 1);
            } else {
                serviceList.push(service);
            }
        }
        hiddenServices.value = serviceList.join(", ");
    });
});
