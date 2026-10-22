
/* Smart Uni Store - التفاعلات الأساسية */

document.addEventListener("DOMContentLoaded", () => {
  // قائمة التنقل للجوال والآيباد
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

  // عداد السلة: يعرض عدد المنتجات المضافـة
  // ستتم إضافة وظائف السلة في خطوة مستقلة لاحقًا
  const cartCount = document.getElementById("cart-count");

  if (cartCount) {
    const savedCount = Number(
      sessionStorage.getItem("smartUniCartCount") || 0
    );

    cartCount.textContent = String(
      Number.isFinite(savedCount) && savedCount >= 0 ? savedCount : 0
    );
  }
});
