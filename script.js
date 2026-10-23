
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

  // تبديل الوضع الداكن والفاتح
  const themeToggle = document.getElementById("theme-toggle");

  // استعادة المظهر المحفوظ
  const savedTheme = localStorage.getItem("smartUniTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // تحديث شكل زر المظهر
  function updateThemeButton() {
    if (!themeToggle) return;

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"
    );
  }

  updateThemeButton();

  // التبديل عند الضغط على الزر
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      const isDark = document.body.classList.contains("dark-mode");

      localStorage.setItem("smartUniTheme", isDark ? "dark" : "light");

      updateThemeButton();
    });
  }
