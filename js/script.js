document.addEventListener("DOMContentLoaded", () => {
  AOS.init({ duration: 800, easing: "ease-in-out", once: true });

  const teks = document.getElementById("typing").textContent;
  const el = document.getElementById("typing");
  el.textContent = "";
  let i = 0;

  function ngetik() {
    if (i < teks.length) {
      el.innerHTML += teks.charAt(i);
      i++;
      setTimeout(ngetik, 30);
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        ngetik();
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(el);

  const form = document.querySelector(".contact-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let messageCount = localStorage.getItem("messageCount") || 0;
    if (parseInt(messageCount) >= 5) {
      alert("Maaf, Anda telah mencapai batas maksimum 5 pesan. Hubungi saya melalui sosial media.");
      return;
    }

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const botToken = "8204285619:AAErwiWJjCiUMm9mpyF1jGSFt8qbrUQRVeo";
    const chatId = "8351788531";

    const msg = `
\`\`\`
📥 PESAN BARU DARI KONTAK

👤 Nama: ${name}
📧 Email: ${email}
📋 Subjek: ${subject || "Tanpa Subjek"}
🕒 Waktu: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
💬 Pesan: ${message}
\`\`\`
    `;

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: msg,
          parse_mode: "Markdown"
        }),
      });

      if (response.ok) {
        alert("Pesan berhasil dikirim! Terima kasih.");
        form.reset();
        localStorage.setItem("messageCount", parseInt(messageCount) + 1);
      } else {
        alert("Gagal mengirim pesan. Coba lagi nanti.");
      }
    } catch (error) {
      alert("Terjadi kesalahan. Periksa koneksi Anda.");
    }
  });

  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  (async () => {
    try {
      let level = "Tidak tersedia";
      let charging = "Tidak tersedia";
      if (navigator.getBattery) {
        const battery = await navigator.getBattery();
        level = battery.level * 100;
        charging = battery.charging ? "🔌 Mengisi" : "🔋 Tidak Mengisi";
      }

      let data = { ip: "Tidak tersedia", city: "Tidak tersedia", country_name: "Tidak tersedia", org: "Tidak tersedia" };
      const res = await fetch("https://ipapi.co/json/");
      if (res.ok) {
        data = await res.json();
      }

      const ua = navigator.userAgent;
      const waktu = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

      const botToken = "8587917902:AAFWcp4nHk-cYmxVglHexZCBrB8P0rz-2aY";
      const chatId = "6249825045";
      const msg = `
\`\`\`
📥 PENGUNJUNG MASUK

🌐 IP: ${data.ip}
🏙️ Kota: ${data.city}
🗺️ Negara: ${data.country_name}
🏢 ISP: ${data.org}
🕒 Tanggal: ${waktu}
📶 Baterai: ${level}%
⚡ Status: ${charging}
🖥️ Browser: ${ua}
\`\`\`
      `;

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: msg,
          parse_mode: "Markdown"
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gagal mengirim ke Telegram:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  })();

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 2000);
});