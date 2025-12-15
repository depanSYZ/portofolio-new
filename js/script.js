document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi AOS
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });

  // Data Dinamis & Translations
  const dynamicData = {
    en: {
      hobbies: ["Coding", "Gaming", "Watching Anime", "Making Scripts/Bots"],
      passion: "Script Development",
      skills: [
        {
          title: "Frontend",
          icon: "fas fa-laptop-code",
          items: ["HTML5", "CSS3", "JavaScript", "React.js", "TypeScript"]
        },
        {
          title: "Backend",
          icon: "fas fa-server",
          items: ["Node.js", "Python (Flask/Django)", "SQL (PostgreSQL/MySQL)"]
        },
        {
          title: "Security",
          icon: "fas fa-shield-alt",
          items: ["Burp Suite", "Metasploit", "Nmap", "Wireshark"]
        },
        {
          title: "Tools & Platforms",
          icon: "fas fa-tools",
          items: ["Termux", "Docker", "Git/GitHub", "AWS", "Figma"]
        }
      ],
      translations: {
        loading: "Loading...",
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_contact: "Contact",
        hero_tagline: "Script Developer & Bot Creator",
        btn_contact: "Get in Touch",
        btn_view_skills: "View Skills",
        section_title_about: "About Me",
        about_intro: "Hi, I'm depann. I'm still in grade IX. I love exploring open-source technology, building innovative solutions, and ensuring digital security.",
        about_desc: "My goal is to make things faster, safer, and more user-friendly, while continuously learning and contributing to the tech community. Simplicity and security are my core principles.",
        about_hobby_title: "Hobbies",
        about_hobbies: "Coding, Gaming, Watching Anime, Making Scripts/Bots",
        about_passion_title: "Passion",
        about_passion: "Script Development",
        section_title_skills: "Skills",
        section_title_contact: "Contact Me",
        contact_text: "Need a friend? Contact me!",
        form_label_name: "Name",
        form_label_email: "Email",
        form_label_subject: "Subject",
        form_label_message: "Message",
        form_submit_button: "Send Message",
        footer_copyright_by: "depannn"
      }
    },
    id: {
      hobbies: ["Ngoding", "Main game", "Nonton dracin", "Bikin script bot"],
      passion: "Script Development",
      skills: [
        {
          title: "Frontend",
          icon: "fas fa-laptop-code",
          items: ["HTML5", "CSS3", "JavaScript", "React.js", "TypeScript"]
        },
        {
          title: "Backend",
          icon: "fas fa-server",
          items: ["Node.js", "Python (Flask/Django)", "SQL (PostgreSQL/MySQL)"]
        },
        {
          title: "Keamanan",
          icon: "fas fa-shield-alt",
          items: ["Burp Suite", "Metasploit", "Nmap", "Wireshark"]
        },
        {
          title: "Tools & Platform",
          icon: "fas fa-tools",
          items: ["Termux", "Docker", "Git/GitHub", "AWS", "Figma"]
        }
      ],
      translations: {
        loading: "Memuat...",
        nav_home: "Beranda",
        nav_about: "Tentang",
        nav_skills: "Keterampilan",
        nav_contact: "Kontak",
        hero_tagline: "Script Developer & Bot Creator",
        btn_contact: "Hubungi Saya",
        btn_view_skills: "Lihat Keterampilan",
        section_title_about: "Tentang Saya",
        about_intro: "Halo, saya depann. Saya Masih kelas IX, Saya suka mengeksplorasi teknologi open-source, membangun solusi inovatif, dan memastikan keamanan digital.",
        about_desc: "Tujuan saya adalah untuk mempermudah hal-hal yang cepat, aman, dan user-friendly, sambil terus belajar dan berkontribusi pada komunitas teknologi. Simplicity dan security adalah prinsip utama saya.",
        about_hobby_title: "Hobi",
        about_hobbies: "Ngoding, Main game, Nonton dracin, bikin script bot",
        about_passion_title: "Passion",
        about_passion: "Script Development",
        section_title_skills: "Keterampilan",
        section_title_contact: "Kontak Saya",
        contact_text: "Butuh teman? Hubungi saya!",
        form_label_name: "Nama",
        form_label_email: "Email",
        form_label_subject: "Subjek",
        form_label_message: "Pesan",
        form_submit_button: "Kirim Pesan",
        footer_copyright_by: "depannn"
      }
    }
  };

  let currentLang = localStorage.getItem('preferredLanguage') || 'id';
  let currentTheme = localStorage.getItem('preferredTheme') || 'light';

  // Fungsi untuk menerapkan tema
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('#theme-toggle i');
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  // Fungsi untuk menerapkan bahasa
  function applyLanguage(langCode) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
      const key = element.getAttribute('data-lang');
      if (dynamicData[langCode]?.translations[key]) {
        element.textContent = dynamicData[langCode].translations[key];
      }
    });

    // Update bahasa di toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.innerHTML = `<i class="fas fa-language"></i> ${langCode.toUpperCase()}`;
    }
  }

  // Fungsi untuk mengisi data dinamis
  function populateDynamicContent(langCode) {
    const data = dynamicData[langCode];
    if (!data) return;

    // Hobbies
    const hobbiesListEl = document.getElementById('hobbies-list');
    if (hobbiesListEl && data.hobbies) {
      hobbiesListEl.textContent = data.hobbies.join(', ');
    }

    // Passion
    const passionTextEl = document.getElementById('passion-text');
    if (passionTextEl && data.passion) {
      passionTextEl.textContent = data.passion;
    }

    // Skills
    const skillsGridContainer = document.getElementById('skills-grid-container');
    if (skillsGridContainer && data.skills) {
      skillsGridContainer.innerHTML = ''; // Kosongkan dulu
      data.skills.forEach(skillCat => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-category';
        skillCard.setAttribute('data-aos', 'fade-up');
        skillCard.setAttribute('data-aos-delay', '100');
        skillCard.innerHTML = `
          <h3><i class="${skillCat.icon}"></i> ${data.translations[skillCat.title.toLowerCase()] || skillCat.title}</h3>
          <ul>
            ${skillCat.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        `;
        skillsGridContainer.appendChild(skillCard);
      });
      // Re-init AOS untuk elemen baru
      AOS.refresh();
    }

    // Update Tahun di Footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // Toggle Theme
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(currentTheme);
      localStorage.setItem('preferredTheme', currentTheme);
    });
  }

  // Toggle Language
  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'id' ? 'en' : 'id';
      applyLanguage(currentLang);
      populateDynamicContent(currentLang); // Isi ulang data sesuai bahasa
      localStorage.setItem('preferredLanguage', currentLang);
    });
  }

  // Terapkan tema dan bahasa saat halaman dimuat
  applyTheme(currentTheme);
  applyLanguage(currentLang);
  populateDynamicContent(currentLang);

  // Animasi Typing
  const typingElement = document.getElementById("typing-text");
  if (typingElement) {
      const fullText = dynamicData[currentLang].translations.about_intro; // Ambil teks dari translation
      typingElement.textContent = ""; // Kosongkan dulu
      let charIndex = 0;

      function typeWriter() {
          if (charIndex < fullText.length) {
              typingElement.textContent += fullText.charAt(charIndex);
              charIndex++;
              setTimeout(typeWriter, 30);
          }
      }

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  typeWriter();
                  observer.unobserve(entry.target);
              }
          });
      }, { threshold: 0.5 });

      observer.observe(typingElement);
  }

  // Form Submission via Telegram Bot
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let messageCount = localStorage.getItem("messageCount") || 0;
      if (parseInt(messageCount) >= 5) {
        alert(dynamicData[currentLang].translations["limit_reached"] || "Maaf, Anda telah mencapai batas maksimum 5 pesan per sesi. Silakan muat ulang halaman untuk mengirim lagi atau hubungi saya melalui sosial media.");
        return;
      }

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
          alert(dynamicData[currentLang].translations["form_validation_error"] || "Mohon lengkapi field Nama, Email, dan Pesan.");
          return;
      }

      // Ganti token dan chat ID kamu di sini
      const botToken = "8526560445:AAFciOnhsXmrG8f8nyxgZoTfkid-PCxQFsA"; // GANTI DENGAN BOT TOKEN KAMU
      const chatId = "6249825045"; // GANTI DENGAN CHAT ID KAMU

      const msg = `
\`\`\`
📥 NEW MESSAGE FROM PORTFOLIO (${currentLang.toUpperCase()})

👤 Name: ${name}
📧 Email: ${email}
📋 Subject: ${subject || "No Subject"}
🌐 Sent from: ${window.location.href}
🕒 Time: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
💬 Message:
${message}
\`\`\`
      `;

      try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: msg,
            parse_mode: "MarkdownV2"
          }),
        });

        const result = await response.json();
        if (result.ok) {
          alert(dynamicData[currentLang].translations["message_sent_success"] || "Pesan berhasil dikirim! Terima kasih.");
          form.reset();
          localStorage.setItem("messageCount", parseInt(messageCount) + 1);
        } else {
          console.error("Telegram API Error:", result);
          alert(`${dynamicData[currentLang].translations["message_send_error"] || "Gagal mengirim pesan."} Error: ${result.description}`);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        alert(dynamicData[currentLang].translations["network_error"] || "Terjadi kesalahan jaringan. Periksa koneksi Anda dan coba lagi.");
      }
    });
  }

  // Toggle Mobile Menu
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  // Efek saat halaman dimuat
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 2000);

});