document.addEventListener('DOMContentLoaded', () => {
  const onboarding = document.getElementById('onboarding');
  const startBtn = document.getElementById('start-btn');
  
  const key = 'tiktok_repost_pro_v4_super';
  if (!localStorage.getItem(key)) {
    onboarding.style.display = 'flex';
  }
  
  startBtn.addEventListener('click', () => {
    localStorage.setItem(key, 'true');
    onboarding.style.opacity = '0';
    onboarding.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      onboarding.style.display = 'none';
    }, 500);
  });

  // Subtle parallax effect on cards
  const cards = document.querySelectorAll('.step-item, .dev-card, .status-card');
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 5;
    const y = (e.clientY / window.innerHeight - 0.5) * 5;
    cards.forEach(card => {
      card.style.transform = `translateY(${y}px) translateX(${x}px) perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
  });
});
