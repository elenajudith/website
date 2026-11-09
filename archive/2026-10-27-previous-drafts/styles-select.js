// Small synchronous head script prevents a flash of the default style on navigation.
// Storage may be unavailable in private/embedded browsers; the selector still works.
try {
  const saved = localStorage.getItem('elena-judith-style');
  if (['linen', 'atelier', 'gallery'].includes(saved)) document.documentElement.dataset.style = saved;
} catch {}
