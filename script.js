
document.addEventListener("DOMContentLoaded", () => {
  // قائمة التنقل في الجوال
  document.querySelectorAll(".menu-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const navId = button.getAttribute("aria-controls");
      const nav = document.getElementById(navId);
      if (!nav) return;

      const isOpen = nav.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute(
        "aria-label",
        isOpen ? "إغلاق القائمة" : "فتح القائمة"
      );
    });
  });

  // قراءة السلة وحفظها
  function readCart() {
    try {
      const cart = JSON.parse(localStorage.getItem("smartUniCart") || "[]");
      return Array.isArray(cart) ? cart : [];
    } catch (error) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem("smartUniCart", JSON.stringify(cart));
    updateCartCount();
  }

  // تحديث عدد القطع في رأس الصفحة
  function updateCartCount() {
    const count = readCart().reduce(
      (sum, item) => sum + (Number(item.quantity) || 0),
      0
    );

    document.querySelectorAll("#cart-count").forEach((element) => {
      element.textContent = String(count);
    });
  }

  // إضافة منتج أو باقة إلى السلة
  document.querySelectorAll(".add-cart, .offer-button").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = Number(button.dataset.price);

      if (!id || !name || !Number.isFinite(price) || price < 0) {
        alert("تعذر إضافة هذا العنصر. تحققي من بياناته في الصفحة.");
        return;
      }

      const cart = readCart();
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id,
          name,
          price,
          quantity: 1
        });
      }

      saveCart(cart);

      const originalText = button.textContent;
      button.textContent = "تمت الإضافة ✓";
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 1200);
    });
  });

  updateCartCount();
});
