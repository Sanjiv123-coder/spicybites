let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  updateCart();
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");
  cartList.innerHTML = "";

  cart.forEach(({ item, price }, index) => {
    const li = document.createElement("li");
    li.textContent = `${item} - $${price}`;

    // Create Remove button
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.style.marginLeft = "10px";
    removeBtn.onclick = () => removeFromCart(index);

    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });

  totalDisplay.textContent = total.toFixed(2);
}

// Geolocation Functionality (Optional, if you want to use this feature too)
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("location-text").textContent = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  document.getElementById("location-text").textContent = `Latitude: ${lat}, Longitude: ${lon}`;
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById("location-text").textContent = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById("location-text").textContent = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.getElementById("location-text").textContent = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById("location-text").textContent = "An unknown error occurred.";
      break;
  }
}

// Handle the Delivery Address submission
function submitAddress() {
  const address = document.getElementById("address-input").value;
  document.getElementById("address-text").textContent = `Your delivery address is: ${address}`;
}
