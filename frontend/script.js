const API = "http://localhost:5000/products";

// Fetch and render products
async function getProducts() {
  const res = await fetch(API);
  const products = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach(p => {
    list.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <h3>${p.name}</h3>
        <p>Price: $${p.price}</p>
        <p>Description: ${p.description}</p>
        <button onclick="updateProduct('${p._id}', '${p.name}', '${p.price}', '${p.description}')">Update</button>
        <button onclick="deleteProduct('${p._id}')">Delete</button>
      </div>
    `;
  });
}

// Add new product
async function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  if (!name || !price || !description) {
    alert("Please fill all fields");
    return;
  }

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, description })
  });

  // Clear inputs
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("description").value = "";

  getProducts();
}

// Delete product
async function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    await fetch(`${API}/${id}`, {
      method: "DELETE"
    });
    getProducts();
  }
}

// Update product
async function updateProduct(id, currentName, currentPrice, currentDescription) {
  const name = prompt("Update Product Name:", currentName);
  const price = prompt("Update Product Price:", currentPrice);
  const description = prompt("Update Product Description:", currentDescription);

  if (name && price && description) {
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description })
    });

    getProducts();
  }
}

// Load products on page load
getProducts();